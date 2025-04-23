import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 class 名称
 * @param inputs - 需要合并的 class 名称
 * @returns 合并后的 class 名称
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
