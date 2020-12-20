import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GraphQLClient } from 'graphql-request';
import * as express from 'express';
import * as dotenv from 'dotenv';
// import * as sgMail from '@sendgrid/mail';
// import * as cors from 'cors';

import { ADD_NEW_USER } from './graphql.type';

// enviroment configuration
dotenv.config();

admin.initializeApp(functions.config().firebase);

// const Cors = cors({ origin: true });

//initialize express server
const app = express();
const main = express();

// register for express api routes
// monnify.monnifyApi(app);

//add the path to receive request and set json as bodyParser to process the body
main.use('/api/v1', app);
main.use(express.json());
main.use(express.urlencoded());

export const client = new GraphQLClient(
  'https://camfly-pg.herokuapp.com/v1/graphql',
  {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': `${functions.config().database.key}`,
    },
  }
);

// On sign up.
export const processSignUp = functions.auth.user().onCreate(async (user) => {
  const role = await getUserRoles(user?.uid);
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': [role, 'anonymous'],
      'x-hasura-user-id': user.uid,
    },
  };

  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      // Update real-time database to notify client to force refresh.
      const metadataRef = admin.database().ref('metadata/' + user.uid);
      // Store new user details in database
      updateUserDetails(user)
        .then(() => console.log('user added to database'))
        .catch((err) => console.log('failed adding', err));
      // console.log('jumped in 1');
      // Set the refresh time to the current UTC timestamp.
      // This will be captured on the client to force a token refresh.
      return metadataRef.set({ refreshTime: new Date().getTime() });
    })
    .catch((error) => {
      console.log(error);
    });
});

// get user details from firebase datastore
async function getUserRoles(uid: string) {
  try {
    const userRef = await admin.database().ref(`users/${uid}`).once('value');
    const user = userRef.val();
    return user?.role;
  } catch (error) {
    console.error('failed getting user role detail', JSON.stringify(error));
  }
}

// update user fields in firebase datastore
async function updateUserDetails(user: admin.auth.UserRecord) {
  const email = user.email;
  const avatar = user.photoURL || '';
  const userRef = admin.database().ref(`users/${user.uid}`);

  userRef
    .once('value')
    .then(async (userDetails) => {
      const value = userDetails.val();
      if (value) {
        if (!user.displayName) {
          await admin.auth().updateUser(user.uid, { displayName: value.name });
          console.log('name updated');
        }
        await userMutation(user.uid, email, value.name, avatar);
        // await sendWelcomeEmail(value.name, email as any);
      }

      return;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

// Add new user to user
const userMutation = async (
  uid: string,
  email: string | undefined,
  name: string,
  avatar: string
) => {
  try {
    const splitName = name.split(' ');
    const data = await client.request(ADD_NEW_USER, {
      uid: uid,
      email: email,
      first_name: splitName[0],
      last_name: splitName[1],
      avatar: avatar,
    });

    return data;
  } catch (error) {
    console.error('failed adding new user', JSON.stringify(error));
    throw new functions.https.HttpsError(
      'invalid-argument',
      'sync to graphql failed'
    );
  }
};

// // Send welcome email to new user
// function sendWelcomeEmail(name: string, email: string) {
//     const msg = {
//         to: `${name} <${email}>`,
//         from: `Boromee <no-reply@boromee.app>`,
//         subject: `Welcome to Boromee`,
//         templateId: 'd-e9277cd3f5c8442ca8d55cbe335c0eb3',
//         dynamic_template_data: {
//             name: name,
//         },
//     };

//     sgMail
//         .send(msg)
//         .then(() => {
//             console.log('New user mail sent successfully', email);
//         })
//         .catch((error) => console.error('failed sending new user mail', error));
//     return;
// }
