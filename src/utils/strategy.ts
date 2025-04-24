/** 策略类型 */
export type IStrategyAction = [boolean, () => void];

/**
 * 执行策略
 * @param actions 策略数组，执行第一个为 true 的策略
 */
export function exeStrategyActions(actions: IStrategyAction[]) {
  actions.some(item => {
    const [flag, action] = item;
    if (flag) action();
    return flag;
  });
}
