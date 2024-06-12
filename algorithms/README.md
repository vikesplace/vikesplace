# Search Engine and Recommender System

## Search Engine

### Running Elastic Services & DB
Run `docker-compose up -d --build` in `./algorithms`.


### Running API
Navigate to `./algorithms/search`, then run the following:
1. `pip install -r requirements.txt`
2. `pytest` -- ensure tests are **passing!!**
3. `fastapi dev routes.py`
4. Go to http://localhost:8000/docs to view all endpoints


### Search Using Kibana Console
```
GET listings/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "query_string": {
            "default_field": "title",
            "query": "bicycle"
          }
        }
      ],
      "filter": [
        {
          "geo_distance": {
            "distance": "5km",
            # random coord for victoria
            "location": {
              "lat": 48.437326,
              "lon": -123.329773
            }
          }
        }
      ]
    }
  }
}
```

## Recommender System