import pytest
import requests
import search.mongodb_request as mongodb_request
from fastapi import status

# Base URL for the deployed FastAPI instance
BASE_URL = "http://localhost:8000"
MONGORequest = mongodb_request.MongoDBRequest()

def test_read_root():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200
    assert response.json() == {"message": "VikesPlace Search Service"}


def test_search():
    params = {
        "query": "Bicycle",
        "user_id": 1,
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['price'] == 100
    assert response_obj['results']['listings'][0]['buyer_username'] is None
    assert response_obj['results']['listings'][0]['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['seller_id'] == 1
    assert response_obj['results']['listings'][0]['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['listing_id'] == 1
    assert response_obj['results']['listings'][0]['type'] == 'listings'
    assert response_obj['results']['listings'][0]['lat_long']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['lat_long']['lon'] == -123.3856


def test_search_partial_match_prefix():
    params = {
        "query": "Bicyc",
        "user_id": 1,
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['price'] == 100
    assert response_obj['results']['listings'][0]['buyer_username'] is None
    assert response_obj['results']['listings'][0]['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['seller_id'] == 1
    assert response_obj['results']['listings'][0]['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['listing_id'] == 1
    assert response_obj['results']['listings'][0]['type'] == 'listings'
    assert response_obj['results']['listings'][0]['lat_long']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['lat_long']['lon'] == -123.3856


def test_search_partial_match_suffix():
    params = {
        "query": "cycle",
        "user_id": 1,
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['price'] == 100
    assert response_obj['results']['listings'][0]['buyer_username'] is None
    assert response_obj['results']['listings'][0]['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['seller_id'] == 1
    assert response_obj['results']['listings'][0]['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['listing_id'] == 1
    assert response_obj['results']['listings'][0]['type'] == 'listings'
    assert response_obj['results']['listings'][0]['lat_long']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['lat_long']['lon'] == -123.3856


def test_search_empty_wrong_title():
    params = {
        "query": "Biccle",
        "user_id": 1,
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_user_history():
    user_id = 1
    response = requests.get(f"{BASE_URL}/users/{user_id}/searches")
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'][0]['query'] is not None
    assert response_obj['message'] == "Search history successful"


def test_search_invalid_user_history():
    user_id = 1_000_000_000
    response = requests.get(f"{BASE_URL}/users/{user_id}/searches")
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'] is None
    assert response_obj['message'] == "Search history successful"


def test_save_search_query_with_existing_history():
    user_id = 1
    response = requests.post(
        f"{BASE_URL}/users/{user_id}/searches", json={"query": "frying pan"})
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'] == 1


def test_save_search_query_with_no_existing_history():
    user_id = 999
    # clears off search history from previous test iterations
    MONGORequest.delete_search_document(user_id)
    response = requests.post(
        f"{BASE_URL}/users/{user_id}/searches", json={"query": "air fryer"})
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'] == user_id


def test_search_item_inside_radius():
    params = {
        "query": "Bicycle",
        "user_id": 1,
        "category": "Sports",
        "status": "AVAILABLE",
        "latitude": 48.437326,
        "longitude": -123.329773
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['price'] == 100
    assert response_obj['results']['listings'][0]['buyer_username'] == None
    assert response_obj['results']['listings'][0]['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['seller_id'] == 1
    assert response_obj['results']['listings'][0]['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['listing_id'] == 1
    assert response_obj['results']['listings'][0]['type'] == 'listings'
    assert response_obj['results']['listings'][0]['lat_long']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['lat_long']['lon'] == -123.3856


def test_search_item_outside_radius():
    params = {
        "query": "Biccle",
        "user_id": 1,
        "category": "Sports",
        "status": "AVAILABLE",
        # "location": [0.0, 0.0]
        "latitude": 0.0,
        "longitude": 0.0
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_filter_category():
    params = {
        "query": "Bicycle",
        "user_id": 1,
        "category": "Sports",
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['price'] == 100
    assert response_obj['results']['listings'][0]['buyer_username'] == None
    assert response_obj['results']['listings'][0]['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['seller_id'] == 1
    assert response_obj['results']['listings'][0]['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['listing_id'] == 1
    assert response_obj['results']['listings'][0]['type'] == 'listings'
    assert response_obj['results']['listings'][0]['lat_long']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['lat_long']['lon'] == -123.3856


def test_search_filter_bad_category():
    params = {
        "query": "Bicycle",
        "user_id": 1,
        "category": "bad_category",
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_filter_status():
    params = {
        "query": "Bicycle",
        "user_id": 1,
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['price'] == 100
    assert response_obj['results']['listings'][0]['buyer_username'] == None
    assert response_obj['results']['listings'][0]['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['seller_id'] == 1
    assert response_obj['results']['listings'][0]['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['listing_id'] == 1
    assert response_obj['results']['listings'][0]['type'] == 'listings'
    assert response_obj['results']['listings'][0]['lat_long']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['lat_long']['lon'] == -123.3856


def test_search_filter_bad_status():
    params = {
        "query": "Bicycle",
        "user_id": 1,
        "status": "bad_status"
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_filter_category_and_status():
    params = {
        "query": "Bicycle",
        "user_id": 1,
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['price'] == 100
    assert response_obj['results']['listings'][0]['buyer_username'] == None
    assert response_obj['results']['listings'][0]['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['seller_id'] == 1
    assert response_obj['results']['listings'][0]['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['listing_id'] == 1
    assert response_obj['results']['listings'][0]['type'] == 'listings'
    assert response_obj['results']['listings'][0]['lat_long']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['lat_long']['lon'] == -123.3856


def test_search_filter_bad_category_and_bad_status():
    params = {
        "query": "Bicycle",
        "user_id": 1,
        "category": "bad_category",
        "status": "bad_status"
    }
    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_existing_user():
    params = {
        "query": "Alice",
        "user_id": 1
    }

    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert "Alice" in response_obj['results']['users'][0]['username']
    assert response_obj['results']['users'][0]['user_id'] is not None


def test_search_non_existing_user():
    params = {
        "query": "ziera",
        "user_id": 1
    }

    response = requests.get(f"{BASE_URL}/search", params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results']['users'] == []


def test_view_listings_visited():
    user_id = 1
    response = requests.get(f"{BASE_URL}/users/{user_id}/listings")
    print(response.json())
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert len(response_obj['results']) >= 1
    for i in response_obj['results']:
        assert i['listing_id'] is not None
        assert i['visited_at'] is not None


def test_save_listing_view_and_delete_listing_view():
    user_id = 1
    listing_id = 1
    response = requests.post(
        f"{BASE_URL}/users/{user_id}/listings/{listing_id}")
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'] == 1

    delete_result = MONGORequest.delete_user_activity(user_id, listing_id)

    assert delete_result == 1
