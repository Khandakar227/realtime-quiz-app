import admin from 'firebase-admin';
const serviceAccount =  require('../../secrets/secrets.json');

const fireAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default fireAdmin;