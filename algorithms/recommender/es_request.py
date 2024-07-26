import os

import recommender.mongodb_request as mongodb_request
from dotenv import load_dotenv
from elasticsearch import Elasticsearch

class ESRequest:
    def __init__(self):
        load_dotenv()

        # ES connection details
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

        self.MONGORequest = mongodb_request.MongoDBRequest()

    def recommendation(self, user_id, user_loc):
        

        # Grab listings viewed by user
        listings = self.MONGORequest.user_activity(user_id)

        # If user has no browsing history, return most popular items
        if listings is None:
            most_pop_items = self.MONGORequest.get_top_10_popular()

            listing_ids = [item['listing_id'] for item in most_pop_items]

            results = self.es.search(
                index="listings", 
                query={
                    "terms": {
                        "_id": listing_ids
                    }
                })
            
            results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
            return results['hits']['hits']

        else:
            # build "like" part of the query, see readme.md
            activity = []
            for i in listings:
                activity.append({"_index": "listings", "_id": f"{i['listing_id']}"})

            q = {
                "bool": {
                    "must": {
                        "more_like_this": {
                            "fields": ["title"],
                            "like": activity,
                            "min_term_freq": 1,
                            "max_query_terms": 12
                        }
                    },
                    "must_not": [
                        {
                            "term": {
                                "seller_id": user_id
                            }
                        }
                    ]
                }
            }
            sort = [
                {
                    "_geo_distance": {
                        "lat_long": {
                            "lat": user_loc[0],
                            "lon": user_loc[1]
                        },
                        "order": "asc",
                        "unit": "km"
                    }
                }
            ]

            results = self.es.search(index="listings", query=q, sort=sort, from_=0, size=5)

            results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
            print(f"recommendation:>>>>>>>>> {results['hits']['hits']}")

            return results['hits']['hits']
        

        
    def recommendation_current_item(self, user_id, listing_id):

        q = {
            "bool": {
                "must": {
                    "more_like_this": {
                        "fields": ["title"],
                        "like": {"_index": "listings", "_id": f"{listing_id}"},
                        "min_term_freq": 1,
                        "max_query_terms": 12
                    }
                },
                "must_not": [
                    {
                        "term": {
                            "seller_id": user_id
                        }
                    }
                ]
            }
        }

        results = self.es.search(index="listings", query=q, from_=0, size=5)

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
        print(f"recommendation_current_item:>>>>>>>>> {results['hits']['hits']}")

        return results['hits']['hits']


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
    
    def get_items_adv(self, listings):
        listing_ids = [item[0] for item in listings]

        results = self.es.search(
            index="listings",
            query={
                "terms": {
                    "_id": listing_ids
                }
            })

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]

        return results['hits']['hits']

