import os
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

# We pass tlsCAFile=certifi.where() to force Python to use up-to-date SSL certificates
client = AsyncIOMotorClient(MONGO_URI, tlsCAFile=certifi.where())

db = client.pulsetriage_db
patients_collection = db.get_collection("patients")