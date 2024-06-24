FROM python:3.11-slim

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /recommender

# Copy requirements 
COPY requirements.txt requirements.txt

# Download and install dependencies
RUN pip install --no-cache-dir --upgrade pip\
    && pip install --no-cache-dir -r requirements.txt

RUN apt-get update\
    && apt-get -qq -y install curl\
    && apt-get -qq -y install jq

# Copy the source code into the container.
COPY . .

# Expose port
EXPOSE 8001

RUN sed -i 's/\r$//' wait-for-cert.sh  && \
    chmod +x wait-for-cert.sh

RUN sed -i 's/\r$//' wait-for-elastic.sh  && \
    chmod +x wait-for-elastic.sh