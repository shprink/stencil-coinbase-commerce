import { Config } from '@stencil/core';
import versionInjector from 'rollup-plugin-version-injector';

export const config: Config = {
  namespace: 'stencil-coinbase-commerce',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [versionInjector()],
};
