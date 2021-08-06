import ClientOAuth2 from 'client-oauth2';
import { NextApiHandler } from 'next';

import provider from '../../../cms/oauth/provider';

const {
  OAUTH_PROVIDER = 'github',
  URL = 'http://localhost:3000',
} = process.env;

const handler: NextApiHandler = function(req, res) {
  let mess;
  let content;

  async function run() {
    let user: ClientOAuth2.Token;

    try {
      user = await provider.code.getToken(req.url ?? '');

      mess = 'success';
      content = {
        token: user.accessToken,
        provider: OAUTH_PROVIDER,
      };
    } catch (e) {
      console.error('Access Token Error', e.message);
      mess = 'error';
      content = JSON.stringify(e);
    }

    const script = `
      <script>
      (function() {
        function recieveMessage(e) {
          console.log("recieveMessage %o", e)
          if (!e.origin.match(${JSON.stringify(URL)})) {
            console.log('Invalid origin: %s', e.origin);
            return;
          }
          // send message to main window with da app
          window.opener.postMessage(
            'authorization:${OAUTH_PROVIDER}:${mess}:${JSON.stringify(
      content
    )}',
            e.origin
          )
        }
        window.addEventListener("message", recieveMessage, false)
        // Start handshare with parent
        console.log("Sending message: %o", "${OAUTH_PROVIDER}")
        window.opener.postMessage("authorizing:${OAUTH_PROVIDER}", "*")
      })()
      </script>`;
    return res.send(script);
  }

  run();
};

export default handler;
