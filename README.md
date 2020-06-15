# serverless-http-api-stage
Add stage variables ApiGateway V2 for HTTP APIs.

# Usage
```yaml

custom:
  httpApi: # serverless-http-api-stage
    region: ${opt:region, self:provider.region}
    accountId: ${file(./env.yaml):${self:custom.stage}.ACCOUNT_ID}

plugins:
  - serverless-http-api-stage
```
