# 🌟 Full-Stack Engineer Assessment (FSEA)

Follow the steps below to set up and run the project.

---

## 🚀 Step 1: Run the Backend (fsea-app)

You have two options to run the backend:

### 🔹 Option 1: Run with Docker (Recommended)

1. Create a `.env.dev` file based on `.env.sample` file in root directory
2. Start the services by running:
   ```sh
   docker-compose up
   ```
3. The server should be up and running at **http://localhost:8000**

### 🔹 Option 2: Run Locally (Manual Setup)

1. Create a `.env.local` file based on `.env.sample` file in `fsea-django-app`
2. Open a terminal in the project's root folder (Windows users may need administrator privileges).
3. Navigate to the `fsea-django-app` directory:
   ```sh
   cd fsea-app/fsea-django-app
   ```
4. Create a virtual environment and install dependencies:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```
5. Set up the database:
   ```sh
   python manage.py migrate
   ```
6. Start the Django server:
   ```sh
   python manage.py runserver
   ```
7. The server should now be running at **http://localhost:8000**

_You can populate data using:_

```sh
   python manage.py fetch_data <max_pages> # Where max_pages is the number of pages you want to fetch
```

---

## 🌐 Step 2: Run the Frontend (fsea-app-web)

1. Ensure the **backend (fsea-app)** is running.
2. Create a `.env.local` file based on `.env.sample` file in `fsea-app-web`

3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the frontend development server:
   ```sh
   npm run dev
   ```
5. The application should now be running at **http://localhost:5173** 🚀

---
