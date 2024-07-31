import os

import recommender.mongodb_request as mongodb_request
from dotenv import load_dotenv
from elasticsearch import AsyncElasticsearch


class ESRequest:
    def __init__(self):
        load_dotenv()
        self.ES_HOST = os.getenv("ES_HOST")
        self.ES_PORT = os.getenv("ES_PORT")
        self.ES_USER = os.getenv("ES_USER")
        self.ES_PASS = os.getenv("ELASTIC_PASSWORD")
        self.ES_CERT_PATH = os.getenv("ES_CERT_PATH")
        self.es = AsyncElasticsearch(
            f"https://{self.ES_HOST}:{self.ES_PORT}/",
            ca_certs='./ca.crt',
            basic_auth=(self.ES_USER, self.ES_PASS),
            timeout=30
        )
        self.MONGORequest = mongodb_request.MongoDBRequest()

    async def get_items(self, listings):
        listing_ids = [item['listing_id'] for item in listings]

        results = await self.es.search(
            index="listings",
            query={"terms": {"_id": listing_ids}}
        )

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
        return results['hits']['hits']

    async def get_user_charity_status(self, user_id):
        results = await self.es.search(
            from_=0, size=1,
            source=['see_charity'],
            index="users",
            query={"term": {"_id": user_id}}
        )

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
        return results['hits']['hits'][0]['see_charity']

    async def recommendation(self, user_id, user_loc):
        # Grab listings viewed by user
        listings = await self.MONGORequest.user_activity(user_id)

        # Grab last 5 listings ignored by user
        listings_ignored = await self.MONGORequest.ignored_listings(user_id, num_items=10)

        # If user has no browsing history, return most popular items
        if listings is None:
            most_pop_items = await self.MONGORequest.get_top_popular(num_items=20)

            results = await self.get_items(most_pop_items)

            return results

        else:
            # build "like" part of the query, see readme.md
            activity = [{"_index": "listings", "_id": f"{i['listing_id']}"} for i in listings]
            must_clauses = []

            if len(listings_ignored) > 0:
                activity_ignored = [{"_index": "listings", "_id": f"{i['listing_id']}"} for i in listings_ignored]
                must_clauses.append({
                    "boosting": {
                        "positive": {
                            "more_like_this": {
                                "fields": ["title"],
                                "like": activity,
                                "min_term_freq": 1,
                                "max_query_terms": 12
                            }
                        },
                        "negative": {
                            "more_like_this": {
                                "fields": ["title"],
                                "like": activity_ignored,
                                "min_term_freq": 1,
                                "max_query_terms": 12
                            }
                        },
                        "negative_boost": 0
                    }
                })

            else:
                must_clauses.append({
                    "more_like_this": {
                        "fields": ["title"],
                        "like": activity,
                        "min_term_freq": 1,
                        "max_query_terms": 12
                    }
                })

            sort = [{
                "_geo_distance": {
                    "lat_long": {"lat": user_loc[0], "lon": user_loc[1]},
                    "order": "asc",
                    "unit": "km"
                }
            }]

            must_not_clauses = [{"term": {"seller_id": user_id}}]

            if (await self.get_user_charity_status(user_id)) is False:
                must_not_clauses.append({"term": {"for_charity": True}})

            query_rec = {
                "bool": {
                    "must": must_clauses,
                    "must_not": must_not_clauses
                }
            }

            results = await self.es.search(index="listings",
                                           query=query_rec,
                                           sort=sort,
                                           from_=0, size=20)

            results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
            print(f">>>>> number of recommendations >>>>>>>>> {len(results['hits']['hits'])}")

            return results['hits']['hits']

    async def recommendation_current_item(self, user_id, listing_id):

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

        results = await self.es.search(index="listings", query=q, from_=0, size=20)

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
        print(f">>>>>count recommendation_current_item:>>>>>>>>> {len(results['hits']['hits'])}")

        return results['hits']['hits']


    async def get_items(self, listings):
        listing_ids = [item['listing_id'] for item in listings]

        results = await self.es.search(
            index="listings",
            query={
                "terms": {
                    "_id": listing_ids
                }
            },
            size=25)

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]

        return results['hits']['hits']

    async def get_items_adv(self, listings):
        try:
            listing_ids = [item['id'] for item in listings]
        except:
            listing_ids = [item['listing_id'] for item in listings]

        results = await self.es.search(
            index="listings",
            query={
                "terms": {
                    "_id": listing_ids
                }
            },
             size = 25)

        results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]

        return results['hits']['hits']
    
    # def get_items_adv(self, listings):
    #     #print("esrequest listings values:       ",listings)
    #     listing_ids = [item[0] for item in listings]
    #     #print("esrequest listings_ids:       ",listing_ids)

    #     results = self.es.search(
    #         index="listings",
    #         query={
    #             "terms": {
    #                 "_id": listing_ids
    #             }
    #         },
    #         size = 26)

    #     results['hits']['hits'] = [x['_source'] for x in results['hits']['hits']]
    #     #print("line 191:  ",results['hits']['hits'])

    #     return results['hits']['hits']

