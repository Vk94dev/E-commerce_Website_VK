// import admin from "firebase-admin";
// import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// console.log(admin);
// console.log(admin.credential);


// export default admin;







import { initializeApp, cert } from "firebase-admin/app";
// import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
}

initializeApp({
  credential: cert(serviceAccount),
});









