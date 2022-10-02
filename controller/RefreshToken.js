import Jwt from "jsonwebtoken";
import db from "../config/database.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.json({ status: 401 });
    const Query = `SELECT * FROM users WHERE refresh_token = '${refreshToken}'`;
    const response = (await db).execute(Query).then(([rows, fields]) => {
      if (!rows[0]) return res.json({ status: 403 });
      Jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decode) => {
          if (err) return res.json({ status: 400 });
          const id = rows[0].id; 
          const name = rows[0].name;
          const email = rows[0].email;
          const accesToken = Jwt.sign(
            { id, name, email },
            process.env.ACCES_TOKEN_SECRET,
            {
              expiresIn: "20s",
            }
          );
          res.json({ accesToken });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};
