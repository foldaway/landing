# landing
[![Netlify Status](https://api.netlify.com/api/v1/badges/744c7980-7a7c-4642-bc4e-7ebd7ffe83f0/deploy-status)](https://app.netlify.com/sites/fch-landing/deploys)

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
