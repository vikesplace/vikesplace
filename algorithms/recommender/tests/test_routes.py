import pytest
import recommender.mongodb_request as mongodb_request
import recommender.similarity as similarity
import requests
from fastapi import status

# Base URL for the deployed FastAPI instance
BASE_URL = "http://localhost:8001"

MongoDBRequest_OBJ = mongodb_request.MongoDBRequest()

def test_read_root():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200
    assert response.json() == {"message": "VikesPlace Recommendation Service"}


def test_recommender_with_activity_history():
    user_id = 1
    params = {
        "user_id": user_id,
        # "location": [48.3784,-123.4156],
        "latitude": 48.3784,
        "longitude": -123.4156
    }
    response = requests.get(
        f"{BASE_URL}/recommendations", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj) == 5

    for obj in response_obj:
        assert obj['seller_id'] != user_id


def test_recommender_with_no_activity_history():
    user_id = 1_000_000_000
    params = {
        "user_id": user_id,
        # "location": [48.467289,-123.404489],
        "latitude": 48.467289,
        "longitude": -123.404489
    }
    response = requests.get(
        f"{BASE_URL}/recommendations", params=params)
    response_obj = response.json()

    # should receive most popular items since user has not activity history
    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj) == 10
    for obj in response_obj:
        assert obj["title"] != None


def test_recommender_current_item():
    user_id = 1
    listing_id = 25
    params = {
        "user_id": user_id,
        "listing_id": listing_id
    }
    response = requests.get(
        f"{BASE_URL}/recommendations_current_item", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj) == 5
    for obj in response_obj:
        assert obj['seller_id'] != user_id


def test_view_listings_ignored():
    user_id = 1
    response = requests.get(
        f"{BASE_URL}/users/{user_id}/recommendations/ignored")
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj['results']) >= 1
    for i in response_obj['results']:
        assert i['listing_id'] is not None
        assert i['ignored_at'] is not None


def test_ignore_recommendation_and_delete_ignored_recommendation():
    user_id = 1
    listing_id = 65
    response = requests.post(
        f"{BASE_URL}/recommendations/{listing_id}/ignore", json={"user_id": user_id})
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'] == 1

    delete_result = MongoDBRequest_OBJ.delete_ignored(user_id, listing_id)

    assert delete_result == 1


def test_remove_item_similar_to_ignored_from_recommendations():
    recommendations = [{'title': 'XPS 15 Laptop'},
                       {'title': 'MacBook Pro Laptop'},
                       {'title': 'Lenovo Thinkpad Laptop'},
                       {'title': 'Surface Laptop'},
                       {'title': 'Laptop Case Macbook 13"'}]
    
    ignored = [{'title': 'HP Printer'}, {'title': 'Laptop Case 15"'}]

    new_rec = similarity.remove_from_recommendations(ignored, recommendations)

    assert {'title': 'Laptop Case Macbook 13"'} not in new_rec
    assert {'title': 'XPS 15 Laptop'} not in new_rec
    assert len(new_rec) < 5



def test_view_listings_ignored():
    user_id = 1
    response = requests.get(
        f"{BASE_URL}/users/{user_id}/recommendations/ignored")
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj['results']) >= 1
    for i in response_obj['results']:
        assert i['listing_id'] is not None
        assert i['ignored_at'] is not None


def test_ignore_recommendation_and_delete_ignored_recommendation():
    user_id = 1
    listing_id = 65
    response = requests.post(
        f"{BASE_URL}/recommendations/{listing_id}/ignore", json={"user_id": user_id})
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'] == 1

    delete_result = MongoDBRequest_OBJ.delete_ignored(user_id, listing_id)

    assert delete_result == 1
