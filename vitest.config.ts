import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  //一定要把viteConfig导入 该文件本身是覆盖vite.config文件而不是扩展
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setup.ts',
    },
  }),
)
