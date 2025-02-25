import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'module',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      css: '/src/assets/css',
      components: '/src/components',
      utils: '/src/utils',
      pages: '/src/pages',
    },
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      //代理实现跨域
      '^/api': {
        target: 'http://localhost:3001',
        changeOrigin: true, //开启代理
      },
    },
  },
  esbuild: {
    pure: ['console.log'], //只删除console.log
    drop: ['debugger'],
  },
  build: {
    rollupOptions: {
      plugins: [visualizer({ open: true })], //打包分析器
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
    },
  },
})
