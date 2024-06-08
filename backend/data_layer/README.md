# Setup PostgreSQL Database

## Go to vikesplace\backend\database directory before performing following actions

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

DB_HOST=""

DB_USER=""

DB_PASSWORD=""

DB_DATABASE=""

DB_PORT=""

## To execute SQL commands 

```bash
psql -U user -d database -f "name of the .sql file with .sql extension"
```


