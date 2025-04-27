# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## How to run the frontend application on your local machine

 - # Prerequisites
      - Ensure Node.js installed on your local machine
  
   # Project Set Up
      - Open a terminal and clone this repository - https://github.com/roshidhmohammed/lemonpay-frontend

    - After cloning the repository, you need to install the required dependencies. Run the following command to install them:
        - npm install

    - Create a .env file in the root of the project folder (next to package.json), and add the following environment variables:
        - VITE_ENV_BACKEND_URL='http://localhost:8000' # URL for the local backend server

     - After setting up the project, you can now run the frontend application locally. To start the development server, use the  following command on the terminal:
         -  npm run dev 

     - Once the development server is running, open your web browser and navigate to:
         - eg: http://localhost:3000 # hit the url showing on the terminal on the browser

