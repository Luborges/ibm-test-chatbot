const knex = require('../database/connection');
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const bcrypt = require("password-hash");

class UserController {
    async login (req, res) {
        const { email, password } = req.body;

        const user = await knex('users')
            .where('email', String(email))
            .select('users.*').first();

            
        if (user) {
            if (!(bcrypt.verify(password, user.password))){
                return res.status(400).send({ error: "Password is not valid!" });
            }

            user.password = undefined;

            return res.status(200).send({
                user,
                token: generateToken({ user }),
            });
        }
        else {
            return res.status(400).send('User invalid!');
        }
    }

    async create (req, res) {
        const { email, password } = req.body;

        const user = {
            email,
            password: bcrypt.generate(password),
        }
    
        const insertedId = await knex('users').insert(user);
    
        const user_id = insertedId[0];
        
        user.password = undefined;
        user.id = user_id;

        return res.status(200).send({
            user,
            token: generateToken({ user }),
        });
    }
}

const generateToken = (params) => {
    return jwt.sign(params, authConfig.secret, {
      // expiresIn: 8600,
    });
}

module.exports = UserController;