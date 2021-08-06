import crypto from 'crypto';
import { NextApiHandler } from 'next';

import provider from '../../../cms/oauth/provider';

const handler: NextApiHandler = function(_, res) {
  res.redirect(
    provider.code.getUri({
      state: crypto.randomBytes(16).toString('hex'), // generate 32 length random string
    })
  );
};

export default handler;
