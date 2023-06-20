import { Request, Response } from "express";
import { validate } from "class-validator";

import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";
import { RegisterInput } from "../Inputs/Register.input";
import { Url } from "../Models/User";

class URLController {
  static createUrl = async (req: Request, res: Response): Promise<any> => {
    const input = req.body;
    console.log(input);

    const registerInput = new RegisterInput();

    registerInput.URL = input.URL;
    const errors = await validate(registerInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return res
        .status(400)
        .json({ error: { message: "VALIDATIONS_ERROR", info: errorsInfo } });
    }
    try {
      const url: any = await Url.findOne({ URL: input.URL });
      if (!url) {
        const generateSlug = (): string => {
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
          let randomSlug = "";
          const slugLength = 6;

          for (let i = 0; i < slugLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomSlug += characters.charAt(randomIndex);
          }

          return randomSlug;
        };

        const slug = generateSlug();
        console.log(slug);

        await Url.create({
          URL: input.URL,
          label: input.label,
          type: input.type,
        });
        return res.json({
          data: {
            URL: input.URL,
            slug: slug,
            short_url: process.env.SHORTEN_DOMAIN_PREFIX + "/" + slug,
          },
        });
      } else {
        return res
          .status(400)
          .json({ data: { message: "URL already exists" } });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: { message: "Something went wrong." } });
    }
  };

 
}

export { URLController };
