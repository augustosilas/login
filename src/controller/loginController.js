const connection = require("../database/connection");
const { authSecret } = require("../../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = {
  async signin(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).send("Informe usuário e senha!");
    }

    const sql = "SELECT * FROM InfoEmpregado WHERE email = ?";
    connection.query(sql, [email], async (err, results, fields) => {
      if (err) throw err;

      const user = await JSON.parse(JSON.stringify(results[1]));

      if (!user) return res.status(400).send("Usuário não encontrado!");

      const isMatch = bcrypt.compareSync(senha, user.senha);
      if (!isMatch) return res.status(401).send("Email/Senha inválidos!");

      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        iat: now, // data de criação
        exp: now + 60 * 60 * 24 * 3, // data de expiração (expira três dias depois da data de criação)
      };

      return res.json({
        ...payload,
        token: jwt.encode(payload, authSecret),
      });
    });
  },

  async validateToken(req, res) {
    const userData = req.body || null;

    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);

        if (new Date(token.exp * 1000) > new Date()) {
          // caso esteja perto de renovar, pode ser enviado outro um novo token
          return res.send(true);
        }
      }
    } catch (err) {
      // problema com token
      // token expirar, tentar decodificar o token com uma chave diferente
    }
    // retorna false caso o token seja inválido
    res.send(false);
  },
};
