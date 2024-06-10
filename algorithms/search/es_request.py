from elasticsearch import Elasticsearch

def search(title, category=None, status=None):
    es = Elasticsearch(
        "https://localhost:9200/",
        ca_certs=r"./search/ca.crt",
        basic_auth=("elastic", "a123456")
    )
    must_clauses = [
        {"match_phrase_prefix": {"title": {"query": title}}}
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
