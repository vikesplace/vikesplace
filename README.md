# vikesplace
Main repository for **vikesplace** project

## Getting Started
1. Download and install [Docker](https://www.docker.com/products/docker-desktop/)

2. Clone the repo
```
git clone https://github.com/vikesplace/vikesplace.git
```

3. In the root folder of cloned repo (`./vikeplace`), run
```
docker-compose up -d --build
```
> Disclaimer: Search and Recommender APIs will be available once ElasticSearch is populated with data (this process might take a while, e.g. 5 minutes).

4. Access our application by going to `http://localhost:3000`

5. To stop the application, run
```
docker-compose down -v
```

## Contributing
> See each subfolder to see all instructions and requirements
- Docker
- docker-compose
- Python 3.11+
- NodeJS v18+
- npm 10.7.0+
