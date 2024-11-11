# Use an official Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies needed for psycopg2
RUN apt-get update \
    && apt-get install -y libpq-dev gcc \
    && apt-get clean

# Upgrade pip
RUN pip install --upgrade pip

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8000

# Command to run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
