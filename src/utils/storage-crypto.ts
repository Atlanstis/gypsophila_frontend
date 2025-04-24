import forge from 'node-forge';

/**
 * 使用AES-CBC模式对称加密数据
 * @param data 需要加密的数据
 * @param key 加密密钥(必须是16字节的字符串)
 * @returns Base64编码的加密数据
 */
export function aesEncrypt(data: unknown, key: string): string {
  // 使用UTF-8编码数据
  const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
  const dataBytes = forge.util.encodeUtf8(dataStr);

  // 生成随机IV (初始化向量)
  const iv = forge.random.getBytesSync(16);

  // 创建密码
  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(dataBytes));
  cipher.finish();

  // 获取加密结果
  const encrypted = cipher.output.getBytes();

  // 将IV与加密数据拼接在一起，并进行Base64编码
  return forge.util.encode64(iv + encrypted);
}

/**
 * 使用AES-CBC模式对称解密数据
 * @param encryptedData Base64编码的加密数据
 * @param key 解密密钥(必须是16字节的字符串)
 * @returns 解密后的数据
 */
export function aesDecrypt<T = unknown>(encryptedData: string, key: string): T {
  try {
    // Base64解码
    const encryptedBytes = forge.util.decode64(encryptedData);

    // 从加密数据中提取IV (前16字节)
    const iv = encryptedBytes.substring(0, 16);
    const data = encryptedBytes.substring(16);

    // 创建解密器
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv });
    decipher.update(forge.util.createBuffer(data));
    const result = decipher.finish();

    // 如果解密失败，抛出错误
    if (!result) {
      throw new Error('解密失败，可能是密钥错误');
    }

    // 解码UTF-8并解析JSON
    const decrypted = forge.util.decodeUtf8(decipher.output.getBytes());
    return JSON.parse(decrypted) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`解密失败: ${error.message}`);
    }
    throw new Error('解密失败');
  }
}
