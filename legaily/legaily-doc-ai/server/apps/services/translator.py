import os
import requests

def google_translate_text(text, target_language):
    if not text or not text.strip():
        return "No text content to translate."

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return "Google API Key not set."

    try:
        # Split text into lines (preserving bullet points or paragraphs)
        lines = text.split("\n")
        
        # Filter out empty lines
        lines = [line.strip() for line in lines if line.strip()]

        # Prepare to collect translated lines
        translated_lines = []

        # Translate each line individually
        for line in lines:
            params = {
                "q": line,
                "target": target_language,
                "key": api_key
            }
            response = requests.post("https://translation.googleapis.com/language/translate/v2", data=params)
            response.raise_for_status()
            translated_line = response.json()["data"]["translations"][0]["translatedText"]
            translated_lines.append(translated_line)

        # Join translated lines back with newline character to preserve the format
        translated_text = "\n".join(translated_lines)
        return translated_text

    except Exception as e:
        return f"Error during Google translation: {str(e)}"
