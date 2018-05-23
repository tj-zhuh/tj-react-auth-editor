import React from 'react'; 
import Tab, { TabItem } from 'tj-react-tab';

import SubTab from './subtab.js';

import preprocess from './helper/preprocess.js';

class AuthEditor extends React.Component {

  render() {

    const {
      allFeatures,
      allMenus,
      auth,
      selectedTabIndex,
      onTabChange,
      onAuthChange
    } = this.props;

    // 分为几列显示
    const StackCount = 4;

    if (!allFeatures || !allMenus || !auth) return null;

    // 预处理数据，计算整个权限树
    let root = preprocess(allFeatures, allMenus, auth);

    // 如果预处理失败，返回空
    if (!root || !root.children) return null;

    return (
      <div className="tj-react-auth-editor">
        <Tab
          selectedIndex={selectedTabIndex}
          onChange={onTabChange}
        >
          {
            root.children.map((item, index) => {
              return (
                <TabItem header={item.name} key={index}>
                  <SubTab
                    root={root}
                    subroot={item}
                    onAuthChange={onAuthChange}                    
                  />                 
                </TabItem>
              );
            })
          }
        </Tab>
      </div>
    )
  }
}

export default AuthEditor;