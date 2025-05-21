import admin from 'firebase-admin';
import fs from 'fs';
import service_account  from './serviceAccountKey.json';

const serviceAccount = JSON.parse(
  fs.readFileSync('./serviceAccountKey.json', 'utf-8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(service_account as admin.ServiceAccount),
    projectId: serviceAccount.project_id, 
  });
}

export const db = admin.firestore();