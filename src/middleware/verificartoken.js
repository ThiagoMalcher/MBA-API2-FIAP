const jwt = require("jsonwebtoken");
const cfg = require("../config/cfg");

const HTTP_UNAUTHORIZED = 401;
const HTTP_UNAUTHORIZED_MESSAGE = "Não autorizado";
const HTTP_INVALID_TOKEN_MESSAGE = "Token inválido";

const verificarToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return sendErrorResponse(res, HTTP_UNAUTHORIZED, HTTP_UNAUTHORIZED_MESSAGE);
  }

  jwt.verify(token, cfg.jwt_secret, (erro, result) => {
    if (erro) {
      return sendErrorResponse(res, HTTP_UNAUTHORIZED, `${HTTP_INVALID_TOKEN_MESSAGE} -> ${erro}`);
    }
    
    req.data = {
      id: result.id,
      user: result.nomeusuario,
      email: result.email,
    };
    next();
  });
};

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).send({ output: message });
}

module.exports = verificarToken;
