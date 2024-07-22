from typing import Annotated

import neo4j_api as neo4j_request
from fastapi import FastAPI, Path, Query, status
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the Database connection objects
    global Neo4jDBRequest
    Neo4jDBRequest = neo4j_request.Neo4jDBRequest()

    yield

app = FastAPI(lifespan=lifespan)

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
