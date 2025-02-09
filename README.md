# FSEA

Full-Stack Engineer Assessment

## Step 1: Run fsea-app

- Open Terminal in root folder of project (in Windows you might need administrator privileges)
- Navigate to folder fsea-app
- To activate venv named "fsae-env" run command: `fsea-env\Scripts\activate`
- Navigate to folder fsea-django-app
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
