
// getNextAuth.js
// 此模块输出一个纯函数
// 计算修改后的auth

// 输入
// root：preprocess函数返回的树根
// subTreeRoot：被点击的树节点
// featureCode：被点击的功能点code（如果该字段非空，说明点击的是功能点；反之，说明点击的是树节点）

// 输出
// 新的auth

import getAuthByRoot from './getAuthByRoot.js';

import { QueryFeatureCode } from './constants';

function getNextAuth(root, subTreeRoot, featureCode) {

  let changeDownward = function (n, checked) {
    n.checked = checked;
    n.children.forEach(x => changeDownward(x, n.checked));
    n.featureArray.forEach(x => x.checked = n.checked);
  }

  let changeUpward = function (n) {
    if (n.parent) {
      n.parent.checked = !n.parent.children.some(x => x.checked === false);
      changeUpward(n.parent);
    }
  } 

  if (featureCode) {
    for (let i = 0; i < subTreeRoot.featureArray.length; i++) {

      let item = subTreeRoot.featureArray[i];
      if (item.code === featureCode) {

        item.checked = !item.checked;

        if (featureCode === QueryFeatureCode) {
          if (item.checked === false) {
            subTreeRoot.featureArray.forEach(x => x.checked = false);
          }
        } else {
          let queryFeatureItem = subTreeRoot.featureArray.find(x => x.code === QueryFeatureCode);
          if (queryFeatureItem && !queryFeatureItem.checked) {
            queryFeatureItem.checked = subTreeRoot.featureArray.some(x => x.checked && x.code !== QueryFeatureCode);
          }
        }
      }
    }

    subTreeRoot.checked = !subTreeRoot.featureArray.some(x => x.checked === false);

    changeUpward(subTreeRoot);
  }
  else {
    subTreeRoot.checked = !subTreeRoot.checked;
    changeDownward(subTreeRoot, subTreeRoot.checked)
    changeUpward(subTreeRoot);
  }
  
  

  return getAuthByRoot(root);


}

export default getNextAuth;