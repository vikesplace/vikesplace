from fastapi import status
from fastapi.testclient import TestClient
from recommender.routes import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "VikesPlace Recommendation Service"}


def test_recommender_with_activity_history():
    user_id = 1
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "user_id": user_id,
        "location": [48.3784,-123.4156],
    }
    response = client.get("/recommendations", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj) == 5

    for obj in response_obj:
        assert obj['_index'] == 'listings'
        assert obj['_source']['seller_id'] != user_id


def test_recommender_with_no_activity_history():
    user_id = 17
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "user_id": user_id,
        "location": [48.467289,-123.404489],
    }
    response = client.get("/recommendations", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj == None


def test_recommender_current_item():
    user_id = 1
    listing_id = 25
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "user_id": user_id,
        "listing_id": listing_id
    }
    response = client.get("/recommendations_current_item", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj) == 5
    
    for obj in response_obj:
        assert obj['_index'] == 'listings'
        assert obj['_source']['seller_id'] != user_id


def test_recommender_most_popular_items():
    response = client.get("/recommendations_most_popular")
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj) == 10