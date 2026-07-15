import os
import uuid
import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# --- LOCAL APP IMPORTS ---
from app.models import PatientData
from app.ai_service import analyze_patient_with_ai
from app.database import patients_collection

# Initialize your FastAPI app
app = FastAPI(title="AI Emergency Triage Assistant")

# Standard CORS configuration (Allows your frontend to talk to your backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/triage")
async def process_triage(patient: PatientData):
    print(f"Received triage data for patient: {patient.name}")
    
    # 1. Ask Gemini (or Bypass) for the clinical assessment
    ai_result = analyze_patient_with_ai(patient)
    
    # 2. Combine into a single unified record
    # We use a string UUID for the _id to avoid BSON serialization issues with React
    complete_record = {
        "_id": str(uuid.uuid4()), 
        "timestamp": datetime.datetime.now().isoformat(),
        **patient.model_dump(),
        **ai_result
    }
    
    # 3. Save to MongoDB asynchronously
    try:
        await patients_collection.insert_one(complete_record)
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to save patient record to database.")
    
    return complete_record

@app.get("/api/patients")
async def get_patient_queue():
    try:
        # Fetch up to 1000 most recent patients from MongoDB
        patients = await patients_collection.find().to_list(1000)
        return patients
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve patient queue.")

@app.get("/health")
async def health_check():
    return {"status": "FastAPI Triage Server is running and connected."}

# =====================================================================
# PRODUCTION DEPLOYMENT: SERVE REACT FRONTEND 
# =====================================================================
dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../frontend/dist"))

if os.path.exists(dist_dir):
    # Mount static assets (JS, CSS, Images from Vite)
    assets_dir = os.path.join(dist_dir, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    
    # Catch-all route to serve index.html for React Router navigation
    @app.get("/{full_path:path}")
    async def catch_all(full_path: str):
        # Do NOT intercept API backend routes
        if full_path.startswith("api"):
            return {"error": "API route not found", "status_code": 404}
            
        # If the browser requests a specific file (like vite.svg), serve it
        file_path = os.path.join(dist_dir, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # Otherwise, fall back to React's index.html
        return FileResponse(os.path.join(dist_dir, "index.html"))
else:
    print(f"⚠️ WARNING: React build folder not found at {dist_dir}.")
    
    @app.get("/")
    def read_root():
        return {
            "message": "Backend is running, but React frontend build is missing.",
            "fix": "Run 'npm run build' inside the frontend folder before deploying."
        }