import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: '../api/openapi.yaml',
    },

    output: {
      mode: 'tags-split',

      target: './src/api/generated/endpoints.ts',

      schemas: './src/api/generated/models',

      client: 'react-query',

      httpClient: 'fetch',

      baseUrl: 'http://localhost:3000',
    },
  },
});