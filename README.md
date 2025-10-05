Dynamic Onboarding Form System
Overview

This project is a Full Stack Dynamic Onboarding Platform built for a financial services firm.
It allows administrators to create customizable onboarding forms (e.g., KYC, loan, or investment forms) and for clients to submit responses dynamically, including file uploads.
The backend is powered by Django REST Framework (DRF), and the frontend is developed in Next.js (React).

Features
Admin Side

Create and manage onboarding forms dynamically.

Configure form fields of multiple types:

text, number, date, dropdown, checkbox, and file.

JSON-based configuration allows infinite scalability.

Client Side

View available forms and submit responses.

Support for file uploads.

Clean, responsive UI built with Next.js and Tailwind CSS.

Notifications

Uses Celery for asynchronous task processing.

Sends simulated admin notifications upon form submissions (can easily be extended to send emails or Slack messages).

Project Structure
Full-Stack-Onboarding-app/
│
├── backend/               # Django REST Framework API
│   ├── forms/             # App for managing dynamic forms
│   ├── onb/               # Core Django project
│   └── manage.py
│
├── frontend/              # Next.js frontend (React + TypeScript + TailwindCSS)
│   ├── src/
│   ├── package.json
│   └── .env.local
│
└── README.md

Tech Stack
Layer	Technology
Backend	Django REST Framework
Frontend	Next.js (React + TypeScript + Tailwind CSS)
Database	SQLite (can switch to PostgreSQL)
Task Queue	Celery + Redis
Notifications	Console / Async print (extensible)
Setup Instructions
1. Clone the repository
git clone https://github.com/mimie254/Full-Stack-Onboarding-app.git
cd Full-Stack-Onboarding-app

2. Backend Setup (Django)
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Runs on:
http://127.0.0.1:8000/

API endpoints:

GET /api/forms/ — list all forms

POST /api/forms/ — create new form

POST /api/submissions/ — submit form data

Example request to create a form:

{
  "title": "Customer Feedback Form",
  "description": "Form for collecting customer opinions",
  "fields": [
    {"label": "Name", "field_type": "text", "required": true},
    {"label": "Rating", "field_type": "number", "required": true},
    {"label": "Comments", "field_type": "text", "required": false}
  ]
}

3. Frontend Setup (Next.js)
cd ../frontend
npm install
npm run dev


Runs on:
http://localhost:3000/

Create an environment file named .env.local inside frontend/:

NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api

4. Test the Application

Open the DRF UI at http://127.0.0.1:8000/api/forms/

Create a form using the example JSON above.

Visit http://localhost:3000/forms/1
 (replace 1 with the created form ID).

Fill and submit the form — you’ll see “Form submitted successfully!”

Design Decisions
1. Dynamic Field Configuration

I chose a JSON-based API-first configuration instead of hardcoding fields.
This makes it simple to create forms with unlimited fields of different types — future-proof and flexible.

2. Data Model

DynamicForm: Stores form name, description.

FormField: Defines field label, type, and requirement.

Submission: Stores user submissions as JSON data, preserving old submissions even if fields evolve.

3. Notification System

Used Celery for asynchronous task handling.
Currently, the notification simulates sending an email to admins by logging to the console — this can later integrate with email, Slack, or SMS APIs.

http://127.0.0.1:8000/admin/forms/submission/

4. Scalability

Dynamic JSON fields allow flexible schema.

Async tasks prevent blocking the main request loop.

Frontend consumes APIs, enabling mobile or third-party integration later.

Future Improvements

Add authentication for admin access.

Enable multiple file uploads.

Add conditional validation (e.g., “income proof if amount > X”).

Store notifications and submissions in the database for admin viewing.


Author

Mercy Wambui Ndung’u
Full Stack Developer
Email: mercyndungu0114@gmail.com
GitHub: https://github.com/mimie254
