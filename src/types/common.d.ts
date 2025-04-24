/** 通用类型 */
declare namespace Common {
  /** 异步组件 */
  type AsyncComponent = () => Promise<{ default: import('vue-router').RouteComponent }>;

  /** 组件/异步组件 */
  type Component = import('vue-router').RouteComponent | AsyncComponent;
}
