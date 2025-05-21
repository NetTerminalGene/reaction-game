import admin from 'firebase-admin';
import service_account  from './serviceAccountKey.json' 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(service_account as admin.ServiceAccount), 
  });
}

export const db = admin.firestore();