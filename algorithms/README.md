# Search Engine and Recommender System

## Requirements
1. Python 3.11+
2. Docker
3. docker-compose

## Getting Started

In the `./algorithms` folder, run 
```
docker-compose up -d --build
```

To stop, run
```
docker-compose down -v
```
> Need to delete the volumes since certificates will change at every startup

### Where is it Running?
- PostgreSQL will be running in `localhost:5432`
- MongoDB: `localhost:27017`
- ElasticSearch: `localhost:9200`
- Kibana: `localhost:5601`
- Search API: `localhost:8000`
- Recommender API: `localhost:8001`

### Running Tests Locally
Assumming that you have started the containers:
1. Run `pip install -r requirements.txt` in both `./algorithms/search` and `./algorithms/recommender`
2. Using Docker UI, go to `Volumes` and find `vikesplace-certs`
3. In the `Data` tab, go to the `ca` folder and copy the `ca.crt` file into `./algorithms/`
4. From `./algorithms` folder, the run the tests using `pytest -vv`
    1. You can run specific test folders, `pytest -vv ./search/tests/`
    2. You can run specific test files, `pytest -vv ./search/tests/test_routes.py`
    3. You can run specific test cases, `pytest -vv ./search/tests/test_routes.py::test_save_search_query_with_existing_history`

## Search Engine
View all API endpoints by going to `http://localhost:8000/docs`

### Search Using Kibana Console
Use the Kibana console as a sanity checker for your queries - `localhost:5601`
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
View all API endpoints by going to `http://localhost:8001/docs`

### Get Recommendations Using Kibana Console
Use the Kibana console as a sanity checker for your queries - `localhost:5601`
```
GET listings/_search
{ 
  "from": 0,
  "size": 5, 
  "sort": [
    {
      "_geo_distance" : {
        "location" : {
            "lat" : 48.437326, 
            "lon" : -123.329773
          },
        "order" : "asc",
        "unit" : "km"
      }
    }
  ],
  "query": {
    "bool": {
      "must": {
          "more_like_this": {
            "fields": ["title"],
            "like": [
              {
                "_index": "listings",
                "_id": "25"
              },
              {
                "_index": "listings",
                "_id": "31"
              }
            ],
            "min_term_freq": 1,
            "max_query_terms": 12
          }
        },
      "must_not": [
        {
          "term": {
              "seller_id": 12
            }
        }
      ]
    } 
  }
}
```
