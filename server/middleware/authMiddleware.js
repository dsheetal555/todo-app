const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const secretkey = "da30e0c0eafbadba9389c0883c6537acc7ba17e188a53f49e8dcf6bb914c1fcb"
    // let data = {
    //     userId: 12,
    //     application: 'todoApp'
    // }

    // const token = jwt.sign(data, secretkey);
    // console.log(token);
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJhcHBsaWNhdGlvbiI6InRvZG9BcHAiLCJpYXQiOjE3Mzc1MjkwNjZ9.aJ8majoJqXukD6cPW1Q3-zRtn6Ybp1buJapChUH-OYM";
    const authHeader = req.header('authorization');
    let token = ""
    if(authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length);
    }

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, secretkey);
        if(decoded.application === 'todoApp') {
            // console.log("verified Info",decoded);
            next();
        } else {
            res.status(500).json({ error: 'Invalid token' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;