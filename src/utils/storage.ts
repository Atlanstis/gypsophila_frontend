import { storageConfig } from '@/config/storage';
import type { StorageItem, StorageKey, StorageOptions, StorageTyped } from '@/types/storage';

import { aesDecrypt, aesEncrypt } from './storage-crypto';

/**
 * 本地存储服务实现
 */
class LocalStorageService {
  /**
   * 获取完整的键名（添加前缀）
   * @param key 原始键名
   * @returns 添加前缀后的键名
   */
  private getFullKey(key: StorageKey): string {
    return `${storageConfig.prefix}${key}`;
  }

  /**
   * 获取存储对象（localStorage 或 sessionStorage）
   * @param type 存储类型
   * @returns Storage对象
   */
  private getStorage(type?: 'localStorage' | 'sessionStorage'): Storage {
    const storageType = type || storageConfig.type;
    return storageType === 'localStorage' ? localStorage : sessionStorage;
  }

  /**
   * 判断存储项是否过期
   * @param item 存储项
   * @returns 是否过期
   */
  private isExpired(item: StorageItem<unknown>): boolean {
    if (item.expire === null) return false;
    return Date.now() > item.createTime + item.expire;
  }

  /**
   * 设置存储项
   * @param key 键名
   * @param value 值
   * @param options 选项
   */
  public set<T>(key: StorageKey, value: T, options: StorageOptions = {}): void {
    const fullKey = this.getFullKey(key);
    const storage = this.getStorage(options.type);

    // 创建存储项
    const item: StorageItem<T> = {
      value,
      createTime: Date.now(),
      expire:
        options.expire !== undefined
          ? options.expire
          : storageConfig.expireEnabled
            ? storageConfig.defaultExpire
            : null,
    };

    let dataToStore: string;

    // 判断是否需要加密
    const shouldEncrypt = options.encrypt !== undefined ? options.encrypt : storageConfig.encrypt;
    if (shouldEncrypt) {
      const secretKey = options.secretKey || storageConfig.secretKey;
      dataToStore = aesEncrypt(item, secretKey);
    } else {
      dataToStore = JSON.stringify(item);
    }

    // 存储到本地
    storage.setItem(fullKey, dataToStore);
  }

  /**
   * 设置存储项(类型安全)
   * @param key 键名
   * @param value 值
   * @param options 选项
   */
  public setTyped<T extends keyof StorageTyped, K extends StorageTyped[T]>(
    key: T,
    value: K,
    options: StorageOptions = {},
  ): void {
    this.set(key, value, options);
  }

  /**
   * 获取存储项
   * @param key 键名
   * @param defaultValue 默认值，当不存在或已过期时返回
   * @param options 选项
   * @returns 存储的值或默认值
   */
  public get<T>(key: StorageKey, defaultValue?: T, options: StorageOptions = {}): T | undefined {
    const fullKey = this.getFullKey(key);
    const storage = this.getStorage(options.type);

    const data = storage.getItem(fullKey);
    if (!data) return defaultValue;

    try {
      let item: StorageItem<T>;

      // 判断是否需要解密
      const shouldEncrypt = options.encrypt !== undefined ? options.encrypt : storageConfig.encrypt;
      if (shouldEncrypt) {
        const secretKey = options.secretKey || storageConfig.secretKey;
        item = aesDecrypt<StorageItem<T>>(data, secretKey);
      } else {
        item = JSON.parse(data) as StorageItem<T>;
      }

      // 检查是否过期
      if (this.isExpired(item)) {
        this.remove(key);
        return defaultValue;
      }

      return item.value;
    } catch (error) {
      console.error('获取存储项失败:', error);
      return defaultValue;
    }
  }

  /**
   * 获取存储项(类型安全)
   * @param key 键名
   * @param defaultValue 默认值
   * @param options 选项
   * @returns 存储的值或默认值
   */
  public getTyped<T extends keyof StorageTyped, K extends StorageTyped[T]>(
    key: T,
    defaultValue: K,
    options: StorageOptions = {},
  ): StorageTyped[T] | undefined {
    return this.get(key, defaultValue, options);
  }

  /**
   * 移除存储项
   * @param key 键名
   */
  public remove(key: StorageKey): void {
    const fullKey = this.getFullKey(key);
    localStorage.removeItem(fullKey);
    sessionStorage.removeItem(fullKey);
  }

  /**
   * 清空存储项(仅清除本应用前缀的项)
   */
  public clear(): void {
    const prefix = storageConfig.prefix;

    // 清除localStorage中的项
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });

    // 清除sessionStorage中的项
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith(prefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }

  /**
   * 判断存储项是否存在
   * @param key 键名
   * @returns 是否存在
   */
  public has(key: StorageKey): boolean {
    const fullKey = this.getFullKey(key);
    return localStorage.getItem(fullKey) !== null || sessionStorage.getItem(fullKey) !== null;
  }
}

// 导出存储服务实例
export const storageService = new LocalStorageService();
