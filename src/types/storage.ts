/**
 * 存储类型，用于类型安全
 */
export type StorageTyped = {
  /** 认证 token */
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

/**
 * 存储选项
 */
export interface StorageOptions {
  /**
   * 存储类型
   */
  type?: 'localStorage' | 'sessionStorage';

  /**
   * 是否加密
   */
  encrypt?: boolean;

  /**
   * 加密密钥 (AES-CBC 模式需要)
   */
  secretKey?: string;

  /**
   * 过期时间(毫秒)
   */
  expire?: number | null;
}

/**
 * 存储项
 */
export interface StorageItem<T> {
  /**
   * 存储的值
   */
  value: T;

  /**
   * 创建时间
   */
  createTime: number;

  /**
   * 过期时间(毫秒)，为null则永不过期
   */
  expire: number | null;
}

/**
 * 存储键类型
 */
export type StorageKey = string;
