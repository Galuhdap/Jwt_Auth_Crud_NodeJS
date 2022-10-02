import db from "../config/database.js";

export const getProduct = async (req, res) => {
  try {
    const Query = `SELECT * FROM produts`;
    const response = (await db).execute(Query)
                .then(([rows, faileds]) => {
                res.json({ status: 200, payload: rows});
    });
  } catch (error) {
        throw error;
  }
};

export const getProductById = async (req, res) => {
    try {
        const Query = `SELECT * FROM produts WHERE id_product = '${req.params.id}' `;
        console.log(Query)
        const response = (await db).execute(Query)
                    .then(([rows , faileds]) => {
                      res.json({status:200 , payload: rows});
                    })
    } catch (error) {
        throw error;
    }
};
export const createProduct = async (req, res) => {
    try {
        const Query = `INSERT INTO produts SET name_product = '${req.body.name_product}' , pict_product = '${req.body.pict_product}' , price_product = '${req.body.price_product}'`;
        const response = (await db).execute(Query)
                    .then(([rows , faileds]) => {
                      res.json({status: 200 , msg : "Succes Create Product"})
                    })
    } catch (error) {
        throw error;
    }
};
export const updateProduct = async (req, res) => {
    try {
        const Query = `UPDATE produts SET name_product = '${req.body.name_product}' , pict_product = '${req.body.pict_product}' , price_product = '${req.body.price_product}' WHERE id_product = '${req.params.id}'`
        const response = (await db).execute(Query)
                    .then(([rows , faileds]) => {
                      res.json({status: 200 , msg : "Succes Update Product"})
                    })
    } catch (error) {
      throw error;
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const Query = `DELETE FROM produts WHERE id_product = '${req.params.id}'`
        console.log(Query)
        const response = (await db).execute(Query)
                    .then(([rows , faileds]) => {
                      res.json({status: 200 , msg: "Succes Delete Product"})
                    })
    } catch (error) {
      throw error;
    }
};
