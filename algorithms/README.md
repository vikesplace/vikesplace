# Search Engine and Recommender System

## Requirements
1. Python 3.11+
2. Docker
3. docker-compose

## Environment Setup
In the `./algorithms` folder, run 
1. `pip install -r requirements.txt`
2. `docker-compose up -d --build`
3. Using Docker UI, go to `Volumes` and find `vikesplace-certs`
   1. In the `Data` tab, go to the `ca` folder and copy the  `ca.crt` file into `./algorithms`

## Where is it Running?
- PostgreSQL will be running in `localhost:5432`
- MongoDB `localhost:27017`
- ElasticSearch: `localhost:9200`
- Kibana: `localhost:5601`
- Search API: `localhost:8000`
- Recommender API: `localhost:8001`

## Search Engine
### Running API
Navigate to `./algorithms/search`, then run the following:
1. `pytest` -- ensure tests are **passing!!**
2. `fastapi dev routes.py`
3. Go to http://localhost:8000/docs to view all endpoints

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

### Running API
Navigate to `./recommender/search`, then run the following:
1. `pytest` -- ensure tests are **passing!!**
2. `fastapi dev routes.py`
3. Go to http://localhost:8001/docs to view all endpoints

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