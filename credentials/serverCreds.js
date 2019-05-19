module.exports = {
    type: process.env.SERVER_FIREBASE_TYPE,
    project_id: process.env.SERVER_FIREBASE_PROJECTID,
    private_key_id: process.env.SERVER_FIREBASE_KEYID,
    private_key: process.env.SERVER_FIREBASE_PRIVATEKEY,
    client_email: process.env.SERVER_FIREBASE_CLIENTEMAIL,
    client_id: process.env.SERVER_FIREBASE_CLIENTID,
    auth_uri: process.env.SERVER_FIREBASE_AUTHURI,
    token_uri: process.env.SERVER_FIREBASE_TOKENURI,
    auth_provider_x509_cert_url: process.env.SERVER_FIREBASE_AUTHPROVIDERX509CERTURL,
    client_x509_cert_url: process.env.SERVER_FIREBASE_CLIENTX509CERTURL,
};
