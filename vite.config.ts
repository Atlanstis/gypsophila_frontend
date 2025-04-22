import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
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
