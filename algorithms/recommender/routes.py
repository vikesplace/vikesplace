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
    results = ESRequest.recommendation(
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
    results = ESRequest.recommendation_current_item(user_id, listing_id)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=results
    )


@app.get("/users/{user_id}/recommendations/ignored")
async def recommendations_ignored(
    user_id: str = Path(..., description="The ID of the user")
):
    listings = MONGORequest.ignored_listings(user_id)
    results = ESRequest.get_items(listings)

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
    results = MONGORequest.write_ignored(user_id, listing_id)

    return {
        "status": status.HTTP_200_OK,
        "message": "Recommendation ignored succesfully",
        "results": results
    }


@app.get("/adv_recommendations")
async def recommendations(
    user_id: int = Query(None), 
    latitude: float = 48.437326,
    longitude: float = -123.329773,
):
    location = (latitude, longitude)
    try:
        results = Neo4jDBRequest.get_items_visited_by_other_users(user_id)
        print(results)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"results":results}
        )
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(content={"error": "Failed to get recommendations"}, status_code=500)


@app.get("/recommendations_for_new_user")
async def recommendations(
    user_id: int = Query(None), 
    # latitude: float = 48.437326,
    # longitude: float = -123.329773,
):
    # location = (latitude, longitude)
    try:
        results = Neo4jDBRequest.get_top_items_within_same_postal_code(user_id)
        print(results)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"results":results}
        )
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(content={"error": "Failed to get recommendations"}, status_code=500)
    

# @app.delete("/users/{user_id}/recommendations/{listing_id}/ignoren't")
# async def delete_recommendation_ignored(
#     user_id: int = Path(..., description="The ID of the user"),
#     listing_id: int = Path(..., description="The ID of the listing")
# ):
#     results = mongodb_request.delete_ignored(user_id, listing_id)

#     return {
#         "status": status.HTTP_200_OK,
#         "message": "Recommendation ignoredn't succesfully",
#         "results": results
#     }
