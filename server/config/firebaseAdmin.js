// import admin from "firebase-admin";
// import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// console.log(admin);
// console.log(admin.credential);


// export default admin;







import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

 initializeApp({
  credential: cert(serviceAccount),
});









