from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

def get_model_and_tokenizer():
    """
    Load the NLLB-200 model and tokenizer for multilingual translation.

    :return: Tuple (model, tokenizer)
    """
    try:
        model_name = "facebook/nllb-200-distilled-600M"
        tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        return model, tokenizer
    except Exception as e:
        print(f"Error loading NLLB-200 model: {e}")
        return None, None
