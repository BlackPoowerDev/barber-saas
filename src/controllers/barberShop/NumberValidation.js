import path from "path";
import admin from "firebase-admin";
const pathFile = path.join(process.cwd(), "src", "firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(pathFile),
});

export const NumberValidation = async (req, res, next) => {
  const { idToken } = req.body;

  const tokenDecode = await admin.auth().verifyIdToken(idToken);

  console.log(tokenDecode);
};
