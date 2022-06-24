# validator
### Define your schemas and get started.

```typescript

const LoginValidate = {
    userName: {
        required: "kullanıcı adı zorunlu alandır.",
    },
    password: {
        min:6,
        required: "sifre zorunlu alandır."
    }
}

app.post("/login",validate(LoginValidate), (request, response) => {
    return response.json(request.body)
})

```

```typescript

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

app.post("/users", validate(schemaUser), (request, response) => {
  return response.json(request.body)
})

````
