from pydantic import BaseModel, Field

# 1. Input Model: What we expect to receive from the React frontend
class PatientData(BaseModel):
    name: str
    age: str
    gender: str
    bloodPressure: str
    heartRate: str
    oxygenLevel: str
    temperature: str
    symptoms: str
    duration: str
    painLevel: int
    medicalHistory: str
    allergies: str

# 2. Output Model: What we strictly force the Gemini API to return
class AITriageResponse(BaseModel):
    severity: str = Field(description="Must be exactly: Critical, Urgent, Moderate, or Stable")
    priorityQueue: int = Field(description="Priority number from 1 (highest urgency) to 100 (lowest)")
    recommendedDepartment: str = Field(description="The hospital department to route the patient to")
    aiReasoning: str = Field(description="1-2 sentences explaining exactly which vitals/symptoms triggered this severity level")
    doctorSummary: str = Field(description="A concise, professional medical shorthand summary of the patient's presentation")
    confidenceScore: int = Field(description="Integer between 0-100 indicating confidence based on data completeness")