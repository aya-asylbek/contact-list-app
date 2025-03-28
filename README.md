# 📒 Contact List App

A full-stack PERN (PostgreSQL, Express, React, Node.js) application for managing contacts with detailed information.

![PERN Stack](https://img.shields.io/badge/stack-PERN-00d8ff.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg)



## ✨ Features

- 📝 Create contacts with personal and professional details
- 👁️ View contact details with extended information
- ✏️ Edit existing contacts
- 🗑️ Delete contacts
- 🔍 Input validation and error handling
- 📁 Database backup/restore via pg_dump file

## 🛠️ Technologies Used

| Category        | Technologies                                                                 |
|-----------------|------------------------------------------------------------------------------|
| **Frontend**    | React, React Router, HTML5, CSS3, React Testing Library                      |
| **Backend**     | Node.js, Express, PostgreSQL, pg, CORS                                       |
| **Development** | Vite, Nodemon, Jest, Supertest, Dotenv                                       |
| **Database**    | PostgreSQL (with pg_dump backup)                                            |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v15+)
- npm (v9+)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aya-asylbek/contact-list-app

cd contact-list-app


Install dependencies


cd server && npm install
cd ../client && npm install

Database Setup

# Create database
createdb contact_list

# Import pg_dump file
psql -U postgres contact_list < contact_list.dump

Configure Environment Variables

Create .env file in backend directory:

env
Copy
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=contact_list
PG_USER=your username
PG_PASSWORD=your_password

Start the Application


# Start server (from backend directory)
npm start

# Start client (from frontend directory)

npm run dev

📂 Database Schema
sql

-- contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20) NOT NULL,
  notes TEXT
);

-- contact_details table
CREATE TABLE contact_details (
  contact_id INT PRIMARY KEY REFERENCES contacts(id) ON DELETE CASCADE,
  street VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  profession VARCHAR(100),
  company VARCHAR(100),
  met_note TEXT
);

🧪 Testing

# tests
cd server && npm test

🌐 API Endpoints
Method	Endpoint	Description
GET	/contacts	Get all contacts
POST /contacts	Create new contact
GET	/contacts/:id	Get single contact
PUT	/contacts/:id	Update contact
DELETE /contacts/:id	Delete contact

📦 Database Backup
The included contact_list.dump file contains:

Database schema structure

Sample data (3 initial contacts)

Related contact details

To create a new dump:


pg_dump -U postgres -Fc contact_list > contact_list.dump

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

