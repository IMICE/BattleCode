const GoogleAuth = require('google-auth-library');
const config = require('./config.js');
const auth = new GoogleAuth;
const CLIENT_ID = config.CLIENT_ID;
const client = new auth.OAuth2(CLIENT_ID);
exports.tokenCheck = (token, cb) => {
  client.verifyIdToken(
    token,
    CLIENT_ID,
    function(e, login) {
      let payload = login.getPayload();
      let userid = payload['sub'];
      cb({
        email: payload.email,
      });
    },
  );
};

