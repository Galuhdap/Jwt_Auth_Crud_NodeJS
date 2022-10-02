import db from "../config/database.js"

export const userModel = async (req, res) => {
    const Query = 'CREATE TABLE users (id INT AUTO_INCREMANT , name VARCHAR(255) , email VARCHAR(255) , password VARCHAR(255))';
    const queryModel =  (await db).execute('CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) , email VARCHAR(255) , password VARCHAR(255))')
    console.log(queryModel)
    res.json({status: 200 , msg: "Succes Create Table" , payload : queryModel})
    console.log("Succes Create Table");
 
};

