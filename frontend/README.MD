# Welcome to Vikesplace Frontend!

## Dependencies
- Node.js
- Docker Desktop
- Git

## Run the App

### Just Frontend

1. Navigate to vikesplace/frontend folder (the project directory)

2. Run `npm install` (the first time, and after updates to package.json) to ensure all dependencies are available.

3. Use `npm start` to run application in development mode.

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser (it should open automatically).


### Frontend with Docker

1. Navigate to vikesplace/frontend folder (the project directory)

2. Ensure Docker Desktop is open

3. Run `docker-compose up --build` in project directory

Note: this will take about 5 minutes to run, as `npm install` needs to run every time. Once complete, frontend application is running on a docker container. 

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. Close docker once done testing application, run `docker-compose down -v` to ensure ports are available for other projects.


### Frontend Tests

1. Navigate to vikesplace/frontend folder (the project directory)

2. Run `npm install` (the first time, and after updates to package.json) to ensure all dependencies are available.

3. Run `npm test`

Note: run individual test suites with `npm test <filename>`, where `<filename>` is replaced with a file name like `ViewListings.test.js`

Most tests are failing because they were written before api integration with mocked data, this is expected and we will be mocking api calls for more consistent testing in the future.


### Frontend + Backend Integration

1. Make the following file changes:
   1. In the /backend folder, update .env to include EMAIL, APP_PASSWORD, REFRESH_TOKEN_SECRET
   
   Note: to reduce security concerns these are shared on our Discord, not on GitHub.

   2. In backend/nginx/nginx.conf comment three lines, from `location /search {}`

   Note: this is due to conflicts with naming in the recommender

2. Open Docker Desktop

3. In the vikesplace/backend directory, run `docker-compose up --build`

Note: wait until all backend containers are running, about 1-2 minutes.
- Ensure postal_code_script has run completely after datalayer was up and running (usually choose to run it again just to make sure, it will auto shutoff once done)
- Ensure data_layer and nginx are both running as all api calls rely on them
- To shut off all containers once done testing, run `docker-compose down -v`

4. In the vikesplace/frontend directory complete the "Just Frontend" steps


### Integrated Application (All in Docker)

1. Open Docker Desktop

2. Run `docker-compose up --build` in vikesplace

Note: this takes anywhere from 5-20 minutes. Not recommended if you are developing.

3. In docker, ensure that postal_code_scripts has completely run (if unsure, try running again, will shutoff automatically once complete)

4. Should be able to access all areas of application.
