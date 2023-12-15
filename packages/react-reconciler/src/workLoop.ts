import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null;

/**
 * 初始化，让workinprogress指向需要遍历的第一个fiberNode
 */
function prepareFreshStack(fiberNode: FiberNode) {
    workInProgress = fiberNode;
}

function renderRoot(root: FiberNode) {
    //初始化
    prepareFreshStack(root);
    // 开始递归
    do {
        try {
            workLoop();
            break;
        } catch (e) {
            console.warn('发生错误:', e);
            workInProgress = null;
        }
    } while (true);
}

function workLoop() {
    while (workInProgress !== null) {
        performUnitOfWork(workInProgress);
    }
}

function performUnitOfWork(fiber: FiberNode) {
    // next是子fiber，值可能是fiberNode或者null
    const next: FiberNode | null = beginWork(fiber);
    // 工作完成，props已经确定
    fiber.memoizedProps = fiber.pendingProps;

    if (next === null) {
        // 没有子fiber，开始归，遍历兄弟节点
        completeUnitOfWork(fiber);
    } else {
        // 有子节点，继续往下遍历
        workInProgress = next;
    }
}

function completeUnitOfWork(fiber: FiberNode) {
    let node: FiberNode | null = fiber;
    do {
        completeWork(node);
        const sibling = node.sibling;
        if (sibling !== null) {
            workInProgress = sibling;
            return;
        }
        // 兄弟节点已经遍历完，继续往上
        node = node.return;
        workInProgress = node;
    } while (node !== null);
}
