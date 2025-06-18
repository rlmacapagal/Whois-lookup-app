# Whois Lookup Application

This is a full-stack application for performing Whois lookups. It consists of a React frontend and an Express/ Node.js backend.

## Features

- Perform Whois lookups for domain information.
- Display domain registration details, expiration dates, and contact information.
- Cache results to improve performance and lessen network calls

## Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm (v8 or later)

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd whois-app
   ```

2. Install dependencies for both the frontend and backend:

Configure the backend:

Create a .env file in the backend directory.

Add the following environment variables:
PORT=5000
WHOIS_API_KEY=<your-whois-api-key>

3. Running the Application

Enter "npm run dev" in the terminal to start both applications concurrently
Open your browser and navigate to http://localhost:5173.

