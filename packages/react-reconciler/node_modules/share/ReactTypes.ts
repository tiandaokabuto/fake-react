export type ElementType = any;
export type Props = any;
export type Key = any;
export type Ref = any;

export interface ReactElementType {
    /**
     * 用来标识当前对象是一个ReactElement
     * 需要通过symbol来保证唯一性
     */
    $$typeof: symbol | number;
    type: ElementType;
    props: Props;
    key: Key;
    ref: Ref;
    /**
     * 自定义字段，实际上react项目中并不存在
     */
    __mark: any;
}
