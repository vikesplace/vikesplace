FROM python:3.11-slim

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /search

# Copy requirements 
COPY requirements.txt requirements.txt

# Download and install dependencies
RUN pip install --no-cache-dir --upgrade pip\
    && pip install --no-cache-dir -r requirements.txt

# Copy the source code into the container.
COPY . .

# Expose port
EXPOSE 8000

RUN chmod u+x wait-for-cert.sh