
export let allFeatures = [{
  name: '添加',
  code: 'add'
}, {
  name: '修改',
  code: 'edit'
}, {
  name: '删除',
  code: 'delete'
}];

export let allMenus = [{
  identity: '2',
  name: '生产计划',
  folder: 'plan',
  parentId: '0'
}, {
  identity: '2-1',
  name: '计划查询',
  folder: 'query',
  parentId: '2'
}, {
  identity: '2-2',
  name: '计划管理',
  folder: 'manage',
  parentId: '2'
}, {
  identity: '2-2-1',
  name: '年计划管理',
  folder: 'year',
  parentId: '2-2',
  features: 'add,edit,delete'
}, {
  identity: '2-2-2',
  name: '月计划管理',
  folder: 'month',
  parentId: '2-2',
  features: 'add,edit,delete'
}, {
  identity: '2-2-3',
  name: '日计划管理',
  folder: 'day',
  parentId: '2-2',
  features: 'add,edit,delete'
}, {
  identity: '2-3',
  name: '计划审批',
  folder: 'check',
  parentId: '2',
  features: 'edit'
}, {
  identity: '3',
  name: '生产调度',
  folder: 'schedule',
  parentId: '0'
}, {
  identity: '3-1',
  name: '调度日志管理',
  folder: 'log',
  parentId: '3',
  features: 'delete'
}, {
  identity: '1',
  name: '智能看板',
  folder: 'panel',
  parentId: '0'
}];

export let auth = [{
  menuId: '1',
  hasFeature: ''
}, {
  menuId: '2-2-2',
  hasFeature: 'add'
}, {
  menuId: '2-2-3',
  hasFeature: 'add,delete'
}];