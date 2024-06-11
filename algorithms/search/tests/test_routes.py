from fastapi.testclient import TestClient
from search.routes import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "VikesPlace Search Service"}

def test_search():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {
        "title": "Bicycle",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    assert response.status_code == 200
    assert response.json() == {
        "status": 200,
        "message": "Search successful",
        "results": [{'_index': 'listings', '_id': '1', '_score': 3.0, '_source': {'seller_id': 1, 'listing_id': 1, 'buyer_id': None, 'category': 'Sports', 'listed_at': '2024-02-01T10:00:00.000Z', 'status': 'AVAILABLE', 'title': 'Bicycle', 'location': '(-123.3656,48.4284)', 'type': 'listings', 'last_updated_at': '2024-02-01T10:00:00.000Z', 'price': 100.0}}]
    }

def test_search_partial_match_prefix():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {
        "title": "Bicyc",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    assert response.status_code == 200
    assert response.json() == {
        "status": 200,
        "message": "Search successful",
        "results": [{'_index': 'listings', '_id': '1', '_score': 3.0, '_source': {'seller_id': 1, 'listing_id': 1, 'buyer_id': None, 'category': 'Sports', 'listed_at': '2024-02-01T10:00:00.000Z', 'status': 'AVAILABLE', 'title': 'Bicycle', 'location': '(-123.3656,48.4284)', 'type': 'listings', 'last_updated_at': '2024-02-01T10:00:00.000Z', 'price': 100.0}}]  
    }

def test_search_partial_match_suffix():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {
        "title": "cycle",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    assert response.status_code == 200
    assert response.json() == {
        "status": 200,
        "message": "Search successful",
        "results": [{'_index': 'listings', '_id': '1', '_score': 3.0, '_source': {'seller_id': 1, 'listing_id': 1, 'buyer_id': None, 'category': 'Sports', 'listed_at': '2024-02-01T10:00:00.000Z', 'status': 'AVAILABLE', 'title': 'Bicycle', 'location': '(-123.3656,48.4284)', 'type': 'listings', 'last_updated_at': '2024-02-01T10:00:00.000Z', 'price': 100.0}}] 
    }

def test_search_empty_wrong_category():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {
        "title": "Bicycle",
        "category": "Electronics",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    assert response.status_code == 200
    assert response.json() == {
        "status": 200,
        "message": "Search successful",
        "results": []  # Assuming an empty list for now
    }

def test_search_empty_wrong_title():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {
        "title": "Biccle",
        "category": "Sports",
        "status": "AVAILABLE"
    }
    response = client.get("/search", headers=headers, params=params)
    assert response.status_code == 200
    assert response.json() == {
        "status": 200,
        "message": "Search successful",
        "results": []  # Assuming an empty list for now
    }

def test_search_user():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {"username":"Alice"}

    response = client.get("/search", headers=headers, params=params)
    assert response.status_code == 200
    assert response.json() == {
        "status": 200,
        "message": "Search successful",
        "results": []  # Assuming an empty list for now
    }