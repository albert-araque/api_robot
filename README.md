# API_ROBOT

This API controls the movement of a robot in a 10x10 square.

#### API Endpoint

<details>
  <summary>
  <code>GET</code> <code><b>/{input}</b></code> <code>A string of directions (R or L) and movement (M)</code></summary>

##### Parameters

> | name   |  type      | data type      | description                                          |
> |--------|------------|----------------|------------------------------------------------------|
> | `input` |  required  | string         | A string of input for the robot. ex: RMMMLMMRRL                 |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain; charset=UTF-8`        | String string                                                         |
> | `400`         | `application/json`                | `{"error":"Bad Request"}`                            |

</details>

#### Use with docker

In the root folder of the project, use this command:

```
docker compose up --build
```

