import cohere
import os

def summarize_text(text):
    """
    Summarize text using Cohere API with adaptive summary length.

    :param text: The text to summarize
    :return: Summarized text
    """
    if not text or not text.strip():
        return "No text content to summarize."
    
    try:
        cohere_api_key = os.getenv("COHERE_API_KEY")
        if not cohere_api_key:
            return "Cohere API key not found in environment."
        
        # Initialize Cohere client
        co = cohere.Client(cohere_api_key)
        
        # Determine length dynamically
        word_count = len(text.split())
        if word_count < 10:
            length = "short"
        elif word_count < 20:
            length = "medium"
        else:
            length = "long"

        # Request summarization
        response = co.summarize(
            text=text,
            model='command',
            length=length,
            format='paragraph',
            extractiveness='medium'
        )
        
        return response.summary

    except Exception as e:
        return f"Error during summarization: {str(e)}"
