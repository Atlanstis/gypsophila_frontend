import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    /** 自动导入API
     *  https://github.com/unplugin/unplugin-auto-import
     */
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@vueuse/core': ['useColorMode'],
        },
      ],
      dts: 'src/types/auto-imports.d.ts',
      // 自动导入目录下的模块
      dirs: ['src/composables/**', 'src/utils/**'],
      vueTemplate: true, // 是否在 Vue 模板中自动导入
    }),
    /** 自动导入组件
     *  https://github.com/unplugin/unplugin-vue-components
     */
    Components({
      // 配置组件自动导入的目录
      dirs: ['src/components'],
      // 组件的有效文件扩展名
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/types/components.d.ts',
      // 配置组件自动导入的类型
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
