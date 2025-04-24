/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 存储类型: 'localStorage' | 'sessionStorage'
   */
  readonly VITE_STORAGE_TYPE: 'localStorage' | 'sessionStorage';

  /**
   * 存储前缀
   */
  readonly VITE_STORAGE_PREFIX: string;

  /**
   * 是否默认加密存储数据
   */
  readonly VITE_STORAGE_ENCRYPT: string;

  /**
   * 默认加密密钥 (AES-CBC 模式需要)
   */
  readonly VITE_STORAGE_SECRET_KEY: string;

  /**
   * 是否默认启用过期时间
   */
  readonly VITE_STORAGE_EXPIRE_ENABLED: string;

  /**
   * 默认过期时间(秒)
   */
  readonly VITE_STORAGE_EXPIRE_SECONDS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
