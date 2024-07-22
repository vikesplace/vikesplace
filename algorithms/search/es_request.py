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

    def term_filter(self, term, value):
        if value:
            return {
                "term": {f"{term}.keyword": f"{value}"}
            }
        else:
            return None

    def price_filter(self, min_price=None, max_price=None):
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
                    "price": {"gte": min_price}
                }
            }
        elif max_price:
            return {
                "range": {
                    "price": {"lte": max_price}
                }
            }
        else:
            return None

    def sort_option(self, sort_by, is_descending):
        return [{
            f"{sort_by}": {
                "order": f'{"desc" if is_descending else "asc"}'
            }
        }]

    def search(self, query, lat_long, category=None, status=None,
               min_price=None, max_price=None, sort_by=None, is_descending=None):

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
        filter.append(self.term_filter("category", category))

        # AVAILABLE, SOLD, REMOVED
        filter.append(self.term_filter("status", status))

        # Price
        filter.append(self.price_filter(min_price, max_price))

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

        if sort_by is None:
            results["listings"] = self.es.search(index="listings",
                                                query=query_listings,
                                                allow_partial_search_results=True,
                                                from_=0, size=10_000
                                                )['hits']['hits']
        else:
            results["listings"] = self.es.search(index="listings",
                                                query=query_listings,
                                                sort=self.sort_option(sort_by, is_descending),
                                                allow_partial_search_results=True,
                                                from_=0, size=10_000
                                                )['hits']['hits']

        results["users"] = self.es.search(index="users",
                                          query=query_users,
                                          source=["user_id", "username"],
                                          allow_partial_search_results=True,
                                          from_=0, size=10_000
                                          )['hits']['hits']

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
            }, from_=0, size=10_000)

        results['hits']['hits'] = [x['_source']
                                   for x in results['hits']['hits']]

        return results['hits']['hits']
