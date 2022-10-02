import db from "../config/database.js";
import brcypt from "bcrypt"

export const getUser = async (req, res) => {
  try {
    const Query = 'SELECT id , email , name FROM users';
    const response = (await db).execute(Query)
            .then(([rows, fields]) => {
              res.json({ status: 200, payload: rows})
            });    
  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const Query = `SELECT * FROM users WHERE id = '${req.params.id}'`;
    console.log(Query)
    const response = (await db).execute(Query)
              .then(([rows , field]) => {
                res.json({ status: 200, payload: rows});
              });
  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};

export const createUser = async (req, res) => {
        const {name , email , password , confpassword} = req.body;
        if(password != confpassword) return res.json({msg : "Password Tidak Cocok"});
        const salt = await brcypt.genSalt();
        const hashPassword = await brcypt.hash(password, salt);
  try {
    const Query = `INSERT INTO users SET name = '${name}', email = '${email}' , password = '${hashPassword}'`;
    const response = (await db).execute(Query)
              .then(([rows, fields]) => {
                res.json({status: 200 , msg:"Create Table"})
              });
  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const Query = `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}' , password = '${req.body.password}' WHERE id = '${req.params.id}'`;
    const response = (await db).execute(Query)
              .then(([rows , fields]) => {
                res.json({status:200 , msg:"Update Succes"})
              });
    
  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const Query = `DELETE FROM users WHERE id = '${req.params.id}'`;
    const response = (await db).execute(Query)
              .then(([rows , fields]) => {
                res.json({status: 200 , msg:"Delete Succes"})
              });
  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};
