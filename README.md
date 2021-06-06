> Do not forget to change the fulfillment configuration (hostname, username and password) in the Dialogflow dashboard to go with parameters of the deployed api (current node.js project)

# Start locally with `ngrok` tunnel

```shell
npm run ngrok
```

This will run the api locally, but make it available publicly throw `ngrok` tunnel, with username: `admin` and password: `password`

# Dev

```shell
npm run dev
```

This will run the api locally in listening on port `8080`, with username: `admin` and password: `password`

