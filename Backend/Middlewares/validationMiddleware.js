const { Joi } = require("joi");

const validateFunction = (schema) => {
  return (req, res, next) => {
    const apiVersion = req.headers["x-api-version"]
      ? req.headers["x-api-version"]
      : "";

    //(schema);

    const { error } = schema.validate(req.body);

    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;

      const message = details.map((i) => i.message).join(",");

      if (apiVersion > "1.0.1") {
        res.status(422).json({
          status: "error",

          detail: {
            errorcode: 422,

            message: "Fill all the details",
          },
        });
      }

      res.status(422).json({
        message: "Fill all the details",
      });
    }
  };
};

module.exports = validateFunction;