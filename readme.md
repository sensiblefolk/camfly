# Camfly

Camfly is an on demand banner sharing tool that makes it dead simple to create editable banner images on the fly.

---

languages:
- Javascript
- Typescript
technology:
- React
- Redux
- Node.js
- fabric.js
- Graphql
- azure functions
- fluent Ui
products
- [Paystack](https://paystack.com)
- [Hasura](https://hasura.io)
- [Firebase](https://firebase.google.com)

---
  
## Contents

The file folder configuration for the project is described below

| File/folder       | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `frontend`        | The frontend website for the camfly application.           |
| `server`          | The API configuration |

## Prerequisites

- Node.js

## Setup

Switch to the "frontend" directory.

  Create a .env file in the root folder of the "frontend" directory and set the following enviroment variables

    + REACT_APP_FIREBASE_DEV_APIKEY=""
    + REACT_APP_FIREBASE_DEV_AUTHDOMAIN=""
    + REACT_APP_FIREBASE_DEV_DATABASEURL=""
    + REACT_APP_FIREBASE_DEV_STORAGEBUCKET=""
    + REACT_APP_FIREBASE_DEV_MESSAGESENDERID=""
    + REACT_APP_FIREBASE_DEV_PROJECTID=""
    + REACT_APP_FIREBASE_DEV_APPID=""
    + REACT_APP_DEV_FIREBASE_MEASUREMENTID=""
    + REACT_APP_DEV_DBURL="https://camfly-pg.herokuapp.com/v1/graphql"
    + REACT_APP_DEV_WSURL="wss://camfly-pg.herokuapp.com/v1/graphql"
    + REACT_APP_DEV_PS_PUBKEY="pk_test_c12ad99b596b3eb68fbedd1816d5902064eb2cbe"
    + REACT_APP_UPLOAD_IMAGE_URL="https://camfly-general.azurewebsites.net/api/general/uploadbase64?code=Q9T/ZQvx5QdJ1VG4sX46bO3QWd6cVD9QcY71fR3H/URQRbcdWRrJyw=="

## Running the sample

Run `yarn start`
