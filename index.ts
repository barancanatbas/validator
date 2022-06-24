import express from "express";
import { validate } from "./validation";

const app = express();

app.use(express.json());

const schemaUser = {
  username: {
    required: 'username zorunlu alandır.'
  },
  password: {
    min: 10,
    max: 12,
  },
  email: {
    format: "email",
    required: 'Email zorunlu alandır.'
  },
  name:{
    omitempity:1
  },
  age:{
    type: "number"
  }
}

const LoginValidate = {
    userName: {
        required: "kullanıcı adı zorunlu alandır.",
    },
    password: {
        min:6,
        required: "sifre zorunlu alandır."
    }
}

app.post("/users", validate(schemaUser), (request, response) => {
  return response.json(request.body)
})

app.post("/login",validate(LoginValidate), (request, response) => {
    return response.json(request.body)
})


app.listen(3000, () => console.log("Server is running on PORT 3000"))