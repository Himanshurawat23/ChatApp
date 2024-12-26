import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',  // Alias for your source directory
      'shadcn-ui': 'path/to/shadcn-ui/dist',  // Alias for ShadCN UI
    },
  },
});
