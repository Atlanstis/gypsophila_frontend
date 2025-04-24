import { ref } from 'vue';

/**
 * 布尔值
 * @param initialValue - 初始值
 * @returns 布尔值
 */
export function useBoolean(initialValue = false) {
  const bool = ref(initialValue);

  function setBool(val: boolean) {
    bool.value = val;
  }

  function setTrue() {
    setBool(true);
  }

  function setFalse() {
    setBool(false);
  }
  function toggle() {
    setBool(!bool.value);
  }

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  };
}
