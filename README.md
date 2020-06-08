# IBM test
This project was made as part of the IBM selective process.

## Get started

To run this project you must:

### Installing

* Download this repository [here](https://github.com/Luborges/ibm-test-chatbot/archive/master.zip)

* Run ```npm install``` to install the packages at the `chatbot` and the `backend` folder.
* Run ```npm start``` to start the frontend at the `chatbot` folder.
* Run ```npm run dev``` to start the backend at the `backend` folder.

### Running migrations

* Run ```npm run knex:migrate``` at the backend folder to execute the migrations and create the database tables.

### Watson assistant

You must create an account at the IBM Cloud and create a Watson assistant service following this [tutorial](https://cloud.ibm.com/docs/assistant?topic=assistant-getting-started#getting-started-tutorial)

### Environment variables

You must create a .env file at the `backend` folder with the following variables:

* SESSION_KEY - Hash with a random value for the express session.
* ASSISTANT_ID - ID you will get from the Watson assistant details page.
* CHATBOT_API_KEY - API Key you will get from the Watson assistant service page.
* CHATBOT_URL - URL you will get from the Watson assistant service page.
* CHATBOT_VERSION - Version you will get from the API Documentation (Version used at this project: 2020-04-01)
* PORT - Port you wish your backend to run on (Port used at this project: 3333)

### Scripted used to test the chatbot:

- Chatbot: Hello. How can I help you?
- User: Hi
- Chatbot: Hi, how can I be useful?
- User: Show my tickets
- Chatbot: Searching for your tickets
- Chatbot: There are no tickets associated with your account
- User: I wish to open a ticket
- Chatbot: Please, give me a description of your problem.
- User: Unstable internet
- Chatbot: We are creating your ticket
- Chatbot: Your ticket has being created successfully
- User: Show my tickets
- Chatbot: Searching for your tickets
- Chatbot: 
    Description: Unstable internet
    Updated at: 07/06/2020
    Status: open

## Built With

* [ReactJS](https://reactjs.org/) - The JavaScript library used to create components.
* [NodeJS](https://nodejs.org/) - The JavaScript library used to create the backend.
* [Sqlite](https://www.sqlite.org/index.html/) - The relational database used to persist data in the application
* [NPM](https://www.npmjs.com/) - Package Management.
* [Watson](https://www.ibm.com/cloud/watson-assistant/) - Watson conversation AI platform.

## Authors

* **Lucas Borges** - [Luborges](https://github.com/Luborges)