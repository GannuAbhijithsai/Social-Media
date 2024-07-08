const admin = require("firebase-admin");
const serviceAccount = {
  type: "service_account",
  project_id: `${process.env.PROJECT_ID}`,
  private_key_id:`${process.env.PROJECT_KEY_ID}`,
  private_key:process.env.PROJECT_KEY,
  client_email: `${process.env.CLIENT_EMAIL}`,
  client_id: `${process.env.CLIENT_ID}`,
  auth_uri: `${process.env.AUTH_URI}`,
  token_uri:`${process.env.TOKEN_URI}`,
  auth_provider_x509_cert_url: `${process.env.AUTH_PROVIDER}`,
  client_x509_cert_url:`${process.env.CLIENT_URI}`,
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "social-media-ff271.appspot.com",
});

const bucket = admin.storage().bucket();
module.exports={bucket}
