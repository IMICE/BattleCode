const GoogleAuth = require('google-auth-library');

const auth = new GoogleAuth;
const CLIENT_ID = '211293983578-31ep5qbej79oebntrtn4rd3nbtqvemqc.apps.googleusercontent.com';
const client = new auth.OAuth2(CLIENT_ID);
exports.tokenCheck = (token, cb) => {
  client.verifyIdToken(
    token,
    function(e, login) {
      let payload = login.getPayload();
      let userid = payload['sub'];
      cb({
        email: payload.email,
      });
    },
  );
};
