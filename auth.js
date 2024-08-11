const jwt = require("jsonwebtoken");
const checkAuth = require("./checkAuth");

/*
 ====================   JWT Verify =====================
*/

let envKey = process.env.PUBLICKEY;
let publicKEY = envKey.replace(/\\n/g, "\n");
const i = "Online Design Release System"; // Issuer
const s = ""; // Subject
const a = ""; // Audience

const verifyOptions = {
  issuer: i,
  subject: s,
  audience: a,
  algorithm: ["RS256"],
};

exports.validateAuth = async (req, res, next) => {
  try {
    // Check that the request contains a token
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      // Validate the token
      const token = req.headers.authorization.split(" ")[1];
      let legit = "";
      if (req.originalUrl.includes("/users/authenticate/")) {
        legit = await checkAuth(token); //await the result of our authentication check
      } else {
        legit = jwt.verify(token, publicKEY, verifyOptions);
      }
      if (legit) {
        req.userRole = legit.Role;
        next();
      } else {
        res.status(401).send("Access denied,invalid token");
      }
    } else {
      res.status(401).send("Access denied, check the access token is sent correctly.");
    }
  } catch (error) {
    console.log("Error in token validation", error);
    res.status(401).send({ message: error.name });
  }
};
