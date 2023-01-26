# API Documentation

The base endpoint is `https://snip.place/api`.

## **GET** snip_get

Returns a snip provided it's id. All snips are public by default unless protected with a password.

### **Example Response**

`http://snip.place/api/snip_get?id=test`
```json
[
    {
        "id": "test",
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

Edits the snip using the `id` provided in the body. Requires the `Authorization` header with your `user_id`. If the snip is not associated with an account,  Parameters that can be changed: `code`, `language`. 


### **Example Response**

```json
[
    {
        "id": "example",
        "code": "println!(\"Hello Rust!\");",
        "password": null,
        "user_id": "c3a74692-f210-4f27-bb36-feedb31f8425",
        "created_at": "07:48:24",
        "expires_in": null,
        "language": "Rust"
    }
]
```

## **DELETE** api/snip_delete
Deletes the snip using the `id` provided in the body. Requires the `Authorization` header with your `user_id`. Snips that are not associated with an account can not be deleted.

### **Example Response**

```json
{
    "statusCode": 200,
    "message": "Snip deleted successfully!"
}
```
