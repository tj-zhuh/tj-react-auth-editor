
// 此模块提供一个纯函数divide
// 该方法将整个权限树按照一级菜单进行划分
// 划分出的每一块形成一个tab标签

// 输入值：preprecess返回的root
// 输出值：数组
// 数组的每一项是root.children中的一项，是一个子树


function divide(root) {

  let arr = [];

  if (!root || !root.children) return arr;

  root.children.forEach(x => {
    arr.push(x);
  })

}