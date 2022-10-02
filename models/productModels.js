import db from "../config/database.js"

export const productQuery = async (req , res) => {
    try {
        const query = 'CREATE TABLE produts (id_product INT AUTO_INCREMENT PRIMARY KEY , name_product VARCHAR(255) , pict_product VARCHAR(255), price_product INT , createdAdd DATETIME , createdUpdate DATETIME)'
        const ProductQ = (await db).execute(query);
        res.json({status: 200 , msg:"Create Table Succes"})
    } catch (error) {
        res.json({status:404, msg: error.message})
    }
}