from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],  # Allow Next.js to call
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/calculate/{num1}/{num2}")
def calculate(num1: int, num2: int):
    # Process the numbers
    sum_result = num1 + num2
    product = num1 * num2
    difference = num1 - num2
    
    # Return processed results
    return {
        "input_numbers": [num1, num2],
        "sum": sum_result,
        "product": product,
        "difference": difference,
        "is_sum_even": sum_result % 2 == 0
    }

@app.get("/analyze/{text}")
def analyze_text(text: str):
    # Process the text
    word_count = len(text.split())
    char_count = len(text)
    uppercase_text = text.upper()
    has_spaces = " " in text
    
    return {
        "original": text,
        "uppercase": uppercase_text,
        "word_count": word_count,
        "character_count": char_count,
        "contains_spaces": has_spaces,
        "reversed": text[::-1]
    }