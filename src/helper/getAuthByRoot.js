
// getAuthByRoot.js
// 此模块输出一个纯函数
// 根据preprocess返回的root数据结构，计算auth

import { QueryFeatureCode } from './constants';

function getAuthByRoot(root) {

  var auth = [];

  var fn = function (n) {

    if (n.children.length === 0) {

      if (!n.featureArray.some(x => x.checked)) return;

      var hasFeature = [];
      n.featureArray.forEach(x => {
        if (x.checked && x.code !== QueryFeatureCode) {
          hasFeature.push(x.code)
        }
      });

      auth.push({
        menuId: n.id,
        hasFeature: hasFeature.join(',')
      })

      return;
    }

    for (var i = 0; i < n.children.length; i++) {
      fn(n.children[i]);
    }
  }

  fn(root);

  return auth; 

}

export default getAuthByRoot;