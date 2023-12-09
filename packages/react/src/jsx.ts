import { REACT_ELEMENT_TYPE } from 'share/ReactSymbols';
import {
    ElementType,
    Props,
    Key,
    Ref,
    ReactElementType,
} from 'share/ReactTypes';

const ReactElement = (
    type: ElementType,
    key: Key,
    ref: Ref,
    props: Props
): ReactElementType => {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE, // 与宿主环境无关的数据结构
        type,
        key,
        ref,
        props,
        __mark: 'JJ',
    };
    return element;
};

export const jsx = (
    type: ElementType,
    config: any,
    ...maybeChildren: any
): ReactElementType => {
    const props: Props = {};

    let key: Key = null;
    let ref: Ref = null;

    // 对config进行处理
    for (const name in config) {
        const val = config[name];
        // 筛选出key和ref属性
        if (name === 'key') {
            if (val !== undefined) {
                key = val + '';
            }
        } else if (name === 'ref') {
            if (val !== undefined) {
                ref = val + '';
            }
        } else if ({}.hasOwnProperty.call(config, name)) {
            // 排除掉原型链上的属性
            props[name] = val;
        }
    }

    // 对maybeChildren处理
    const maybeChildrenLength = maybeChildren.length;
    if (maybeChildrenLength === 1) {
        props.children = maybeChildren[0];
    } else if (maybeChildrenLength > 1) {
        props.children = maybeChildren;
    }

    return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
