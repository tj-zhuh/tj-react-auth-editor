
// 预处理数据

// 输入参数如下
// allFeatures：全部功能点
// allMenus：全部菜单
// auth：权限信息
// 以上三个参数的详细数据类型描述，可以参考README.md中的描述

// 输出一棵树，返回树的根节点
// 树的每个节点包含以下字段
// 菜单Id        menuId 
// 菜单名        menuName       
// 层级          level             
// 孩子          children
// 父亲          parent
// 高度          height
// 是否选中      checked
// 功能点        featureArray      <-- 对象数组，每一项表示一个功能点  该数组是包含query功能点的
// ---- 功能编码 code 
// ---- 功能名称 name
// ---- 是否选中 checked

// 在此方法中，将进行以下的工作
// 1. 将数组格式的菜单转化为树形格式
// 2. 计算高度（高度=节点及其所有后代节点的总个数）
// 3. 计算节点是否选中（如果节点的父亲选中，那么节点也是选中的；如果节点的所有孩子选中，那么节点也是选中的）
// 4. 为菜单节点添加featureArray字段，该字段类型是对象数组，对象的格式为{code,name,checked}
// 5. featureArray中添加默认的query功能点


import arr2tree from 'tj-arr2tree';

import { QueryFeatureCode } from './constants';

// 后台返回的菜单数组中，各个字段名
const F_MenuId = 'identity';
const F_MenuName = 'name';
const F_Folder = "folder";
const F_ParentId = 'parentId';
const F_Feature = 'features';

// 后台返回的权限数据数组中，各个字段名
const F_AuthMenuId = 'menuId';
const F_AuthFeature = 'hasFeature';

// 常量：约定的根节点的编码
const RootId = "0";
 

function preprocess(allFeatures, allMenus, auth) {

  // 将数组转化为树
  var root = arr2tree(allMenus, F_MenuId, F_ParentId, RootId);

  // 获得节点的权限信息
  var getNodeAuth = function (id) {
    for (var i = 0; i < auth.length; i++) {
      if (auth[i][F_AuthMenuId] === id) {
        var a = auth[i][F_AuthFeature];
        return a ? a.split(',') : [];
      }
    }
    return null;
  }

  // 遍历树，进行以下几项操作  
  // 1. 计算height字段
  // 2. 计算checked字段
  // 3. 计算featureArray字段
  var traversal = function (node) {

    if (node.origin) {
      node.name = node.origin[F_MenuName];
    }
    node.height = 1;

    var nodeAuth = getNodeAuth(node.id);

    node.featureArray = [{
      code: QueryFeatureCode,
      name: '查询',
      checked: !!nodeAuth
    }];

    var nodeFeature = (node.origin && node.origin[F_Feature]) ? node.origin[F_Feature].split(',') : [];
    for (var i = 0; i < nodeFeature.length; i++) {
      var f = allFeatures.find(x => x.code === nodeFeature[i]);
      node.featureArray.push({
        code: nodeFeature[i],
        name: f ? f.name : nodeFeature[i],
        checked: nodeAuth && nodeAuth.some(x => x === nodeFeature[i])
      })
    }

    node.checked = !node.featureArray.some(x => x.checked === false);

    if (node.parent && node.parent.checked) {
      node.checked = true;
    }

    if (node.checked) {
      node.featureArray.forEach(x => x.checked = true);
    }

    for (var i = 0; i < node.children.length; i++) {
      traversal(node.children[i]);
      node.height += node.children[i].height;
    }
  }

  traversal(root);

  let allDescendantsIsChecked = function (n) {
    let flag = true;
    if (n.children.length == 0) {
      return n.checked;
    }
    for (var i = 0; i < n.children.length; i++) {
      if (!allDescendantsIsChecked(n.children[i])) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  let setCheck = function (n) {
    if (!n.checked) {
      n.checked = allDescendantsIsChecked(n);
    }

    for (var i = 0; i < n.children.length; i++) {
      setCheck(n.children[i]);
    }
  }

  setCheck(root);


  // 返回树根
  return root;

}

export default preprocess;