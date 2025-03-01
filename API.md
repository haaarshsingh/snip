## API Docs

The base endpoint for the api is `https://api.snip.tf/`.

The API has no headers/authentication and is rate limited to 5 requests per second. After exceeding the rate limit your requests will get a 429 (too many requests) response code. If you need to do more requests than that [contact me](mailto:h@harshsingh.me).

### /snips/

The endpoint for creating and fetching snips.

#### Get a Snip

`GET https://api.snip.tf/snips/get/{_id}`

This returns a [full snip object](#full-snip-object).

#### Create a Snip

`POST https://api.snip.tf/snips/create`

JSON body:

| Field     | Type          | Optional | Description        |
| --------- | ------------- | -------- | ------------------ |
| title     | string        | ✅       | Title of the snip. |
| expiry_at | UTC Timestamp | ✅       | Title of the snip. |
| snips     | Snip[]        | ❌       | Code files.        |

Check out the [snip object](#partial-snip-object).

### Objects

Note: all the IDs are auto-generated.

#### Full Snip Object

| Field | Type   | Description                |
| ----- | ------ | -------------------------- |
| \_id  | string | The snip's identifier.     |
| title | string | Title of the snip.         |
| snips | Snip[] | List of files in the snip. |

#### Partial Snip Object

| Field    | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| \_id     | string | The individual snippet's identifier.             |
| title    | string | The file name.                                   |
| content  | string | Contents of the snip.                            |
| language | string | Language of the snip. Must be in a valid format. |
