import search.es_request as es_request
import search.mongodb_request as mongodb_request
from fastapi import FastAPI, Path, Query
from pydantic import BaseModel
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the Database connection objects
    global ESRequest
    global MONGORequest
    ESRequest = es_request.ESRequest()
    MONGORequest = mongodb_request.MongoDBRequest()

    yield


app = FastAPI(lifespan=lifespan)


class SearchQuery(BaseModel):
    query: str

@app.get("/")
async def root():
    return {"message": "VikesPlace Search Service"}

@app.get("/search")
async def search(
    query: str = Query(None),
    # location: Annotated[list[float], Query(min_length=2, max_length=2)] = [48.437326, -123.329773],
    latitude: float = 48.437326,
    longitude: float = -123.329773,
    category: str = Query(None),
    status: str = Query(None)
):
    # Assuming es_request.search can handle these parameters
    lat_long = (latitude, longitude)
    results = ESRequest.search(query, lat_long, category, status)
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
    results = MONGORequest.search_history(userId)
    print(results)
    return {
        "status": 200,
        "message": "Search history successful",
        "results": results
    }


@app.post("/users/{userId}/searches")
async def search(userId: int, item: SearchQuery):
    query = item.query

    results = MONGORequest.write_search_activity(userId, query)
    print(results)
    print(type(results))

    return {
        "status": 200,
        "message": "Search query saved",
        "results": results
    }


@app.get("/users/{userId}/listings")
async def search(
    userId: int = Path(..., description="The ID of the user"),
):
    # Assuming es_request.search can handle these parameters
    listings = MONGORequest.user_activity(userId)
    results = ESRequest.get_items(listings)

    # add when listing was visited to results
    for i in results:
        i['visited_at'] = [x for x in listings if x['listing_id']
                           == i['listing_id']][0]['timestamp']

    print(results)
    return {
        "status": 200,
        "message": "Listings browsing history successful",
        "results": results
    }


@app.post("/users/{userId}/listings/{listingId}")
async def search(userId: int, listingId: int):
    results = MONGORequest.write_user_activity(userId, listingId)

    return {
        "status": 200,
        "message": "Listing view saved",
        "results": results
    }


@app.delete("/users/{userId}/listings/{listingId}")
async def search(userId: int, listingId: int):
    results = MONGORequest.delete_user_activity(userId, listingId)

    return {
        "status": 200,
        "message": "Listing view deleted",
        "results": results
    }
