# DevTinder APIs

## authRoter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## requestRouter
- POST /request/send/interested/:user_id
- POST /request/send/ignore/:user_id
- POST /request/review/accepted/:request_id
- POST /request/review/rejected/:request_id

## userRouter
- GET /user/connections
- GET /user/request/received
- GET /user/feed

Status: ignore, interested, accepted, rejected