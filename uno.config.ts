import { presetWind3 } from '@unocss/preset-wind3';
import { defineConfig, presetAttributify } from 'unocss';

/**
 * 查看更多：https://unocss.nodejs.cn/
 */
export default defineConfig({
  presets: [presetWind3(), presetAttributify()],

  shortcuts: {
    'flex-col': 'flex flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-center': 'flex items-center justify-center',
    'flex-1-hidden': 'flex-1 overflow-hidden',
    'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
    'text-ellipsis': 'nowrap-hidden text-ellipsis',
  },
});
