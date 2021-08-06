import { NextApiHandler } from 'next';

const handler: NextApiHandler = function(_, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(
    Buffer.from(`Hello<br>
    <a href="/api/cms-auth/auth" target="_self">
      Log in with GitHub
    </a>`)
  );
};

export default handler;
