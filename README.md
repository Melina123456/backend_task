# E-commerce Application

This E-commerce Application is a Node.js and TypeScript application that fetches product details from an external API and stores them in a PostgreSQL database using Prisma ORM. 
The application also provides an AdminJS interface for managing products, category, dimension, meta , review, tag and image.

## Features
- Fetch product data from an external API
- Normalize and store data in a PostgreSQL database
- Use AdminJS for product and category management with CRUD operations
- Implemented in Node.js and TypeScript

## Technologies
- Node.js
- TypeScript
- Prisma
- PostgreSQL
- AdminJS
- Axios (for API calls)
- Postman 

## Installation

### Prerequisites
- Node.js
- PostgreSQL

### Steps
1. Clone the repository:
   git clone [https://github.com/yourusername/ecommerce-app.git](https://github.com/Melina123456/backend_task.git)

2.Install dependencies:
   npm install

3. Set up environment variables:
   DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/mydatabase"

4. Initialize Prisma:
   npx prisma init

5. Define your Prisma schema in prisma/schema.prisma. (The schema is already provided in the repository).
   
6. Run the Prisma migration to create the database tables:
   npx prisma migrate dev --name init

7. Generate the Prisma client:
   npx prisma generate

8. created fetch_store.ts under src/fetch_store.ts to store data to postgres.
   
9. Compile TypeScript files:
   tsc

10. Populate the PostgreSQL database by running the compiled script:
   npx ts-node ./dist/fetch_store.js

11.Configure AdminJS:
   Create a file named app.ts in the src directory to set up AdminJS.

12. Compile TypeScript files again:
    tsc

13. start the application with following command
    npm start 

API Documentation
https://documenter.getpostman.com/view/32152233/2sA3dsoEaT
or simply you get documentation from 
https://dummyjson.com/products
