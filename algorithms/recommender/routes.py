from typing import Annotated

import recommender.es_request as es_request
from fastapi import FastAPI, Path, Query, status
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "VikesPlace Recommendation Service"}


@app.get("/recommendations")
async def search(
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


@app.post("/recommendations/{listing_id}/ignore")
async def search(
    user_id: str = Path(..., description="The ID of the user")
):

    return JSONResponse(
        status_code=status.HTTP_200_OK
    )
