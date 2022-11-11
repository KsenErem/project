const jwt = require('jsonwebtoken');

function AuthenticatedOnly(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).send({"error": "no token specified"});
  
    jwt.verify(token, process.env.AUTH_TOKEN, (err, user) => {
      console.log(err)
  
      if (err) return res.status(403).send({"error": "invalid token"});
  
      req.user = user
  
      next()
    })
  }

module.exports = {AuthenticatedOnly}