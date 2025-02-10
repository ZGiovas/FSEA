# FSEA

Full-Stack Engineer Assessment

## Step 1:

### Option 1: Run dockerized DB and Django App

- Create a .env.dev based on all .env.sample files (root, fsea-app/fsea-django-app, fsea-app-web)
- Run `docker-compose up`

### Option 2: Run fsea-app locally

- Open Terminal in root folder of project (in Windows you might need administrator privileges)
- Navigate to folder fsea-django-app
- Create a virtualenv and install requirements using `pip install -r requirements.txt`
- To create DB, type `manage.py migrate`
- To run server, type `manage.py runserver`
- Server should be up and running at port 8000 of localhost

## Step 2: Run fsea-app-web

- Be sure that _fsea-app_ is running
- Open terminal in root folder of project
- Navigate to folder fsea-app-web
- Install packages via `npm install`
- To run development, type `npm run dev`
- Application should be running at 5173 of localhost
