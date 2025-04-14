import { presetWind3 } from '@unocss/preset-wind3';
import { defineConfig, presetAttributify } from 'unocss';

/**
 * 查看更多：https://unocss.nodejs.cn/
 */
export default defineConfig({
  presets: [presetWind3(), presetAttributify()],
});
