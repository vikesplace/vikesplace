import os

import recommender.mongodb_request as mongodb_request
from dotenv import load_dotenv
from elasticsearch import Elasticsearch

load_dotenv()

# ES connection details
ES_HOST = os.getenv("ES_HOST")
ES_PORT = os.getenv("ES_PORT")
ES_USER = os.getenv("ES_USER")
ES_PASS = os.getenv("ELASTIC_PASSWORD")
ES_CERT_PATH = os.getenv("ES_CERT_PATH")


def recommendation(user_id, user_loc):
    es = Elasticsearch(
        f"https://{ES_HOST}:{ES_PORT}/",
        ca_certs='./ca.crt',
        basic_auth=(ES_USER, ES_PASS)
    )

    # Grab listings viewed by user
    listings = mongodb_request.user_activity(user_id)

    # If user has no browsing history, return most popular items
    if listings is None:
        most_pop_items = mongodb_request.get_top_10_popular()

        listing_ids = [item['listing_id'] for item in most_pop_items]

        results = es.search(
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

        results = es.search(index="listings", query=q, sort=sort, from_=0, size=5)

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
        print(f"recommendation:>>>>>>>>> {results['hits']['hits']}")

        return results['hits']['hits']


def recommendation_current_item(user_id, listing_id):

    es = Elasticsearch(
        f"https://{ES_HOST}:{ES_PORT}/",
        ca_certs='./ca.crt',
        basic_auth=(ES_USER, ES_PASS)
    )

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

    results = es.search(index="listings", query=q, from_=0, size=5)

    results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
    print(f"recommendation_current_item:>>>>>>>>> {results['hits']['hits']}")

    return results['hits']['hits']


def recommendation_most_popular():
    es = Elasticsearch(
        f"https://{ES_HOST}:{ES_PORT}/",
        ca_certs='./ca.crt',
        basic_auth=(ES_USER, ES_PASS)
    )
    
    most_pop_items = mongodb_request.get_top_10_popular()

    listing_ids = []

    for item in most_pop_items:
        listing_ids.append(item['listing_id'])

    results = es.search(
        index="listings", 
        query={
            "terms": {
                "_id": listing_ids
            }
        })
    
    results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
    print(f"recommendation_most_popular:>>>>>>>>> {results['hits']['hits']}")

    return results['hits']['hits']