# Search Engine and Recommender System

## Search Engine

### Elastic Services & DB
Run `docker-compose up -d --build` in `./algorithms`.

### API
Navigate to `./algorithms/search`, then run the following:
1. `pip install -r requirements.txt`
2. `fastapi dev routes.py`
3. Go to http://localhost:8000/docs to view all endpoints

#### Testing
Run `pytest` in `./algorithms/search/tests`


## Recommender System