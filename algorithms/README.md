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