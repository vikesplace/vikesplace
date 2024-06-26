FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY geojson_converter.py geojson_converter.py

CMD ["faust", "-A", "geojson_converter", "worker", "-l", "info"]
