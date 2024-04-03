## **Utibu Health API**
Utibu Health API is a Node.js/Express application serving as the backend for the Utibu Health Android app. It provides endpoints for user authentication, medication order management, and health statement retrieval.

**Features**

User authentication with JSON Web Tokens (JWT)

CRUD operations for medication orders

Endpoint to retrieve health statements

**Technologies Used**

Node.js

Express.js

Microsoft SQL DB for data storage

JSON Web Tokens (JWT) for authentication


**Installation**

To run the API locally, follow these steps:

Clone the repository to your local machine.

Install dependencies using npm install.

Set up a Microsoft SQL database and update the connection string in config.js.

Start the server using npm start.

**Endpoints**

*/api/auth/login*: POST request to authenticate users and generate JWT token

*/api/orders*: GET, POST, PUT, DELETE requests to manage medication orders

*/api/statements*: GET request to retrieve health statements

**Contributing**

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

**License**

This project is licensed under the MIT License.
