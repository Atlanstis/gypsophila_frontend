import type { StorageKey, StorageOptions, StorageTyped } from '@/types/storage';

/**
 * 使用本地存储的组合式函数
 * @param key 存储键名
 * @param initialValue 初始值
 * @param options 存储选项
 * @returns 响应式存储值与操作方法
 */
export function useStorage<T>(key: StorageKey, initialValue: T, options: StorageOptions = {}) {
  // 创建响应式的值
  const storedValue = ref<T>(initialValue);

  // 尝试从存储中获取值
  const savedValue = storageService.get<T>(key, undefined, options);

  // 如果存储中存在值，则使用存储的值，否则使用初始值
  if (savedValue !== undefined) {
    storedValue.value = savedValue;
  }

  // 如果存储中不存在值，且提供了初始值，则保存初始值
  if (savedValue === undefined) {
    storageService.set(key, initialValue, options);
  }

  // 侦听值的变化，自动保存到存储中
  watch(
    storedValue,
    newValue => {
      if (newValue === undefined) {
        storageService.remove(key);
      } else {
        storageService.set(key, newValue, options);
      }
    },
    { deep: true },
  );

  /**
   * 重置为初始值
   */
  function resetToInitial() {
    storedValue.value = initialValue;
  }

  /**
   * 清除存储值
   */
  function clearValue() {
    storageService.remove(key);
    storedValue.value = initialValue; // 清除后恢复为初始值
  }

  /**
   * 检查存储值是否存在
   */
  function checkExists() {
    return storageService.has(key);
  }

  /**
   * 重新从存储中加载值
   */
  function reloadValue() {
    const savedValue = storageService.get<T>(key, initialValue, options);
    storedValue.value = savedValue;
    return savedValue;
  }

  return {
    value: storedValue,
    reset: resetToInitial,
    clear: clearValue,
    exists: checkExists,
    reload: reloadValue,
  };
}

/**
 * 使用类型安全的本地存储的组合式函数
 * @param key 存储键名（类型安全）
 * @param initialValue 初始值
 * @param options 存储选项
 * @returns 响应式存储值与操作方法
 */
export function useStorageTyped<T extends keyof StorageTyped, K extends StorageTyped[T]>(
  key: T,
  initialValue: K,
  options: StorageOptions = {},
) {
  const { value, reload, exists, reset, clear } = useStorage(key, initialValue, options);

  return {
    value,
    reset,
    clear,
    exists,
    reload,
  };
}

/**
 * 使用只读本地存储的组合式函数，适用于不需要修改的配置读取
 * @param key 存储键名
 * @param initialValue 初始值
 * @param options 存储选项
 * @returns 只读响应式存储值与操作方法
 */
export function useReadonlyStorage<T>(
  key: StorageKey,
  initialValue: T,
  options: StorageOptions = {},
) {
  const { value, reload, exists } = useStorage(key, initialValue, options);

  return {
    value: readonly(value),
    reload,
    exists,
  };
}

/**
 * 使用类型安全的只读本地存储的组合式函数
 * @param key 存储键名（类型安全）
 * @param initialValue 初始值
 * @param options 存储选项
 * @returns 只读响应式存储值与操作方法
 */
export function useReadonlyStorageTyped<T extends keyof StorageTyped, K extends StorageTyped[T]>(
  key: T,
  initialValue: K,
  options: StorageOptions = {},
) {
  const { value, reload, exists } = useStorageTyped(key, initialValue, options);

  return {
    value: readonly(value),
    reload,
    exists,
  };
}
