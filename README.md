# Family Radio Alexa Skill

```json
{
  "update": "echo 'sls alexa update' && sls alexa update && echo 'sls alexa build' && sls alexa build && echo 'sls deploy' && sls deploy && echo 'DONE'",
  "update-alexa": "echo 'sls alexa update' && sls alexa update && echo 'sls alexa build' && sls alexa build && echo 'DONE'",
  "update-lambda": "echo 'sls deploy' && sls deploy && echo 'DONE'",
}
```

## Update alexa and lambda
The `stage` in `serverless.yml > provider.stage` will determine which environment gets updated.
Change the stage to `prod` to update the production lambda and alexa.

`npm run update`

## How to update lambda only
In serverless.yml, change stage to dev or prod
Then run `npm run update-lambda`

## Deploy the prod skill
Go to https://developer.amazon.com/alexa/console/ask and certify the dev skill for production.
Amazon usually takes a day, then the live skill will be updated.

## View logs
`npm run logs`
