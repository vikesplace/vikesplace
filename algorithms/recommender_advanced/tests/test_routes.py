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


# def test_recommender_with_no_activity_history():
#     user_id = 17
#     headers = {
#         "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
#     params = {
#         "user_id": user_id,
#         # "location": [48.467289,-123.404489],
#         "latitude": 48.467289,
#         "longitude": -123.404489
#     }
#     response = requests.get(f"{BASE_URL}/recommendations", headers=headers, params=params)
#     response_obj = response.json()

#     assert response.status_code == status.HTTP_200_OK
#     assert response_obj == None


# def test_recommender_most_popular_items():
#     response = requests.get(f"{BASE_URL}/recommendations_most_popular")
#     response_obj = response.json()

#     assert response.status_code == status.HTTP_200_OK
#     assert len(response_obj) == 10
#     for obj in response_obj:
#         assert obj["title"] != None