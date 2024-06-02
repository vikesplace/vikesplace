from elasticsearch import Elasticsearch

# get your ca.crt from the Docker container
# opt1: run the cmd below
#    docker cp vikesplace-elasticsearch-1:/usr/share/elasticsearch/config/certs/ca/ca.crt ./tmp/.
# opt2: use the GUI
#    go to the elasticsearch-1 container
#    then in the files tab, find /usr/share/elasticsearch/config/certs/ca/ca.crt
#    save the file somewhere

# go to localhost:5601 to generate your API key

es = Elasticsearch("https://localhost:9200/",
                   ca_certs="path/to/ca.crt",
                   #    basic_auth=("elastic", "a123456"))
                   api_key="get api key from Kibana or uncomment line above")

print(es.info())
