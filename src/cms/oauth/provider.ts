import ClientOAuth2 from 'client-oauth2';

const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  URL = 'http://localhost:3000',
  SCOPES,
} = process.env;

if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET) {
  throw new Error('Missing GitHub OAuth');
}

const provider = new ClientOAuth2({
  clientId: OAUTH_CLIENT_ID,
  clientSecret: OAUTH_CLIENT_SECRET,
  accessTokenUri: 'https://github.com/login/oauth/access_token',
  authorizationUri: 'https://github.com/login/oauth/authorize',
  redirectUri: `${URL}/api/cms-auth/callback`,
  scopes: SCOPES?.split(',') ?? ['repo', 'user'],
});

export default provider;
