from typing import Annotated

import recommender.es_request as es_request
import recommender.mongodb_request as mongodb_request
from fastapi import FastAPI, Path, Query, status
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "VikesPlace Recommendation Service"}


@app.get("/recommendations")
async def recommendations(
    user_id: int = Query(None), 
    location: Annotated[list[float], Query(min_length=2, max_length=2)] = [48.437326, -123.329773]
):
    
    results = es_request.recommendation(
        user_id=user_id,
        user_loc=location)

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

    print(f"WDIUANDiADBWiaubd{results}")
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=results
    )


@app.get("/recommendations_most_pop")
async def recommendations_most_pop():
    results = mongodb_request.get_top_10_popular()

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=results
    )


@app.post("/recommendations/{listing_id}/ignore")
async def recommendation_ignore(
    user_id: str = Path(..., description="The ID of the user")
):

    return JSONResponse(
        status_code=status.HTTP_200_OK
    )
