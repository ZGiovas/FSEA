# 🌟 Full-Stack Engineer Assessment (FSEA)

Follow the steps below to set up and run the project.

---

## 🚀 Step 1: Run the Backend (fsea-app)

You have two options to run the backend:

### 🔹 Option 1: Run with Docker (Recommended)

1. Create a `.env.dev` file based on all `.env.sample` files in:
   - Root directory
   - `fsea-app/fsea-django-app`
   - `fsea-app-web`
2. Start the services by running:
   ```sh
   docker-compose up
   ```
3. The server should be up and running at **http://localhost:8000**

### 🔹 Option 2: Run Locally (Manual Setup)

1. Open a terminal in the project's root folder (Windows users may need administrator privileges).
2. Navigate to the `fsea-django-app` directory:
   ```sh
   cd fsea-app/fsea-django-app
   ```
3. Create a virtual environment and install dependencies:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```
4. Set up the database:
   ```sh
   python manage.py migrate
   ```
5. Start the Django server:
   ```sh
   python manage.py runserver
   ```
6. The server should now be running at **http://localhost:8000**

---

## 🌐 Step 2: Run the Frontend (fsea-app-web)

1. Ensure the **backend (fsea-app)** is running.
2. Open a terminal in the root folder of the project.
3. Navigate to the `fsea-app-web` directory:
   ```sh
   cd fsea-app-web
   ```
4. Install dependencies:
   ```sh
   npm install
   ```
5. Start the frontend development server:
   ```sh
   npm run dev
   ```
6. The application should now be running at **http://localhost:5173** 🚀

---
