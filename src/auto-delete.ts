// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const { firestore } = require("firebase-admin");
// admin.initializeApp();

// exports.removeExpiredDocuments = functions.pubsub
//   .schedule("every 1 hours")
//   .onRun(async (context: any) => {
//     const db = admin.firestore();
//     const now = firestore.Timestamp.now();
//     const ts = firestore.Timestamp.fromMillis(now.toMillis() - 86400000);

//     const snap = await db
//       .collection("docs")
//       .where("publishedAt", "<", ts)
//       .get();
//     let promises: any[] = [];
//     snap.forEach((snap: { ref: { delete: () => any } }) => {
//       promises.push(snap.ref.delete());
//     });
//     return Promise.all(promises);
//   });
function autodelete() {}
export default autodelete;
