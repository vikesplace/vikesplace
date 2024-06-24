# vikesplace
Main repository for vikesplace project

## Getting Started
- Download and install [Docker](https://www.docker.com/products/docker-desktop/)

- In the root folder of this repository, run
```
docker-compose up -d --build
```
> Disclaimer: Search and Recommender APIs will only start once ElasticSearch is populated with data (this process might take a while, e.g. 5 minutes). 

- To stop, run
```
docker-compose down -v
```

## Local Development Requirements
> See each subfolder to see all instructions and requirements
- Docker
- docker-compose
- Python 3.11+
- NodeJS v18+
- npm 10.7.0+
