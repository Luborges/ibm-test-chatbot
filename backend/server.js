const express = require('express');
const session = require('express-session');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(session({secret: process.env.SESSION_KEY}));
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT);
console.log(`port: ${process.env.PORT}`);