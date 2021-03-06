# tj-react-auth-editor
权限配置react组件











## 属性

### allFeatures

描述全部功能点列表，类型为数组。

数组的每一项是对象，表示一个功能点，包含以下字段：

| 字段名  | 数据类型   | 含义    |
| ---- | ------ | ----- |
| code | string | 功能点编码 |
| name | string | 功能点名称 |

​	

## allMenus

描述全部菜单数据，类型为数组。

数组的每一项是对象，表示一个菜单，包含以下字段：

| 字段名      | 数据类型   | 含义                                       |
| -------- | ------ | ---------------------------------------- |
| identity | string | 菜单Id                                     |
| name     | string | 菜单的名字                                    |
| parentId | string | 菜单的父亲的Id                                 |
| features | string | 描述菜单中包含的功能点，以逗号分隔功能点编码，例如`add,edit,delete`。注意，这里不包含`查询`功能，这是因为所有的页面默认拥有`查询`功能点。 |

​	

## auth

描述当前权限信息，类型为数组。

数组的每一项是对象，表示角色在某个页面的授权情况，包含以下字段：

| 字段名        | 数据类型   | 含义                                       |
| ---------- | ------ | ---------------------------------------- |
| menuId     | string | 菜单Id                                     |
| hasFeature | string | 描述角色在菜单页面中拥有的功能，以逗号分隔功能点编码，例如`add,edit`。注意，这里不包含`查询`功能。 |



## onChange

事件处理函数，当用户修改授权时触发事件。

函数的参数列表如下：

| 参数名      | 数据类型  | 含义         |
| -------- | ----- | ---------- |
| nextAuth | array | 描述修改后的权限信息 |