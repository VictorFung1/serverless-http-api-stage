const bPromise = require('bluebird');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'before:package:finalize': () => bPromise.bind(this).then(this.setLambdaApigatewayStage)
    };
  }

  setLambdaApigatewayStage() {
    const stage = this.options.stage || this.serverless.service.provider.stage;
    const region = this.options.region || this.serverless.service.provider.httpApi.region;
    const accountId = this.options.accountId || this.serverless.service.provider.httpApi.accountId;
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;

    Object.keys(template.Resources).forEach((key) => {
      const type = template.Resources[key].Type;
      if (type === 'AWS::ApiGatewayV2::Stage') {
        template.Resources[key].Properties.StageName = stage || '$default';
      }

      if (type === 'AWS::ApiGatewayV2::Integration') {
        const func = template.Resources[key].Properties.IntegrationUri['Fn::GetAtt'][0];
        const { Properties } = template.Resources[func];
        const { FunctionName } = Properties;
        template.Resources[key].Properties.IntegrationUri = `arn:aws:lambda:${region}:${accountId}:function:${FunctionName}:${stage}`;
      }
    });
  }
}

module.exports = ServerlessPlugin;
