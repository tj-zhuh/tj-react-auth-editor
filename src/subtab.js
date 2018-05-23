
// subtab.js
// 描述一个tab标签里的内容

import React from 'react'; 

import SubTree from './subtree';

import allocate from './helper/allocate.js';

class SubTab extends React.Component {

  render() {

    const StackCount = 4;

    const { root, subroot, onAuthChange } = this.props;

    let stacks = allocate(subroot, StackCount); 

    return (
      <dl className="treebox">
        {
          stacks.map(function (stack, stackIndex) {
            return (
              <dd key={stackIndex}>
                <ul>
                  {
                    stack.map((subTreeRoot, subTreeIndex) => {
                      return (
                        <SubTree
                          root={root}
                          subTreeRoot={subTreeRoot}
                          onAuthChange={onAuthChange}
                          key={subTreeIndex}
                        />
                      )
                    })
                  }
                </ul>
              </dd>
            )
          })
        }
      </dl>
    );

  }
}

export default SubTab;