from fastapi import FastAPI, Query
import search.es_request as es_request

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "VikesPlace Search Service"}

@app.get("/search")
async def search(
    title: str = Query(None),
    location: list = [48.437326, -123.329773],
    category: str = Query(None),
    status: str = Query(None)
):
    # Assuming es_request.search can handle these parameters
    results = es_request.search(title, location, category, status)
    return {
        "status": 200,
        "message": "Search successful",
        "results": results
    }
