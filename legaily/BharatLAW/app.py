import time
import os
import streamlit as st
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_together import Together
from PIL import Image

from footer import footer

# Set Streamlit page configuration
st.set_page_config(page_title="Decorative Circles Demo", layout="wide")

def set_background_white():
    st.markdown("""
        <style>
            .stApp {
                background-color: white !important;
            }
        </style>
    """, unsafe_allow_html=True)

set_background_white()

def hide_hamburger_menu():
    st.markdown("""
        <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
        </style>
    """, unsafe_allow_html=True)

hide_hamburger_menu()

# --- UPDATED CSS FOR CENTERED CHATBOT WITH HIGHLIGHTED INPUT ---
st.markdown("""
<style>
    /* Main container centering */
    .main > div {
        max-width: 1000px !important;
        margin: 0 auto !important;
        padding: 20px !important;
    }
    
    /* Chatbot container box styling */
    .stApp > div > div > div > div {
        background-color: white !important;
        border: 2px solid #e0e0e0 !important;
        border-radius: 15px !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
        padding: 30px !important;
        margin: 20px auto !important;
        max-width: 900px !important;
    }
    
    /* Center the "How can I help you today?" text */
    .typing-container {
        text-align: center !important;
        margin: 30px 0 !important;
    }
   .typing-text {
    font-size: 24px !important;
    font-weight: 500 !important;
    color: black !important;
    background: none !important;
    -webkit-background-clip: initial !important;
    -webkit-text-fill-color: initial !important;
    background-clip: initial !important;
}

    /* Chat input styling with highlighted border */
   div[data-testid="stChatInput"] {
    background-color: white !important;
    border: none !important;
    border-radius: 25px !important;
    box-shadow: none !important;
    margin: 20px 0 !important;
    padding: 5px !important;
    transition: all 0.3s ease !important;
}

    
    /* Chat input hover effect */
    div[data-testid="stChatInput"]:hover {
        border-color: #764ba2 !important;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5) !important;
        transform: translateY(-2px) !important;
    }
    
    /* Input textarea styling */
    div[data-testid="stChatInput"] textarea {
        background-color: white !important;
        color: #333 !important;
        border: none !important;
        border-radius: 10px !important;
        padding: 15px 20px !important;
        font-size: 16px !important;
        font-weight: 400 !important;
    }
    
    /* Placeholder text styling */
    div[data-testid="stChatInput"] textarea::placeholder {
        color: #999 !important;
        font-style: italic !important;
    }
    
    /* Chat messages styling */
    .stChatMessage {
        background-color: #f8f9fa !important;
        border-radius: 15px !important;
        margin: 15px 0 !important;
        padding: 15px !important;
        border-left: 4px solid #667eea !important;
    }
    
    /* User message styling */
    div[data-testid="user"] {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
        border-left: 4px solid #764ba2 !important;
    }
    
    /* Assistant message styling */
    div[data-testid="assistant"] {
        background-color: #f0f2f6 !important;
        color: #333 !important;
        border-left: 4px solid #667eea !important;
    }
    
    /* Reset button styling */
    .stButton > button {
       
        color: black !important;
        border: none !important;
        border-radius: 25px !important;
        padding: 10px 25px !important;
        font-weight: 600 !important;
        transition: all 0.3s ease !important;
        margin: 20px auto !important;
        display: block !important;
    }
    
    .stButton > button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4) !important;
    }
    
    /* Spinner styling */
    .stSpinner > div {
        text-align: center !important;
        color: #667eea !important;
    }
</style>
""", unsafe_allow_html=True)
# --- END UPDATED CSS ---

# Session state initialization
if "messages" not in st.session_state:
    st.session_state.messages = []

if "memory" not in st.session_state:
    st.session_state.memory = ConversationBufferWindowMemory(k=2, memory_key="chat_history", return_messages=True)

# Load embeddings model
@st.cache_resource
def load_embeddings():
    return HuggingFaceEmbeddings(model_name="law-ai/InLegalBERT")

embeddings = load_embeddings()
db = FAISS.load_local("ipc_embed_db", embeddings, allow_dangerous_deserialization=True)
db_retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# Prompt template
prompt_template = """
<s>[INST]
As a legal chatbot specializing in the Indian Penal Code, you are tasked with providing highly accurate and contextually appropriate responses. Ensure your answers meet these criteria:
- Respond in a bullet-point format to clearly delineate distinct aspects of the legal query.
- Each point should accurately reflect the breadth of the legal provision in question, avoiding over-specificity unless directly relevant to the user's query.
- Clarify the general applicability of the legal rules or sections mentioned, highlighting any common misconceptions or frequently misunderstood aspects.
- Limit responses to essential information that directly addresses the user's question, providing concise yet comprehensive explanations.
- Avoid assuming specific contexts or details not provided in the query, focusing on delivering universally applicable legal interpretations unless otherwise specified.
- Conclude with a brief summary that captures the essence of the legal discussion and corrects any common misinterpretations related to the topic.

CONTEXT: {context}
CHAT HISTORY: {chat_history}
QUESTION: {question}
ANSWER:
- [Detail the first key aspect of the law, ensuring it reflects general application]
- [Provide a concise explanation of how the law is typically interpreted or applied]
- [Correct a common misconception or clarify a frequently misunderstood aspect]
- [Detail any exceptions to the general rule, if applicable]
- [Include any additional relevant information that directly relates to the user's query]
</s>[INST]
"""

prompt = PromptTemplate(template=prompt_template, input_variables=['context', 'question', 'chat_history'])

api_key = "tgp_v1_GtiaGnn6Lq7rh6jBmBqrWF8-AjYoLguoluVPqdG9-B0"

llm = Together(model="mistralai/Mistral-7B-Instruct-v0.3", temperature=0.5, max_tokens=1024, together_api_key=api_key)

qa = ConversationalRetrievalChain.from_llm(
    llm=llm,
    memory=st.session_state.memory,
    retriever=db_retriever,
    combine_docs_chain_kwargs={'prompt': prompt}
)

def extract_answer(full_response):
    answer_start = full_response.find("Response:")
    if answer_start != -1:
        answer_start += len("Response:")
        return full_response[answer_start:].strip()
    return full_response

def reset_conversation():
    st.session_state.messages = []
    st.session_state.memory.clear()

# Display initial message with center alignment
if len(st.session_state.messages) == 0:
   st.markdown('''
    <div class="typing-container">
        <div class="typing-text" style="color: black;">How can I help you today?</div>
    </div>
''', unsafe_allow_html=True)

# Display chat messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])

# Chat input
input_prompt = st.chat_input("Say something...")
if input_prompt:
    with st.chat_message("user"):
        st.markdown(f"**You:** {input_prompt}")
    st.session_state.messages.append({"role": "user", "content": input_prompt})

    with st.chat_message("assistant"):
        with st.spinner("Thinking 💡..."):
            result = qa.invoke(input=input_prompt)
            message_placeholder = st.empty()
            answer = extract_answer(result["answer"])

            full_response = "⚠️ **_Gentle reminder: We generally ensure precise information, but do double-check._** \n\n\n"
            for chunk in answer:
                full_response += chunk
                time.sleep(0.02)
                message_placeholder.markdown(full_response + " |", unsafe_allow_html=True)

        st.session_state.messages.append({"role": "assistant", "content": answer})

# Reset button
if st.button('🗑️ Reset All Chat', on_click=reset_conversation):
    st.experimental_rerun()

footer()