const jwt = require('jsonwebtoken');
const Admin = require('../../models/admins.model');
const User = require('../../models/users.model');
const bcrypt = require('bcrypt');
const httpError = require('http-errors');
const saltRounds = 10;


class Auth {

    async RegisterUser(body){
        //TODO: проверить уникальность логина в БД
        const name = body.name;
        const login = body.login;
        const password = body.password;
        const gender = body.gender;

        if(!name || !login || !password || gender === ''){
            throw httpError(400, 'Specify the data');
        }

        let user = await User.findOne({where: {login: login}});
        if(user){
            throw httpError(400, "Such a user with this login already exists");
        }

        console.log(user);

        let hash = bcrypt.hashSync(password, saltRounds);

        let user_password = await User.findOne({where: {password: hash}});
        if(user_password){
            throw httpError(400, "Such a user with this password already exists");
        }

        let response = await User.create({name: name, login: login, password: hash, gender: gender});
        return {
            userID: response.id,
            gender: response.gender,
            name: response.name,
            login: response.login,
            token: SignToken({userID: response.id, gender: response.gender, name: response.name, login: response.login}),
        }
    }

    async Login(body){

        const login = body.login;
        const password = body.password;

        if(!login || !password){
            throw httpError(400, 'Provide both login and password');
        }

        let user = await User.findOne({where: {login: login}});

        console.log(user);

        if(!user){
            throw httpError(400, "No users with these credentials are found");
        }

        if(bcrypt.compareSync(password, user.password)){
            return {
                userID: user.id,
                gender: user.gender,
                name: user.name,
                login: user.login,
                token: SignToken({userID: user.id, gender: user.gender, name: user.name, login: user.login}),
            }
        }
    }

    async CheckToken(token, user){
        console.log(user)
        return {
            status: true,
            user: user,
        };
    }
}

module.exports = new Auth();

function SignToken(object, expiresIn){
    return jwt.sign(object, process.env.AUTH_TOKEN, {expiresIn: expiresIn || '1d'});

}

