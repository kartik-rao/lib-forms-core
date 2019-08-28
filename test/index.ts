const testsContext = require.context("./models", true, /\/spec.*.ts$/);
console.log("<< Karma Spec List >>", testsContext.keys());
testsContext.keys().forEach(testsContext);