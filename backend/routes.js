const express = require('express');
const middleware = require('./middlewares');

const UserController = require('./controllers/UserController');
const ChatbotController = require('./controllers/ChatbotController');
const TicketController = require('./controllers/TicketController');

const routes = express.Router();

const userController = new UserController();
const chatController = new ChatbotController();
const ticketController = new TicketController();

routes.post('/user', userController.create);
routes.post('/login', userController.login);

routes.post('/message', middleware, chatController.send);

routes.post('/ticket', middleware, ticketController.create);
routes.get('/ticket', middleware, ticketController.index);

routes.get('/logout', (req, res) => {
    req.session.destroy();
    return res.status(200);
});

module.exports = routes;