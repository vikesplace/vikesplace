import os

from dotenv import load_dotenv
from elasticsearch import Elasticsearch
from search import mongodb_request

load_dotenv()

# ES connection details
ES_HOST = os.getenv("ES_HOST")
ES_PORT = os.getenv("ES_PORT")
ES_USER = os.getenv("ES_USER")
ES_PASS = os.getenv("ELASTIC_PASSWORD")
ES_CERT_PATH = os.getenv("ES_CERT_PATH")

# default lat_long
#   downtown victoria; lat = 48.407326, lon = -123.329773


def term_filter(term, value):
    if value:
        return {
            "term": {
                f"{term}.keyword": f"{value}"
            }
        }
    else:
        return None


def price_filter(min_price=None, max_price=None):
    if min_price and max_price:
        return {
            "range": {
                "price": {
                    "gte": min_price,
                    "lte": max_price
                }
            }
        }
    elif min_price:
        return {
            "range": {
                "price": {
                    "gte": min_price
                }
            }
        }
    elif max_price:
        return {
            "range": {
                "price": {
                    "lte": max_price
                }
            }
        }
    else:
        return None


def sort_option(sort_by, is_descending):
    return [{
        f"{sort_by}": {
            "order": f'{"desc" if is_descending else "asc"}'
        }
    }]


def search(query, lat_long, category=None, status=None, min_price=None,
           max_price=None, sort_by=None, is_descending=None):
    es = Elasticsearch(
        f"https://{ES_HOST}:{ES_PORT}/",
        ca_certs='./ca.crt',
        basic_auth=(ES_USER, ES_PASS)
    )

    must_clauses = [{
        "query_string": {
            "default_field": "title",
            "query": f"*{query}*"
        }
    }]

    filter = [{
        "geo_distance": {
            "distance": "5km",
            "lat_long": {"lat": lat_long[0], "lon": lat_long[1]}
        }
    }]

    # Categories
    filter.append(term_filter("category", category))

    # AVAILABLE, SOLD, REMOVED
    filter.append(term_filter("status", status))

    # Price
    filter.append(price_filter(min_price, max_price))

    # Cleanup filter - remove None
    filter = [x for x in filter if x is not None]

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

    print("ndawiudnawidunad", filter)
    results["listings"] = es.search(index="listings",
                                    query=query_listings,
                                    sort=sort_option(sort_by, is_descending),
                                    allow_partial_search_results=True
                                    )['hits']['hits']

    results["users"] = es.search(index="users",
                                 query=query_users,
                                 allow_partial_search_results=True
                                 )['hits']['hits']

    results['listings'] = [x['_source'] for x in results['listings']]
    results['users'] = [x['_source'] for x in results['users']]

    print("====================>>>  number of results item:  ",
          len(results["listings"]))

    print("====================>>>  number of results users:  ",
          len(results["users"]))

    print(results)
    return results  # Return only the hits


def get_items(listings):
    es = Elasticsearch(
        f"https://{ES_HOST}:{ES_PORT}/",
        ca_certs='./ca.crt',
        basic_auth=(ES_USER, ES_PASS)
    )

    listing_ids = [item['listing_id'] for item in listings]

    results = es.search(
        index="listings",
        query={
            "terms": {
                "_id": listing_ids
            }
        })

    results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]

    return results['hits']['hits']
