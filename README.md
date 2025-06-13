# Calcify

**Calcify** is a clean, modern calculator application featuring a React frontend and FastAPI backend. Designed for simplicity and extensibility, Calcify provides basic arithmetic operations (addition, subtraction, multiplication, division) with a responsive UI and a REST API for calculations.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Setup Instructions](#setup-instructions)
  - [Frontend (React)](#frontend-react)
  - [Backend (FastAPI)](#backend-fastapi)
- [Usage Walkthrough](#usage-walkthrough)
- [Color Theme & Customization](#color-theme--customization)
- [Deployment Notes](#deployment-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Calcify is a lightweight calculator app split into two main components:
- **Frontend:** A React-based single-page application offering a sleek, user-friendly calculator UI.
- **Backend:** A FastAPI service exposing a RESTful API for processing arithmetic operations.

The frontend communicates with the backend API to compute results for user-entered expressions, making it extensible and demonstrating a typical full-stack application integration.

---

## Features

- **Basic arithmetic:** Addition, subtraction, multiplication, and division supported.
- **Modern UI:** Responsive layout, vibrant theme, and accessible keyboard interactions.
- **REST API backend:** All operations performed via FastAPI for easy extensibility and separation of concerns.
- **Clear error handling:** UI messages for invalid input, division by zero, and API errors.
- **Customizable theme:** Easily adjust colors and style via CSS variables.

---

## Technology Stack

- **Frontend:** [React](https://reactjs.org/) (JavaScript)
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Communication:** REST API with JSON payloads

---

## Architecture Overview

```
calcify-48991-90992994/
│
├── calculatorfrontend/   # React app (source in src/)
├── calculatorbackend/    # FastAPI backend (API in src/api/main.py)
└── README.md             # ← (This file)
```

- The frontend and backend run as separate services; the frontend requests calculations via HTTP (POST).

---

## Setup Instructions

**Prerequisites:**
- Node.js (>=16 recommended) and npm (for frontend)
- Python 3.9+ & `venv` (for backend)

---

### Frontend (React)

1. **Navigate to the frontend folder:**

   ```bash
   cd calculatorfrontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm start
   ```
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

*Note: The default app expects the backend API to be running at `http://localhost:8000`.*

---

### Backend (FastAPI)

1. **Navigate to the backend folder:**

   ```bash
   cd calculatorbackend
   ```

2. **Create & activate a virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install the backend requirements:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server (with hot reload):**

   ```bash
   uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   - The API will be accessible at [http://localhost:8000](http://localhost:8000)
   - A health check endpoint is at `/`

---

## Usage Walkthrough

### Web App

- Enter an expression (e.g., `12 / 4` or `5 + 7`) by clicking the buttons.
- Press `=` to evaluate; the result is fetched from the backend and displayed.
- Use `C` to clear input.

### Example REST API Call

**POST** `/calculate`  
**Body:**
```json
{
  "operand1": 6,
  "operand2": 3,
  "operator": "*"
}
```

**Response:**
```json
{
  "result": 18
}
```
Handles `+`, `-`, `*`, `/`. Division by zero or invalid operator will yield an error object.

---

## Color Theme & Customization

Customize Calcify’s look by editing CSS variables in:

- **Frontend:** [`calculatorfrontend/src/App.css`](calculatorfrontend/src/App.css)

  ```css
  :root {
    --primary-color: #4CAF50;
    --secondary-color: #FFC107;
    --accent-color: #009688;
    /* ... */
  }
  ```

- **Main colors:**
  - Primary: `#4CAF50` (green)
  - Secondary: `#FFC107` (amber)
  - Accent: `#009688` (teal)

- To change the color scheme, simply update these variables.

---

## Deployment Notes

- **Frontend:** Build for production with `npm run build` inside `calculatorfrontend`. Deploy the build folder with your static web host.
- **Backend:** Serve with a production WSGI server (e.g., gunicorn + uvicorn worker) for deployment.
- **CORS:** The backend allows all origins by default for demo purposes. For production, restrict `origins` appropriately in `main.py`.
- **Ports:** Make sure frontend points to the correct backend API URL (adjust fetch URL if deploying on different domains/ports).

---

## Contributing

Contributions are welcome! Please:

- Submit pull requests with descriptive messages
- Use conventional code style (see `.eslintrc` and Python formatting)
- For major changes, open an issue first to discuss your proposal.

---

## License

This project is open source. See the LICENSE file for details.  
(c) 2024 Calcify Authors.
