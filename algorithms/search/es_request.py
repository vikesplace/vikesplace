import os

from dotenv import load_dotenv
from elasticsearch import Elasticsearch


load_dotenv()

# ES connection details
ES_HOST = os.getenv("ES_HOST")
ES_PORT = os.getenv("ES_PORT")
ES_USER = os.getenv("ES_USER")
ES_PASS = os.getenv("ELASTIC_PASSWORD")
ES_CERT_PATH = os.getenv("ES_CERT_PATH")

# default location
#   downtown victoria; lat = 48.407326, lon = -123.329773


def search(query, location, category=None, status=None):
    es = Elasticsearch(
        f"https://{ES_HOST}:{ES_PORT}/",
        ca_certs='./ca.crt',
        basic_auth=(ES_USER, ES_PASS)
    )

    must_clauses = [
        {
            "query_string": {
                "default_field": "title",
                "query": f"*{query}*"
            }
        }
    ]

    filter = [
        {
            "geo_distance": {
                "distance": "5km",
                "location": {
                            "lat": location[0],
                            "lon": location[1]
                }
            }
        }
    ]

    # Furniture, Electronics, Sports, Appliances, Music
    if category:
        filter.append({
            "term": {
                "category.keyword": f"{category}"
            }
        })

    # AVAILABLE, SOLD, REMOVED
    if status:
        filter.append({
            "term": {
                "status.keyword": f"{status}"
            }
        })

    query_listings = {
        "bool": {
            "must": must_clauses,
            "filter": filter
        }
    }

    query_users = {
        "bool": {
            "must": [
                {
                    "query_string": {
                        "default_field": "username",
                        "query": f"*{query}*"
                    }
                }
            ]
        }
    }

    results = {}

    results["listings"] = es.search(index="listings", query=query_listings,
                                    allow_partial_search_results=True)['hits']['hits']

    results["users"] = es.search(index="users", query=query_users,
                                 allow_partial_search_results=True)['hits']['hits']

    print("====================>>>  number of results item:  ",
          len(results["listings"]))

    print("====================>>>  number of results users:  ",
          len(results["users"]))

    print(results)
    return results  # Return only the hits