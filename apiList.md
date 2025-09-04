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
- POST /request/send/:status/:userId

- POST /request/review/accepted/:request_id
- POST /request/review/rejected/:request_id

## userRouter
- GET /user/connections
- GET /user/request/received
- GET /user/feed

Status: ignored, interested, accepted, rejected