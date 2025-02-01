🛃 Import Permit Application System

📌 Project Overview

The Import Permit Application System is a web-based application that facilitates the process of applying for an import permit. It allows users to submit required details such as personal information, business details, and product specifications while ensuring form validation and email notifications.

🚀 Features

📄 Form Validation using Yup & React Hook Form

📧 Automated Email Notifications upon form submission

📜 Conditional Field Requirements (e.g., ID for Rwandans, Passport for Foreigners)

📆 Date Selection Restriction (No future dates allowed)

🔄 Loading Spinner for better user experience

🛠️ Tech Stack

Frontend: React & TypeScript

Backend: Spring Boot (Java), Lombok

Validation: Yup, React Hook Form

Email Service: SMTP with Java Mail

Version Control: Git, GitHub

🏗️ Getting Started

1️⃣ Clone the Repository

 git clone https://github.com/Ishimwe7/irembo-challenge-fn.git

2️⃣ Backend Setup

Prerequisites

Java 17+

Spring Boot

PostgreSQL

Maven

Steps

1️⃣ Clone Backend Repository

 git clone https://github.com/Ishimwe7/irembo-challenge.git

Update database configurations in application.properties Where Necessary.

Build & run the application:

mvn clean install
mvn spring-boot:run

Backend will be running at: http://localhost:8080

3️⃣ Frontend Setup

Prerequisites

Node.js 18+

npm or yarn

Steps

Install dependencies:

npm install

Start the development server:

npm run dev

Frontend will be running at: http://localhost:5173
