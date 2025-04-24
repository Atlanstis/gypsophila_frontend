/**
 * 存储配置
 */
export const storageConfig = {
  /**
   * 存储类型: 'localStorage' | 'sessionStorage'
   */
  type: import.meta.env.VITE_STORAGE_TYPE || 'localStorage',

  /**
   * 存储前缀
   */
  prefix: import.meta.env.VITE_STORAGE_PREFIX || 'gypsophila_',

  /**
   * 是否默认加密存储数据
   */
  encrypt: import.meta.env.VITE_STORAGE_ENCRYPT === 'true',

  /**
   * 默认加密密钥
   */
  secretKey: import.meta.env.VITE_STORAGE_SECRET_KEY || 'Gyps0ph1l@K3y123',

  /**
   * 是否默认启用过期时间
   */
  expireEnabled: import.meta.env.VITE_STORAGE_EXPIRE_ENABLED === 'true',

  /**
   * 默认过期时间(秒)
   */
  expireSeconds: Number(import.meta.env.VITE_STORAGE_EXPIRE_SECONDS) || 604800, // 默认7天 = 7*24*60*60 = 604800秒

  /**
   * 默认过期时间(毫秒)，用于实际存储
   */
  get defaultExpire() {
    return this.expireSeconds * 1000;
  },
};
