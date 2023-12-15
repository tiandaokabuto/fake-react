export type Flags = number;

export const NoFlags = 0b0000000; // 无标记
export const Placement = 0b0000001; // 插入标记
export const Update = 0b0000010; // 更新属性
export const ChildDeletion = 0b0000100; // 删除子节点
