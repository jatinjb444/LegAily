from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

from apps.routes import router

# ✅ Create the FastAPI instance only once
app = FastAPI(
    title="Legaily Doc AI API",
    description="API for OCR, Summarization, and Translation of uploaded documents",
    version="1.0.0",
)

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Root route
@app.get("/")
async def root():
    return {"message": "Welcome to Legaily Doc AI API"}

# ✅ Register router with prefix
app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("apps.main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
