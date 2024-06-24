from fastapi.testclient import TestClient
from search.routes import app
from fastapi import status

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "VikesPlace Search Service"}


def test_search():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicycle",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['_index'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['price'] == 100
    assert response_obj['results']['listings'][0]['_source']['buyer_username'] == None
    assert response_obj['results']['listings'][0]['_source']['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['_source']['seller_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['_source']['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['_source']['listing_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['type'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['location']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['_source']['location']['lon'] == -123.3856


def test_search_partial_match_prefix():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicyc",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['_index'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['price'] == 100
    assert response_obj['results']['listings'][0]['_source']['buyer_username'] == None
    assert response_obj['results']['listings'][0]['_source']['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['_source']['seller_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['_source']['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['_source']['listing_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['type'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['location']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['_source']['location']['lon'] == -123.3856


def test_search_partial_match_suffix():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "cycle",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['_index'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['price'] == 100
    assert response_obj['results']['listings'][0]['_source']['buyer_username'] == None
    assert response_obj['results']['listings'][0]['_source']['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['_source']['seller_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['_source']['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['_source']['listing_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['type'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['location']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['_source']['location']['lon'] == -123.3856


def test_search_empty_wrong_title():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Biccle",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_user_history():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    user_id = 1
    response = client.get(f"/users/{user_id}/searches")
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'][0]['query'] == 'Laptop'
    assert response_obj['message'] == "Search history successful"


def test_search_invalid_user_history():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    user_id = 5
    response = client.get(f"/users/{user_id}/searches")
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results'] == None
    assert response_obj['message'] == "Search history successful"


def test_save_search_query_with_existing_history():
    user_id = 1
    response = client.post(f"/users/{user_id}/searches", json={"query":"frying pan"})
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    # should return 1 since it updated an existing doc
    assert response_obj['results'] == 1


def test_save_search_query_with_no_existing_history():
    user_id = 999
    response = client.post(f"/users/{user_id}/searches", json={"query":"air fryer"})
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    # should return doc id (user_id) since it created a new doc
    assert response_obj['results'] == user_id


def test_search_item_inside_radius():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicycle",
        "category": "Sports",
        "status": "AVAILABLE",
        "location": [48.437326, -123.329773]
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['_index'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['price'] == 100
    assert response_obj['results']['listings'][0]['_source']['buyer_username'] == None
    assert response_obj['results']['listings'][0]['_source']['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['_source']['seller_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['_source']['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['_source']['listing_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['type'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['location']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['_source']['location']['lon'] == -123.3856


def test_search_item_outside_radius():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Biccle",
        "category": "Sports",
        "status": "AVAILABLE",
        "location": [0.0, 0.0]
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_filter_category():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicycle",
        "category": "Sports",
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['_index'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['price'] == 100
    assert response_obj['results']['listings'][0]['_source']['buyer_username'] == None
    assert response_obj['results']['listings'][0]['_source']['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['_source']['seller_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['_source']['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['_source']['listing_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['type'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['location']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['_source']['location']['lon'] == -123.3856


def test_search_filter_bad_category():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicycle",
        "category": "bad_category",
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_filter_status():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicycle",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['_index'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['price'] == 100
    assert response_obj['results']['listings'][0]['_source']['buyer_username'] == None
    assert response_obj['results']['listings'][0]['_source']['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['_source']['seller_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['_source']['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['_source']['listing_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['type'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['location']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['_source']['location']['lon'] == -123.3856


def test_search_filter_bad_status():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicycle",
        "status": "bad_status"
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_filter_category_and_status():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicycle",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'][0]['_index'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['price'] == 100
    assert response_obj['results']['listings'][0]['_source']['buyer_username'] == None
    assert response_obj['results']['listings'][0]['_source']['category'] == 'Sports'
    assert response_obj['results']['listings'][0]['_source']['seller_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['title'] == 'Bicycle'
    assert response_obj['results']['listings'][0]['_source']['status'] == 'AVAILABLE'
    assert response_obj['results']['listings'][0]['_source']['listing_id'] == 1
    assert response_obj['results']['listings'][0]['_source']['type'] == 'listings'
    assert response_obj['results']['listings'][0]['_source']['location']['lat'] == 48.4284
    assert response_obj['results']['listings'][0]['_source']['location']['lon'] == -123.3856


def test_search_filter_bad_category_and_bad_status():
    # Assuming a valid token
    headers = {
        "Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"}
    params = {
        "query": "Bicycle",
        "category": "bad_category",
        "status": "bad_status"
    }
    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['listings'] == []


def test_search_existing_user():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {"query":"Alice"}

    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['message'] == "Search successful"
    assert response_obj['results']['users'][0]["_source"]['username'] == "Alice"
    assert response_obj['results']['users'][0]["_source"]['user_id'] == 1


def test_search_non_existing_user():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {"query":"ziera"}

    response = client.get("/search", headers=headers, params=params)
    response_obj = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_obj['results']['users'] == []

