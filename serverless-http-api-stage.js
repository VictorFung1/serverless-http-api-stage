const bPromise = require('bluebird');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = { 'after:package:packageService': () => bPromise.bind(this).then(this.afterPackageResources) };
  }

  options() {
    const stage = this.opts.stage || this.serverless.service.provider.stage;
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;
    return { stage, template };
  }

  afterPackageResources() {
    const { stage, template } = this.options();

    Object.keys(template.Resources).forEach((key) => {
      const type = template.Resources[key].Type;
      if (type === 'AWS::ApiGatewayV2::Stage') {
        template.Resources[key].Properties = {
          ...template.Resources[key].Properties,
          ...{ StageName: stage || '$default' }
        };
      }

      if (type === 'AWS::ApiGatewayV2::Integration') {
        const func = template.Resources[key].IntegrationUri['Fn::GetAtt'][0];
        const { Properties } = template.Resources[func];
        const { FunctionName, Environment } = Properties;
        const { REGION, ACCOUNT_ID } = Environment;
        template.Resources[key].Properties.IntegrationUri = `arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:${FunctionName}:${stage}`;
      }
    });
  }
}

module.exports = ServerlessPlugin;
