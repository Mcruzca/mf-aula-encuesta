const { withNativeFederation } = require('@softarc/native-federation/build');
module.exports = withNativeFederation({
 name: 'encuesta',
 exposes: { './Widget': './src/widget.js' },
 shared: {} // No necesita Angular.
});