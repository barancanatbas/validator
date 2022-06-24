import { NextFunction, Request, Response } from "express";

const Regexs: any = {
  email: {
    regex: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
  },
};

const validate = (schema: any) => {
  const validation = (request: Request,response: Response,next: NextFunction) => {
    const { body } = request;
    const errors: any = [];
    console.log(body);

    Object.keys(schema).forEach((item) => {
      const itemSchema = schema[item];

      if (itemSchema.required && !body[item]) {
        errors.push(`${item} zorunlu alandır.`);
      }

      if (itemSchema.type) {
        const temp = body[item]
        if (typeof temp === "number" && itemSchema.type !== "number") {
            errors.push({"message": `tip hatası ${item} - ${itemSchema.type}`});
        }

        if (typeof temp === "string" && itemSchema.type !== "string") {
            errors.push({"message": `tip hatası ${item} - ${itemSchema.type}`});
        }

        if (typeof temp === "boolean" && itemSchema.type !== "boolean") {
            errors.push({"message": `tip hatası ${item} - ${itemSchema.type}`});
        }
      }

      if (itemSchema.min && body[item]?.length < itemSchema.min) {
        errors.push({"message": `${item} ${itemSchema.min}'den küçük olamaz.`});
      }

      if (itemSchema.max && body[item]?.length > itemSchema.max) {
        errors.push({"message": `${item} ${itemSchema.min}'den küçük olamaz.`});
      }

      if (itemSchema.omitempity && !body[item]) {

        if (itemSchema?.type === "number") {
            request.body[item] = 0
        }
        else if (itemSchema?.type === "string") {
            request.body[item] = ""
        }
        else if (itemSchema?.type === "boolean") {
            request.body[item] = 0
        }
        else {
            request.body[item] = ""
        }
      }

      if (itemSchema.format) {
        const regexItem: any = Regexs[item];

        if (regexItem && !new RegExp(regexItem.regex).test(body[item])) {
          errors.push({"message":`${item} formatı hatalı`});
        }
      }
    });

    if (errors.length > 0) return response.status(400).json({results: errors});

    return next();
  };

  return validation;
}

export { validate };
