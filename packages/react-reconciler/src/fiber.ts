import { Key, Props, Ref } from 'share/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
    type: any;
    tag: WorkTag;
    key: Key;
    stateNode: any;
    ref: Ref | null;

    return: FiberNode | null;
    sibling: FiberNode | null;
    child: FiberNode | null;
    index: number;

    pendingProps: Props;
    memoizedProps: Props | null;
    alternate: FiberNode | null;
    flags: Flags;
    constructor(tag: WorkTag, pendingProps: Props, key: Key) {
        /**
         * 静态数据结构的属性,实例属性
         */
        this.tag = tag;
        this.key = key;
        // fiberNode的类型
        this.type = null;
        /**
         * 如果这是个HostComponent <div>那么这个属性存放的是div这个dom
         * 对于HostRootFiber，这个属性就是FiberRootNode
         */
        this.stateNode = null;
        this.ref = null;

        /**
         * 形成树状结构
         */
        // 指向父fiberNode
        this.return = null;
        // 指向兄弟fiberNode
        this.sibling = null;
        // 指向子fiberNode
        this.child = null;
        // 同级的FiberNode的索引
        this.index = 0;

        /**
         * 工作单元
         */
        // 工作单元初始的props
        this.pendingProps = pendingProps;
        // 工作单元工作完成之后的props，确定的props
        this.memoizedProps = null;
        //
        // this.memoizedState = null;
        // this.updateQueue = null;
        // 用于在current和workinprogress两棵树的切换
        this.alternate = null;
        // 副作用
        this.flags = NoFlags;
        // this.subtreeFlags = NoFlags;
        // this.deletions = null;
    }
}
