# API Documentation

The base endpoint is `https://snip.au/api`.

## **GET** snip_get
Returns a snip provided it's id. All snips are public by default unless protected with a password.

### **Example Response**
`http://localhost:8888/api/snip_get?id=test`
```json
[
    {
        "id": "example",
        "code": "Console.WriteLine(\"Hello World\")",
        "password": null,
        "user_id": "d99cf61a-219a-11ed-861d-0242ac120002",
        "created_at": "07:48:24",
        "expires_in": null,
        "language": "C#"
    }
]
```


## **POST** api/snip_new
Creates a snip, provided with different parameters. An `Authorization` header with your `user_id` is recommended so the snip is associated with an account, but is not required. Responds with the parameters of the created snip.

### **Example Response**
```json
[
    {
        "id": "q1t",
        "code": "print(\"hello world!\")",
        "password": null,
        "user_id": "d99cf61a-219a-11ed-861d-0242ac120002",
        "created_at": "21:46:06.046806",
        "expires_in": null,
        "language": "Python"
    }
]
```
## **GET** users_snips
Returns all snips from a particular user. Requires `Authorization` header with the value of your `user_id`.

### **Example Response**
```json
[
    {
        "id": "x4g",
        "code": "console.log(\"Hello World!\")",
        "password": null,
        "user_id": "d99cf61a-219a-11ed-861d-0242ac120002",
        "created_at": "16:11:44",
        "expires_in": null,
        "language": "JavaScript"
    },
    {
        "id": "example",
        "code": "Console.WriteLine(\"Hello World\")",
        "password": null,
        "user_id": "d99cf61a-219a-11ed-861d-0242ac120002",
        "created_at": "07:48:24",
        "expires_in": null,
        "language": "C#"
    },
]
```
## **PATCH** api/snip_edit

### **Example Response**
```json

```
## **DELETE** api/snip_delete

### **Example Response**
```json

```