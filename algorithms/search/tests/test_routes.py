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
        "results": [{'_index': 'listings', '_id': '1', '_score': 3.0, '_source': {'price': 100, 'buyer_id': None, 'listed_at': '2024-02-01T10:00:00.000Z', 'category': 'Sports', 'last_updated_at': '2024-02-01T10:00:00.000Z', 'seller_id': 1, 'title': 'Bicycle', 'status': 'AVAILABLE', 'type': 'listings', 'location': {'lon': -123.3856, 'lat': 48.4284}, 'listing_id': 1}}]
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
        "results": [{'_index': 'listings', '_id': '1', '_score': 3.0, '_source': {'price': 100, 'buyer_id': None, 'listed_at': '2024-02-01T10:00:00.000Z', 'category': 'Sports', 'last_updated_at': '2024-02-01T10:00:00.000Z', 'seller_id': 1, 'title': 'Bicycle', 'status': 'AVAILABLE', 'type': 'listings', 'location': {'lon': -123.3856, 'lat': 48.4284}, 'listing_id': 1}}]
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
        "results": [{'_index': 'listings', '_id': '1', '_score': 3.0, '_source': {'price': 100, 'buyer_id': None, 'listed_at': '2024-02-01T10:00:00.000Z', 'category': 'Sports', 'last_updated_at': '2024-02-01T10:00:00.000Z', 'seller_id': 1, 'title': 'Bicycle', 'status': 'AVAILABLE', 'type': 'listings', 'location': {'lon': -123.3856, 'lat': 48.4284}, 'listing_id': 1}}]
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

def test_search_item_inside_radius():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {
        "title": "Biccle",
        "category": "Sports",
        "status": "AVAILABLE",
        "location": [48.437326, -123.329773]
    }
    response = client.get("/search", headers=headers, params=params)

    assert response.status_code == 200
    response.json() == {
        "status": 200,
        "message": "Search successful",
        "results": [{'_index': 'listings', '_id': '1', '_score': 3.0, '_source': {'price': 100, 'buyer_id': None, 'listed_at': '2024-02-01T10:00:00.000Z', 'category': 'Sports', 'last_updated_at': '2024-02-01T10:00:00.000Z', 'seller_id': 1, 'title': 'Bicycle', 'status': 'AVAILABLE', 'type': 'listings', 'location': {'lon': -123.3856, 'lat': 48.4284}, 'listing_id': 1}}]
    }

def test_search_item_outside_radius():
    headers = {"Authorization": "Bearer dfgdsgdgksdgjsdgjdsgjndsgfdgdfkgndfjgdbndfkfnd"} # Assuming a valid token
    params = {
        "title": "Biccle",
        "category": "Sports",
        "status": "AVAILABLE",
        "location": [0.0, 0.0]
    }
    response = client.get("/search", headers=headers, params=params)
    
    assert response.status_code == 200
    assert response.json() == {
        "status": 200,
        "message": "Search successful",
        "results": []
    }