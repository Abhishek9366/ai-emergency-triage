# Step 1: Base Python environment
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /code

# Step 2: Copy your requirements and install dependencies
COPY ./backend/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Step 3: Copy your backend code and the compiled frontend build
COPY ./backend /code/backend
COPY ./frontend/dist /code/frontend/dist

# Step 4: Switch working directory to run the server script
WORKDIR /code/backend

# Step 5: Start the FastAPI server on port 7860 (Hugging Face's required port)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]