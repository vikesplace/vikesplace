from typing import Annotated

import search.es_request as es_request
import search.mongodb_request as mongodb_request
from fastapi import FastAPI, Path, Query
from pydantic import BaseModel

app = FastAPI()

class SearchQuery(BaseModel):
    query: str

@app.get("/")
async def root():
    return {"message": "VikesPlace Search Service"}

@app.get("/search")
async def search(
    query: str = Query(None),
    location: Annotated[list[float], Query(min_length=2, max_length=2)] = [48.437326, -123.329773],
    category: str = Query(None),
    status: str = Query(None)
):
    # Assuming es_request.search can handle these parameters
    results = es_request.search(query, location, category, status)
    return {
        "status": 200,
        "message": "Search successful",
        "results": results
    }

@app.get("/users/{userId}/searches")
async def search(
    userId: int = Path(..., description="The ID of the user"),
):
    # Assuming es_request.search can handle these parameters
    results = mongodb_request.search_history(userId)
    print(results)
    return {
        "status": 200,
        "message": "Search history successful",
        "results": results 
    }


@app.post("/users/{userId}/searches")
async def search(userId: int, item: SearchQuery):
    query = item.query

    results = mongodb_request.write_search_activity(userId, query)
    print(results)
    print(type(results))

    return {
        "status": 200,
        "message": "Search query saved",
        "results": results 
    }