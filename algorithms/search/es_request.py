from elasticsearch import Elasticsearch

# default location
#   downtown victoria; lat = 48.407326, lon = -123.329773


def search(title, location, category=None, status=None):
    es = Elasticsearch(
        "https://localhost:9200/",
        ca_certs="./ca.crt",
        basic_auth=("elastic", "a123456")
    )

    must_clauses = [
        {
            "query_string": {
                "default_field": "title",
                "query": f"*{title}*"
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

    query = {
        "bool": {
            "must": must_clauses,
            "filter": filter
        }
    }
    
    results = es.search(index="listings", query=query,
                        allow_partial_search_results=True)

    # print(results['hits']['hits'])  # for debugging
    print("====================>>>  number of results item:  ",
          len(results['hits']['hits']))
    print(results['hits']['hits'])
    return results['hits']['hits']  # Return only the hits

# Example usage
# search2("example_title", category="example_category", status="example_status")


'''
from elasticsearch import Elasticsearch

def search(title, category=None, status=None):
    es = Elasticsearch(
        "https://localhost:9200/",
        ca_certs=r"./search/ca.crt",
        basic_auth=("elastic", "a123456")
    )
    must_clauses = [
        {"wildcard": {"title": f"*{title}*"}}
    ]
    
    if category:
        must_clauses.append({"match": {"category": {"query": category}}})
        
    if status:
        must_clauses.append({"match": {"status": {"query": status}}})

    query = {
        "bool": {
            "must": must_clauses
        }
    }

    results = es.search(index="listings", query=query, allow_partial_search_results=True)
    
    #print(results['hits']['hits'])  # for debugging
    return results['hits']['hits']  # Return only the hits


'''
