FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt requirements.txt
COPY relations.py relations.py

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip\
    && pip install --no-cache-dir -r requirements.txt

CMD ["python", "relations.py"]