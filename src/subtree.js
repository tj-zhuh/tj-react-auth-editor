
// subtree.js
// 描述一颗子树

import React from 'react'; 

import checked from './img/checkbox-checked.png';
import unchecked from './img/checkbox.png';
import checked_disabled from './img/checkbox-checked-disabled.png';
import unchecked_disabled from './img/checkbox-disabled.png';

import getNextAuth from './helper/getNextAuth.js';

class SubTree extends React.Component {

  render() {

    const { root, subTreeRoot, onAuthChange } = this.props;

    let imgSrc = subTreeRoot.checked ? checked : unchecked;
    let clsNodeLi = 'menu-node level' + subTreeRoot.level;
    let elementFeature = null;

    if (subTreeRoot.children.length === 0 && subTreeRoot.featureArray.length >= 2) {
      elementFeature = (
        <ul className="features">
          {
            subTreeRoot.featureArray.map(function (item, index) {
              let featureImgSrc = item.checked ? checked : unchecked;
              let clsFeatureLi = 'feature-node' + (item.checked ? ' checked' : ' unchecked');
              return (
                <li
                  className={clsFeatureLi}
                  key={index}
                  onClick={() => {
                    let nextAuth = getNextAuth(root, subTreeRoot, item.code);
                    if (typeof onAuthChange === 'function') {
                      onAuthChange(nextAuth);
                    }                    
                  }}
                >
                  {item.name}
                </li>
              );
            })
          }
        </ul>
      );
    }

    return (
      <li className={clsNodeLi}>
        <span onClick={() => {
          let nextAuth = getNextAuth(root, subTreeRoot);
          if (typeof onAuthChange === 'function') {
            onAuthChange(nextAuth);
          }                    
        }}>
          <img src={imgSrc} alt='选中' />
          {subTreeRoot.name}
        </span>
        {elementFeature}
        <ul className="menu-children">
          {
            subTreeRoot.children.map(function (child, index) {
              return (
                <SubTree
                  root={root}
                  subTreeRoot={child}
                  onAuthChange={onAuthChange}
                  key={index}
                />
              );
            })
          }
        </ul>
      </li>
    );
  }
}

export default SubTree;