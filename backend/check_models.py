import os
import json
import urllib.request
from dotenv import load_dotenv

# Load your API key from the .env file
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("Error: Could not find GEMINI_API_KEY in your .env file.")
else:
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
    
    print("Contacting Google API...")
    try:
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode())
            print("\n✅ SUCCESS! Here are the text-generation models your API key can use right now:\n")
            
            for m in data.get("models", []):
                # We only want models that support text generation
                if "generateContent" in m.get("supportedGenerationMethods", []):
                    print(f"- {m['name']}")
                    
    except Exception as e:
        print(f"\n❌ Error fetching models: {e}")