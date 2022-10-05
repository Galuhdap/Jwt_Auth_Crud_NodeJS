import getDB from "../config/database.js";
import brcypt from "bcrypt"

export const getUser = async (req, res) => {
  try {
    const db = await getDB();
    const Query = 'SELECT id , email , name FROM users';
    const [rows] = await db.execute(Query);
    res.json({status: 200 , payload: rows})

  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const db = await getDB();
    const Query = `SELECT * FROM users WHERE id = '${req.params.id}'`;
    console.log(Query)
    const [rows] = await db.execute(Query)
    res.json({ status: 200, payload: rows});
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
    const db = await getDB();
    const Query = `INSERT INTO users SET name = '${name}', email = '${email}' , password = '${hashPassword}'`;
    const [rows] = await db.execute(Query)
    res.json({status: 200 , msg:"Succes Create Table"})
  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const db = await getDB();
    const Query = `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}' , password = '${req.body.password}' WHERE id = '${req.params.id}'`;
    const [rows] = await db.execute(Query)
    res.json({status:200 , msg:"Update Succes"})
  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const db = await getDB();
    const Query = `DELETE FROM users WHERE id = '${req.params.id}'`;
    const [rows] = await db.execute(Query)
    res.json({status: 200 , msg:"Delete Succes"})
  } catch (error) {
    res.json({ status: 404, msg: error.message });
  }
};
