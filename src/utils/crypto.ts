import forge from 'node-forge';

interface RsaEncryptOptions {
  /**
   * 哈希算法，默认为 sha256
   */
  hashAlgorithm?: 'sha1' | 'sha256' | 'sha512';
}

/**
 * 使用RSA-OAEP算法加密数据
 * @param data - 需要加密的数据（对象会被自动转为JSON字符串）
 * @param publicKeyPem - PEM格式的RSA公钥
 * @param options - 加密选项
 * @returns Base64编码的加密数据
 */
export function rsaEncrypt(
  data: unknown,
  publicKeyPem: string,
  options: RsaEncryptOptions = {},
): string {
  const { hashAlgorithm = 'sha256' } = options;

  try {
    // 如果输入是对象，则转换为JSON字符串
    const dataStr = typeof data === 'string' ? data : JSON.stringify(data);

    // 创建RSA公钥对象
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

    // 将数据编码为UTF-8
    const buffer = forge.util.encodeUtf8(dataStr);

    // 使用RSA-OAEP加密
    const encrypted = publicKey.encrypt(buffer, 'RSA-OAEP', {
      md: forge.md[hashAlgorithm].create(),
      mgf1: {
        md: forge.md[hashAlgorithm].create(),
      },
    });

    // 将加密结果转换为Base64编码
    return forge.util.encode64(encrypted);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`RSA加密失败: ${error.message}`);
    }
    throw new Error('RSA加密失败');
  }
}
