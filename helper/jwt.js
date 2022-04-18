const config = require("config");
const createError = require("http-errors");
const jsonwebtoken = require("jsonwebtoken");
const accessKey = config.get("JWT.access_token");
const refreshKey = config.get("JWT.refresh_token");
const client = require("../helper/init_redis");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = accessKey;
      const options = {
        expiresIn: "1hr",
        issuer: "bixbase.com",
        audience: userId,
      };
      jsonwebtoken.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }

        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized);
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jsonwebtoken.verify(token, accessKey, (err, payload) => {
      if (err) {
        if (err.name == "JsonWebTokenError") {
          return next(createError.Unauthorized());
        } else {
          return next(createError.Unauthorized(err.message));
        }
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = refreshKey;
      const options = {
        expiresIn: "1yr",
        issuer: "bixbase.com",
        audience: userId,
      };
      jsonwebtoken.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }

        client
          .setEx(userId, 365 * 24 * 60 * 60, token, function (err, reply) {
            if (err) {
              console.log(err);
              reject(createError.InternalServerError());
            }
          })
          .then(() => {
            resolve(token);
          });
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(refreshToken, refreshKey, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.aud;

        // client.get(userId, (err, result) => {
        //   console.log(result);
        //   if (err) {
        //     console.log(err.message);
        //     reject(createError.InternalServerError());
        //     return;
        //   }

        //   if (refreshToken === result) {
        //     return resolve(userId);
        //   }
        //   return reject(createError.Unauthorized());
        // })

        (async () => {
          const cl = await client.get(userId, (err, result) => {
            if (err) {
              console.log(err.message);
              return(createError.InternalServerError());
            }
            return result;
          });

          console.log(cl);
          if(refreshToken === cl){
            return resolve(userId);
          }
          return reject(createError.Unauthorized());
        })();

        
      });
    });
  },
};
