import { Request } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { IUser } from '@stp-erp/data';

export const getUserFromToken = (req: Request): Promise<IUser | null> => {
  const token2 = req.headers.authorization;
  const token = Array.isArray(token2) ? token2[0] : token2;

  if (token != null && token != '') {
    return admin
      .auth()
      .verifyIdToken(token.replace('Bearer ', ''))
      .then(async (decodedToken) => {
        const user: IUser = {
          email: decodedToken.email,
          uid: decodedToken.uid,
        };
        return user;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } else {
    return null;
  }
};

export const getUserFromContext = (
  context: functions.https.CallableContext
): IUser => {
  if (context.auth) {
    return {
      email: context.auth.token.email,
      uid: context.auth.uid,
    };
  } else {
    return null;
  }
};
