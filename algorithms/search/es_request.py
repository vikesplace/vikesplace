import os

from dotenv import load_dotenv
from elasticsearch import Elasticsearch
from search import mongodb_request

class ESRequest:
    def __init__(self):
        load_dotenv()
        self.ES_HOST = os.getenv("ES_HOST")
        self.ES_PORT = os.getenv("ES_PORT")
        self.ES_USER = os.getenv("ES_USER")
        self.ES_PASS = os.getenv("ELASTIC_PASSWORD")
        self.ES_CERT_PATH = os.getenv("ES_CERT_PATH")
        self.es = Elasticsearch(
            f"https://{self.ES_HOST}:{self.ES_PORT}/",
            ca_certs='./ca.crt',
            basic_auth=(self.ES_USER, self.ES_PASS)
        )
    
    def search(self, query, lat_long, category=None, status=None):
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
                    "lat_long": {
                                "lat": lat_long[0],
                                "lon": lat_long[1]
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

        results["listings"] = self.es.search(index="listings", query=query_listings,
                                        allow_partial_search_results=True)['hits']['hits']

        results["users"] = self.es.search(index="users", query=query_users,
                                    source=["user_id", "username"],
                                    allow_partial_search_results=True)['hits']['hits']

        results['listings'] = [x['_source'] for x in results['listings']]
        results['users'] = [x['_source'] for x in results['users']]

        print("====================>>>  number of results item:  ",
            len(results["listings"]))

        print("====================>>>  number of results users:  ",
            len(results["users"]))

        print(results)
        return results  # Return only the hits
    
    def get_items(self, listings):
        listing_ids = [item['listing_id'] for item in listings]

        results = self.es.search(
            index="listings",
            query={
                "terms": {
                    "_id": listing_ids
                }
            })

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]

        return results['hits']['hits']
