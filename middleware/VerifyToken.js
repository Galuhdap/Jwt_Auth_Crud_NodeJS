import jwt from 'jsonwebtoken';

export const verifyToken = (req , res , next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.json({status: 401});
    jwt.verify(token , process.env.ACCES_TOKEN_SECRET, (err , decoded) => {
        if(err) return res.json({status: 404 , msg: "Token is Expaied"}) , console.log(err) ;
        req.email = decoded.email;
        console.log(req.email)
        next();
    })
}