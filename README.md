# next-base
[![Netlify Status](https://api.netlify.com/api/v1/badges/89720d2e-59d9-4567-97da-da2fa26a8cd9/deploy-status)](https://app.netlify.com/sites/next-base/deploys)

### Developing
```shell
$ yarn dev
```

and

```shell
$ npx netlify-cms-proxy-server
```


### Deployment
Create a GitHub App (this is an alternative to GitHub OAuth Apps and allow for scoping to a single repo). 

Generate the client secret and then set these env vars in your production deployment host:
- `OAUTH_CLIENT_ID`
- `OAUTH_CLIENT_SECRET` 
- `URL` (Netlify sets this automatically)

If necessary, this should work with BitBucket and GitLab as well, although you will need to set `OAUTH_PROVIDER` as well.
