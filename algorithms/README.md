# Search Engine and Recommender System

## Requirements
1. Python 3.11+
2. Docker
3. docker-compose

## Getting Started

In the `./vikesplace/algorithms` folder, run 
```
docker-compose up -d --build
```
> Disclaimer: Search and Recommender APIs will be available once ElasticSearch is populated with data (this process might take a while, e.g. 5 minutes).

To stop, run
```
docker-compose down -v
```
> The `-v` flag deletes the volumes created by our services - this is
> required because currently we **don't** want to persist any data in
> ElasticSearch and PostgresSQL.

### Where is it Running?
- PostgreSQL will be running in `localhost:5432`
- MongoDB: `localhost:27017`
- ElasticSearch: `localhost:9200`
- Kibana: `localhost:5601`
- Search API: `localhost:8000`
- Recommender API: `localhost:8001`

## Try the API
Assumming that you have the application running
- Go to `http://localhost:8000/docs` to access the Search API
     - or `http://localhost:8001/docs` to access the Recommender API
- From there, you can select an endpoint and click on `Try it out`
- Add parameters if necessary, then click `Execute`

### Search Using Kibana Console
Use the Kibana console as a sanity checker for your queries:
- Go to `localhost:5601` and login; the credentials are `elastic:a123456`
- Click on `Search`
- Then, on the panel on the left, go to `Indices`
- Finally, on the bottom of the page, click on `Console`, then paste and run the query below
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

### Get Recommendations Using Kibana Console
Use the Kibana console as a sanity checker for your queries:
- Go to `localhost:5601` and login; the credentials are `elastic:a123456`
- Click on `Search`
- Then, on the panel on the left, go to `Indices`
- Finally, on the bottom of the page, click on `Console`, then paste and run the query below
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

## Contributing
### Modifying & Adding New Features
Assumming that you want to make changes to the APIs, restarting all services will 
take a long time, therefore we recommend doing the following: 

1. Build new images
```
docker-compose build
```
1. Update and restart only the containers you want
```
docker-compose up -d --no-deps <service>
```
To test the API locally, you must do the following:
1. Run `pip install -r requirements.txt` in both `./algorithms/search` and 
  `./algorithms/recommender`
2. Using Docker UI, go to `Volumes` and find `vikesplace-certs`
3. In the `Data` tab, go to the `ca` folder and copy the `ca.crt` file into the 
folder you're running your commands from.
   - Ex. 1: If we're running tests from `./algorithms/`, then we must place the 
    `ca.crt` in the `./algorithms` folder.
   - Ex. 2: If we're running tests from `./algorithms/search`, then we must place 
    the `ca.crt` in the `./algorithms/search` folder.

1. Run the tests using `pytest -vv`
    1. You can run specific test folders, `pytest -vv ./search/tests/`
    2. You can run specific test files, `pytest -vv ./search/tests/test_routes.py`
    3. You can run specific test cases, `pytest -vv ./search/tests/test_routes.py::test_save_search_query_with_existing_history`

