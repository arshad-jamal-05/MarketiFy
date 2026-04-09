const jwt = require("jsonwebtoken");

function authSuperAdmin(req, res, next) {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY_PRIVATE,
    );
    if (["Super Admin"].includes(decode.data.role)) {
      next();
    } else {
      res.status(401).send({
        result: "Fail",
        reason: "You are not authorized to access this API",
      });
    }
  } catch (error) {
    console.log(error.name, error.message);
    res.status(401).send({
      result: "Fail",
      reason:
        error.message === "jwt must be provided"
          ? "You are not authorized to access this API"
          : "Your Login Session Has Been Expired, Please Login Again",
    });
  }
}

function authAdmin(req, res, next) {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY_PRIVATE,
    );
    if (["Super Admin", "Admin"].includes(decode.data.role)) {
      next();
    } else {
      res.status(401).send({
        result: "Fail",
        reason: "You are not authorized to access this API",
      });
    }
  } catch (error) {
    console.log(error.name, error.message);
    res.status(401).send({
      result: "Fail",
      reason:
        error.message === "invalid signature" ||
        error.message === "jwt must be provided"
          ? "You are not authorized to access this API"
          : "Your Login Session Has Been Expired, Please Login Again",
    });
  }
}

function authBuyer(req, res, next) {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY_PRIVATE,
    );
    if (["Super Admin", "Admin", "Buyer"].includes(decode.data.role)) {
      next();
    } else {
      res.status(401).send({
        result: "Fail",
        reason: "You are not authorized to access this API",
      });
    }
  } catch (error) {
    console.log(error.name, error.message);
    res.status(401).send({
      result: "Fail",
      reason:
        error.message === "invalid signature" ||
        error.message === "jwt must be provided"
          ? "You are not authorized to access this API"
          : "Your Login Session Has Been Expired, Please Login Again",
    });
  }
}

function authPublic(req, res, next) {
  try {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY_PRIVATE);
    next();
  } catch (error) {
    try {
      jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY_PUBLIC);
      next();
    } catch (error) {
      res.status(401).send({
        result: "Fail",
        reason:
          error.message === "invalid signature" ||
          error.message === "jwt must be provided"
            ? "You are not authorized to access this API"
            : "Your Login Session Has Been Expired, Please Login Again",
      });
    }
  }
}

module.exports = {
  authSuperAdmin: authSuperAdmin,
  authAdmin: authAdmin,
  authBuyer: authBuyer,
  authPublic: authPublic,
};
