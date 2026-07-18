
Live Deployment: [Click here to view the live app](https://ai-emergency-triage.onrender.com)
Demo Video: [[Drive Link Here](https://drive.google.com/drive/folders/1QBbly4mHiLV5gr98Hy97VvM7FWKgC2jN?usp=drive_link)]

## 📌 Project Overview
PulseTriage AI is a full-stack health-tech solution built for **Theme 3: Crisis Management, HealthTech & Emergency Response**. It addresses the critical bottleneck of ER patient triaging by utilizing artificial intelligence to analyze physiological data, assign severity scores, and dynamically map patients to the correct hospital department.

## 🏗️ Technical Architecture 
This project is not a simple API wrapper. It is a fully decoupled, production-ready system consisting of:
*   **Frontend:** React.js dashboard for real-time patient intake and queue monitoring.
*   **Backend:** FastAPI (Python) server handling secure data routing and AI processing.
*   **Database:** MongoDB integration for persistent triage queue tracking.
*   **AI Engine:** Google Gemini AI utilized as a backend algorithmic decision engine for severity mapping.

## ⚙️ Key Technical Features
*   **Algorithmic Routing:** Converts raw intake data (Vitals, Symptoms) into a structured JSON severity matrix.
*   **Production-Grade Fallbacks (AI Bypass System):** The FastAPI backend features resilient error handling. If the external AI API rate-limits or fails, the server automatically defaults to a local heuristic backup system, ensuring the ER queue never goes down.
*   **Cloud Deployment:** Fully containerized and deployed on Render.

## 🚀 Local Setup & Installation

### Prerequisites
*   Node.js & npm
*   Python 3.9+
*   MongoDB Atlas URI
*   Gemini API Key

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `pip install -r requirements.txt`
