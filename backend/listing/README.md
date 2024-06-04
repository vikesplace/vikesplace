# Listing Service

## Go to vikesplace\backend\listing directory before performing following actions

### Install packages

```bash
npm install
```

## Create .env file for Windows

```bash
echo > .env
```

## Create .env file for Mac and Linux

```bash
touch .env
```

## Include following variables inside .env file (contact me when you require following data)

PORT=""

DB_HOST=""

DB_USER=""

DB_PASSWORD=""

DB_DATABASE=""

DB_PORT=""

## Listing Service Flow Explanation

```
1. route.js: maps to the appropriate controller function
2. controller.js: error handling and activates service.js to create a listing record
3. service.js: asks model.js to create a listing with the specified model
4. model.js: create a listing record by connecting with the database.js
5. database.js: obtains necessary credentials from config.js to activate connection with the database 
6. config.js: contains necessary credentials to connect with the database
```