const connection = require("../database/connection");
const bcrypt = require("bcrypt-nodejs");

module.exports = {
  async create(req, res) {
    const { email, senha, nome } = req.body;

    const sql = "INSERT INTO InfoEmpregado(email, senha, nome) VALUES ?";
    const senhaCrypt = bcrypt.hashSync(senha);

    const values = [[email, senhaCrypt, nome]];

    connection.query(sql, [values], (err, results, fields) => {
      if (err) throw err;

      return res.json("OK!");
    });
  },
};
