from fastapi.testclient import TestClient

from search.routes import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_fail():
    response = client.get("/")
    assert response.status_code == 400
