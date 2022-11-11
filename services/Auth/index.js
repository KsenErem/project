const jwt = require('jsonwebtoken');
const Admin = require('../../models/admins.model');
const bcrypt = require('bcrypt');
const httpError = require('http-errors');
const saltRounds = 10;


class Auth {

    async RegisterUser(body){
        //TODO: проверить уникальность логина в БД
        const login = body.login;
        const password = body.password;

        let hash = bcrypt.hashSync(password, saltRounds);
        let response = await Admin.create({login: login, password: hash});
        return {
            userID: response.id,
            token: SignToken({userID: response.id})
        }
        
    }

    async Login(body){

        const login = body.login;
        const password = body.password;

        if(!login || !password){
            throw httpError(400, 'Provide both login and password');
        }


        let admin = await Admin.findOne({where: {login: login}});

        console.log(admin);

        if(!admin){
            throw httpError(400, "No users with these credentials are found");
        }

        if(bcrypt.compareSync(password, admin.password)){
            return {
                userID: admin.id,
                token: SignToken({userID: admin.id})
            }
        }
    }

    async CheckToken(token){
        return true;
    }
}

module.exports = new Auth();

function SignToken(object, expiresIn){
    return jwt.sign(object, process.env.AUTH_TOKEN, {expiresIn: expiresIn || '1d'});

}

