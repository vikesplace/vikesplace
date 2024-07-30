# Welcome to Vikesplace Frontend!

## Dependencies
- Node.js
- Docker Desktop
- Git

## Run the App

### Integrated Application

1. Open Docker Desktop

2. Modify one file

- Copy lines with EMAIL, APP_PASSWORD, REFRESH_TOKEN_SECRET from vikesplace/backend/.env to vikesplace/.env

3. Run `docker-compose up` in vikesplace root folder

Note: 
- If it's your first time running the containers, or you are trying to include updates, try `docker-compose up --build`
- This may take awhile (5-20 minutes), please wait until all containers are running
- You may need to run postal_code_scripts container manually, it will shut off once complete
- Search takes an additional 5-10 minutes to load after the containers are running
- To shut off all containers once done testing, run `docker-compose down -v`

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser



### Integrated Application + Seperate Frontend

1. Open Docker Desktop

2. Modify two files

- Comment out the bottom four lines (see below) of docker-compose.yml in vikesplace root folder

```  
# Referencing frontend
frontend:
   extends:
   file: frontend/docker-compose.yml
   service: frontend
```

- Copy lines with EMAIL, APP_PASSWORD, REFRESH_TOKEN_SECRET from vikesplace/backend/.env to vikesplace/.env

3. Run `docker-compose up` in vikesplace root folder

Note: 
- If it's your first time running the containers, or you are trying to include updates, try `docker-compose up --build`
- This may take awhile (5-20 minutes), please wait until all containers are running
- You may need to run postal_code_scripts container manually, it will shut off once complete
- Search takes an additional 5-10 minutes to load after the containers are running
- To shut off all containers once done testing, run `docker-compose down -v`

4. Run `npm install` (the first time, and after updates to package.json) to ensure all dependencies are available.

5. Run `npm start` in vikesplace/frontend folder

6. Open [http://localhost:3000](http://localhost:3000) to view it in your browser


## Tests

### All Tests

1. Navigate to vikesplace/frontend folder

2. Run `npm install` (the first time, and after updates to package.json) to ensure all dependencies are available.

3. Run `npm test`


### Individual Tests

1. Navigate to vikesplace/frontend folder

2. Run `npm install` (the first time, and after updates to package.json) to ensure all dependencies are available.

3. Run `npm test -- <filename>`, where `<filename>` is replaced with a file name like `ViewListings.test.js`

### Test Coverage
1. Navigate to vikesplace/frontend folder

2. Run `npm install` (the first time, and after updates to package.json) to ensure all dependencies are available.

3. Run `npm run coverage`

4. Open frontend/coverage/index.html using your browser

Note: 
- This will open a dashboard with the coverage of all folders within frontend/src
- Click folder name to view coverage of the individual files within the folder