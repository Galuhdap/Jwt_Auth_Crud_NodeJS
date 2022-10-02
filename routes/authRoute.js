import Express from "express";
import {Login , Logout} from "../controller/Auth.js";
import {refreshToken} from "../controller/RefreshToken.js";

const route = Express.Router();

route.post('/login', Login);
route.get('/token', refreshToken);
route.delete('/logout', Logout);

export default route;