# serverless-http-api-stage
Add stage variables ApiGateway V2 for HTTP APIs.

# Installation
```
npm install serverless-apigv2-http-api-stage --save-dev
```

# Usage
```yaml

custom:
  httpApi: # serverless-http-api-stage
    region: ${opt:region, self:provider.region}
    accountId: ${file(./env.yaml):${self:custom.stage}.ACCOUNT_ID}

plugins:
  - serverless-apigv2-http-api-stage
```
