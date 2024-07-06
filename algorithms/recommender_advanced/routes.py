from typing import Annotated

import neo4j_api as neo4j_request
from fastapi import FastAPI, Path, Query, status
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "VikesPlace Recommendation Service 2.0"}


@app.get("/recommendations")
async def recommendations(
    user_id: int = Query(None), 
    latitude: float = 48.437326,
    longitude: float = -123.329773,
):
    location = (latitude, longitude)
    try:
        results = neo4j_request.get_items_visited_by_other_users(user_id)
        print(results)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"results":results}
        )
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(content={"error": "Failed to get recommendations"}, status_code=500)
