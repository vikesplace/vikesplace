FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt /app/requirements.txt
COPY kafka_consumer.py /app/kafka_consumer.py
COPY neo4j_api.py /app/neo4j_api.py

# Install dependencies
RUN pip install -r requirements.txt

CMD ["python", "kafka_consumer.py"]