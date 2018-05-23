
// 将所有菜单合适的分为若干组，以便分为几列显示

// 输入参数
// root：树根
// number：要分为几列

// 输出一个二维数组
// 第一维描述所划分的每一列
// 第二维描述该列中的所有子树

function allocate(root, number) {
  var stacks = [];
  for (let i = 0; i < number; i++) {
    stacks.push([]);
  }

  if (!root.children || !root.children.length) {
    stacks[0].push(root);
    return stacks;
  }

  function findProperStackIndex() {
    var index = -1;
    var minHeight = 9999;

    for (let i = 0; i < number; i++) {
      var height = 0;
      var stack = stacks[i];
      for (let j = 0; j < stack.length; j++) {
        height += stack[j].height;
      }
      if (height < minHeight) {
        minHeight = height;
        index = i;
      }
    }

    return index;
  }

  for (var i = 0; i < root.children.length; i++) {
    var index = findProperStackIndex();
    stacks[index].push(root.children[i]);
  }

  return stacks;
}

export default allocate;