# Zeraki Sales Agent Dashboard

## Project Overview
The Zeraki Sales Agent Dashboard is designed to facilitate the management of school accounts, invoicing, and collections, providing data visualization for targets and sign-ups. This internal system streamlines operations for sales agents, enabling efficient management of relationships with schools and enhancing operational efficiency.

## Features Implemented

### 1. Side Navigation
- **Dashboard Module**: Displays dynamic counters for Collections, Sign-ups, Total Revenue, and Bounced Cheques.
- **Schools Module**: Includes a list of schools with options to view detailed information (Invoices and Collections).

### 2. Dashboard Overview
#### A. Top Card Metrics
1. **Collections**: Display the total number of collections made, updating dynamically.
2. **Sign-ups**: Show the total number of new school sign-ups, with a breakdown by product (Zeraki Analytics, Zeraki Finance, Zeraki Timetable).
3. **Total Revenue**: Present overall revenue collected, with revenue per product.
4. **Bounced Cheques**: Indicate the number of cheques that have bounced.

#### B. Targets Visualization
1. **Pie Charts**: Visualize progress towards signup targets for Zeraki products.
2. **Interactive Elements**: Tooltips on hover to display exact numbers or percentages.

#### C. Signups Overview
1. **Bar Graphs**: Represent the distribution of sign-ups across different types of schools (Primary, Secondary, IGCSE) for each product.
2. **Interactive Elements**: Click on a bar to get more detailed statistics.

#### D. Upcoming Invoices
1. **Invoice List**: Display upcoming invoices ordered by due date.
2. **Details and Actions**: Show school name, amount due, due date, and actions for payment collection.
3. **Payment Collection Feature**: Modal or side-panel forms for entering collection details.

### 3. School Management
#### A. Schools
1. **List of Schools**: Display all schools with detailed information on selection.
2. **School Details**: Display name, type, product, county, registration date, contact information, and balance.

#### B. Invoices
1. **List All Invoices**: Display invoices associated with a school, with filters for completed and pending.
2. **CRUD Operations for Invoices**: Create, read, update, and delete invoices, with unique invoice number generation.
3. **Collections Addition**: Add collections to an invoice, marking partial or full payments.

#### C. Collections
1. **List Collections**: Show all collections for each school, including status and amount.
2. **Mark Collection Status**: Update collection status directly from the list.

## Prerequisites
- Node.js
- npm (Node Package Manager)
- JSON Server or another mock server to handle API requests

## Setup Instructions
1. Clone the repository
   git clone git@github.com:smsharon/sales-agent-dashboard.git
   cd zeraki-sales-agent-dashboard
2. Install dependancies
   npm install
3. Run the mock server   
   npx json-server --watch db.json --port 5000
4. Start the application
   npm start
5. Open the application
   Navigate to http://localhost:3000 in your web browser.

## Usage
1. Dashboard Overview
   The dashboard displays key metrics, targets visualization, signups overview, and upcoming invoices.  
2. Viewing Schools
   You'll see a list of all schools. Click on a school name to view detailed information about that school. 
3. Managing Invoices
   On the school details page, you can see a list of invoices associated with the school.
   You can add a new invoice by clicking the "Add Invoice" button, filling out the form, and saving it.You can edit or delete existing invoices using the respective buttons in the actions column.
4. Managing Collections
   Collections are managed as part of each invoice. You can add collections to an invoice and update the status of collections.

## Additional features
   1. Enhanced filtering for invoices based on their status (completed or pending).
   2. Automatic generation of unique invoice numbers.
   3. Option to add collections to invoices and mark partial or full payments.
   4. Update invoice statuses based on collection results.
   5. Interactive graphs and charts for better data visualization.
   6. search functionality 

## API endpoints
   1. GET /schools: Fetch all schools.
   2. GET /schools/: Fetch details of a specific school by ID.
   3. GET /invoices?schoolId=: Fetch invoices for a specific school by school ID.
   4. POST /invoices: Create a new invoice.
   5. PUT /invoices/: Update an existing invoice by ID.
   6. DELETE /invoices/: Delete an invoice by ID.
   7. GET /collections?invoiceId=: Fetch collections for a specific invoice by invoice ID.
   8. POST /collections: Create a new collection.
   9. PUT /collections/: Update an existing collection by ID.
   10. DELETE /collections/: Delete a collection by ID.
  
