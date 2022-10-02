import db from "../config/database.js";
import jwt from "jsonwebtoken";
import brcypt from "bcrypt";

export const Login = async (req, res) => {
  try {
    const email = req.body.email;
    const Query = `SELECT * FROM users WHERE email = '${email}'`;
    if (!email) return res.json({ msg: "Email Tidak Di temukan" });
    const users = (await db).execute(Query).then(([rows, fileds]) => {
      if (!rows.length) return res.json({ msg: "Tidak ada Akun" });
      brcypt.compare(
        req.body.password,
        rows[0].password,
        async (berr, bresults) => {
          if (berr) {
            throw berr;
          }
          if (bresults) {
            const id = rows[0].id;
            const name = rows[0].name;
            const email = rows[0].email;
            const accesToken = jwt.sign(
              { id, name, email },
              process.env.ACCES_TOKEN_SECRET,
              {
                expiresIn: "20s",
              }
            );
            const refreshToken = jwt.sign(
              { id, name, email },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "1m",
              }
            );
            const queryUpdate = `UPDATE users SET refresh_token = '${refreshToken}' WHERE id = '${id}'`;
            (await db).execute(queryUpdate);
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ accesToken, msg: "Login Berhasil" });
          } else {
            return res.json({ msg: "Wrong Password" });
          }
        }
      );
    });
  } catch (error) {
    res.json({ msg: "Wrong Email" });
  }
};

export const Me = (req, res) => {};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.json({ status: 204 });
  const Query = `SELECT * FROM users WHERE refresh_token = '${refreshToken}'`;
  const response = (await db).execute(Query).then(async ([rows, feilds]) => {
    if (!rows[0]) return res.json({ status: 204 });
    const id = rows[0].id;
    const queryUpdate = `UPDATE users SET refresh_token = NULL WHERE id = '${id}'`;
    (await db).execute(queryUpdate);
    res.clearCookie("refreshToken");
    return res.json({ status: 200 });
  });
};
