import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import UnoCSS from 'unocss/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    Components({
      // 配置组件自动导入的目录
      dirs: ['src/components'],
      // 组件的有效文件扩展名
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/types/components.d.ts',
      // 配置组件自动导入的类型
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      // 添加 Naive UI 解析器
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
