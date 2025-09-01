# DevTinder APIs

- POST /signup
- POST /login
- POST /logout

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

- POST /request/send/interested/:user_id
- POST /request/send/ignore/:user_id
- POST /request/review/accepted/:request_id
- POST /request/review/rejected/:request_id

- GET /user/connections
- GET /user/request/received
- GET /user/feed

Status: ignore, interested, accepted, rejected