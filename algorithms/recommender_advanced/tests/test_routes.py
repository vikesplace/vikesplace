import requests
from fastapi import status

# Base URL for the deployed FastAPI instance
BASE_URL = "http://localhost:8002"


def test_read_root():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200
    assert response.json() == {"message": "VikesPlace Recommendation Service 2.0"}


def test_recommender_with_activity_history():
    user_id = 7
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "user_id": user_id,
        "latitude": 48.3784,
        "longitude": -123.4156
    }
    response = requests.get(f"{BASE_URL}/recommendations", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj["results"]) == 2

def test_recommender_with_no_activity_history():
    user_id = 18
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "user_id": user_id,
    }
    response = requests.get(f"{BASE_URL}/recommendations_for_new_user", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj["results"]) == 10
