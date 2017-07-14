const noop = () => {};
const isEmpty = arr => !arr || arr.length === 0;
const last = arr => arr[arr.length - 1];

function deepWalk(root, func) {
  if (!root) { return; }
  let stack = [ root ];
  let item;
  while (stack.length) {
    item = stack.shift();
    if (func(item) === true) {
      break;
    }
    // 如果该节点有子节点，继续添加进入栈顶
    if (item.children && item.children.length) {
      stack = item.children.concat(stack);
    }
  }
}

function getIndex(node, parent) {
  return parent && parent.children ? parent.children.indexOf(node) : null;
}

function deepV2(root, { process = noop, enter = noop, leave = noop }) {
  if (!root) { return; }
  let stack = [ root ];
  const visitied = [];
  let item;
  let level = 0;
  while (stack.length) {
    item = stack.shift();
    const parent = last(visitied);
    enter(item, level, parent);
    if (process(item, level, parent, getIndex(item, parent)) === true) {
      break;
    }
    visitied.push(item);
    if (isEmpty(item.children)) {
      let popItem = visitied.pop();
      const parent = last(visitied);
      leave(popItem, level, parent, getIndex(popItem, parent));
      while (visitied.length) {
        const lastVisited = last(visitied);
        if (lastVisited && popItem === last(lastVisited.children)) {
          popItem = lastVisited;
          visitied.pop();
          level--;
          const parent = last(visitied);
          leave(lastVisited, level, parent, getIndex(lastVisited, parent));
        } else {
          break;
        }
      }
    }
    const children = item.children;
    // 如果该节点有子节点，继续添加进入栈顶
    if (!isEmpty(children)) {
      level++;
      stack = children.concat(stack);
    }
  }
  while (visitied.length) {
    level--;
    const item = visitied.pop();
    const parent = last(visitied);
    leave(item, level, parent, getIndex(item, parent));
  }
}


export default {
  deep: deepV2,
  deepV1: deepWalk,
};

