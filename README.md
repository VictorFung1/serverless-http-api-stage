# serverless-http-api-stage
Add stage variables ApiGateway V2 for HTTP APIs.
Note: This is meant to work together with serverless-plugin-canary-deployments

# Installation
```
npm install serverless-plugin-canary-deployments --save-dev
npm install serverless-apigv2-http-api-stage --save-dev
```

# Usage
```yaml

custom:
  httpApi: # serverless-http-api-stage
    region: ${opt:region, self:provider.region}
    accountId: ${file(./env.yaml):${self:custom.stage}.ACCOUNT_ID}

plugins:
  - serverless-plugin-canary-deployments
  - "@victorfung1/serverless-apigv2-http-api-stage"
```
