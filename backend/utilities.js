const jwt= require('jsonwebtoken')

function authenticationToken(req, res, next) {
    const authHeader = req.headers["Authorization"]
    const token = authHeader && authHeader.split(" ")[1]
}