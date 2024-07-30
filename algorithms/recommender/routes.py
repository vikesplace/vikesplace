import recommender.es_request as es_request
import recommender.mongodb_request as mongodb_request
import neo4j_api as neo4j_request
import recommender.similarity as similarity
from fastapi import FastAPI, Path, Query, status
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from pydantic import BaseModel

class User(BaseModel):
    user_id: int

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the Database connection objects
    global ESRequest
    global MONGORequest
    global Neo4jDBRequest
    global Sent_Model

    ESRequest = es_request.ESRequest()
    MONGORequest = mongodb_request.MongoDBRequest()
    Neo4jDBRequest = neo4j_request.Neo4jDBRequest()
    Sent_Model = similarity.Sent_Model()

    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "VikesPlace Recommendation Service"}


@app.get("/recommendations")
async def recommendations(
    user_id: int = Query(None),
    # location: Annotated[list[float], Query(min_length=2, max_length=2)] = [48.437326, -123.329773]
    latitude: float = 48.437326,
    longitude: float = -123.329773,
):
    lat_long = (latitude, longitude)
    results = await ESRequest.recommendation(
        user_id=user_id,
        user_loc=lat_long)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=results
    )


@app.get("/recommendations_current_item")
async def recommendation_current_item(
    user_id: int = Query(None),
    listing_id: int = Query(None)
):
    results = await ESRequest.recommendation_current_item(user_id, listing_id)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=results
    )


@app.get("/users/{user_id}/recommendations/ignored")
async def recommendations_ignored(
    user_id: str = Path(..., description="The ID of the user")
):
    listings = await MONGORequest.ignored_listings(user_id)
    results = await ESRequest.get_items(listings)

    # add when listing was visited to results
    for i in results:
        i['ignored_at'] = [x for x in listings if x['listing_id']
                           == i['listing_id']][0]['timestamp']

    return {
        "status": status.HTTP_200_OK,
        "message": "List of recommendations ignored",
        "results": results
    }


@app.post("/recommendations/{listing_id}/ignore")
async def ignore_recommendation(
    user: User,
    listing_id: int = Path(..., description="The ID of the listing")
):
    user_id = user.user_id
    results = await MONGORequest.write_ignored(user_id, listing_id)

    return {
        "status": status.HTTP_200_OK,
        "message": "Recommendation ignored succesfully",
        "results": results
    }


@app.get("/adv_recommendations")
async def adv_recommendations(
    user_id: int = Query(None), 
):
    try:
        full_results = await Neo4jDBRequest.get_items_visited_by_other_users(user_id)

        if not full_results:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"results":[]}
            )

        full_results = list(full_results)

        full_results = [dict(item) for item in full_results]

        ignored_listings = await MONGORequest.ignored_listings(user_id)

        if len(ignored_listings) > 10:
            ignored_listings = ignored_listings[len(ignored_listings)-10:]

        ignored_listings_full_data = await ESRequest.get_items_adv(ignored_listings)

        if not ignored_listings_full_data:
            ignored_listings_full_data = []

        full_results_updated = Sent_Model.remove_from_recommendations_sorted(ignored_listings_full_data, full_results)

        full_results_updated = await ESRequest.get_items_adv(full_results_updated)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"results":full_results_updated}
        )
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(content={"error": "Failed to get recommendations"}, status_code=500)
