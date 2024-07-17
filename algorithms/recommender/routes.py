import recommender.es_request as es_request
import recommender.mongodb_request as mongodb_request
from fastapi import FastAPI, Path, Query, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()


class User(BaseModel):
    user_id: int


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
    results = es_request.recommendation(
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
    results = es_request.recommendation_current_item(user_id, listing_id)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=results
    )


@app.get("/users/{user_id}/recommendations/ignored")
async def recommendations_ignored(
    user_id: str = Path(..., description="The ID of the user")
):
    listings = mongodb_request.ignored_listings(user_id)
    results = es_request.get_items(listings)

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
    results = mongodb_request.write_ignored(user_id, listing_id)

    return {
        "status": status.HTTP_200_OK,
        "message": "Recommendation ignored succesfully",
        "results": results
    }


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
