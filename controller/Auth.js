import getDB from "../config/database.js";
import jwt from "jsonwebtoken";
import brcypt from "bcrypt";

export const Login = async (req, res) => {
  try {
    const db = await getDB();
    const Query = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    const [rows] = await db.execute(Query)
    console.log(rows)
    console.log(req.body.password, rows[0].password);
    const match = await brcypt.compare(req.body.password, rows[0].password);
    console.log(match)
    if(!match) return res.json({status: 400 , msg: "Wrong Password"});
    const id = rows[0].id;
    const name = rows[0].name;
    const email = rows[0].email;
    const accesToken = jwt.sign({id , name , email} , process.env.ACCES_TOKEN_SECRET , {
      expiresIn: '20s'
    })
    console.log(accesToken);
    const refreshToken = jwt.sign({id , name , email} ,  process.env.REFRESH_TOKEN_SECRET , {
      expiresIn: '1d',
    })
    await db.execute(`UPDATE users SET refresh_token =  '${refreshToken}' WHERE id = '${id}'`)
    res.cookie('refreshToken' , refreshToken , {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })
    res.json({accesToken})
  } catch (error) {
    console.log(error)
    res.json({ msg: "Wrong Email" });
  }
};

export const Me = (req, res) => {};

export const Logout = async (req, res) => {
  const db = await getDB();
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.json({ status: 204 });
  const Query = `SELECT * FROM users WHERE refresh_token = '${refreshToken}'`;
  const [rows] = await db.execute(Query)
  console.log(rows)
  if(!rows) return res.json({status: 204});
  const id = rows[0].id;
  await db.execute(`UPDATE users SET refresh_token = NULL WHERE id = '${id}'`)
  res.clearCookie('refreshToken')
  return res.json({status: 200})
};
