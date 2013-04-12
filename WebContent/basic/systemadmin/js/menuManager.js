/**
 * filename: menuManager.js description: 菜单管理 主要模块 1: 菜单管理主面板 2: 菜单窗口
 */

Ext.ns("techsupport.systemmanage");

if (!techsupport.systemmanage.MenuManager) {

	techsupport.systemmanage.MenuManager = Ext.extend(
			techsupport.systemmanage.UserManager, {
				addURL : context_path + '/sysadminDefault/add_menu.action',
				modifyURL : context_path
						+ '/sysadminDefault/modify_menu.action',
				queryURL : context_path
						+ '/sysadminDefault/querylist_menu.action',
				detailURL : context_path + '/sysadminDefault/query_menu.action',
				removeURL : context_path
						+ '/sysadminDefault/remove_menu.action',
				title_base : "菜单",
				treeLoaderUrl : context_path
						+ '/sysadminDefault/queryMenuTreeNode_menu.action',
				currentNodeId : "0",
				constructor : function(config) {
					config = Ext.apply({
						// 菜单数据集
						gridStore : Ext.create({
									xtype : 'jsonstore',
									idProperty : 'menucode',
									root : 'menuList',
									url : this.queryURL,
									baseParams : {
										start : 0,
										limit : this.pagesize
									},
									remoteSort : true,
									totalProperty : 'total',
									fields : [{
												name : 'menucode',
												mapping : 'menucode'
											}, {
												name : 'menuname',
												mapping : 'menuname'
											}, {
												name : 'funcentry',
												mapping : 'funcentry'
											}, {
												name : 'menulevel',
												mapping : 'menulevel'
											}, {
												name : 'menufullcode',
												mapping : 'menufullcode'
											}, {
												name : 'nodeorder',
												mapping : 'nodeorder'
											}, {
												name : 'system',
												mapping : 'system'
											}, {
												name : 'parent',
												mapping : 'parent'
											}, {
												name : 'isleaf',
												mapping : 'isleaf'
											}]
								}),
						// 菜单数据表格列模型
						gridColumnModel : new Ext.grid.ColumnModel({
							columns : [this.gridSelectionModel, {
								id : 'menucode',
								header : this.title_base + '代码',
								dataIndex : 'menucode',
								renderer : function(value, metaData, record,
										rowIndex, colIndex, store) {
									return '<a href="#">' + value + '</a>';
								},
								listeners : {
									click : function(col, grid, rowIndex, evt) {
										var menuDetailWindow = new techsupport.systemmanage.MenuWindow(
												{
													ownerCt : grid.ownerCt,
													mode : 'detail',
													initRecord : grid
															.getSelectionModel()
															.getSelected()
												});
										menuDetailWindow.center();
										menuDetailWindow.show();
									}
								}
							}, {
								header : this.title_base + '名称',
								dataIndex : 'menuname'
							}, {
								header : this.title_base + '路径',
								dataIndex : 'funcentry'
							}, {
								header : '级别',
								dataIndex : 'menulevel'
							}, {
								header : this.title_base + '全码',
								dataIndex : 'menufullcode'
							}, {
								header : '序号',
								dataIndex : 'nodeorder'
							}, {
								header : '所属系统',
								dataIndex : 'system.name'
							}],
							defaults : {
								sortable : false,
								menuDisabled : true
							}
						})
					}, config);
					techsupport.systemmanage.MenuManager.superclass.constructor
							.call(this, config);
				},
				initComponent : function(ct, position) {
					var mm = this;
					techsupport.systemmanage.MenuManager.superclass.initComponent
							.call(this, ct, position);
					// 重新绑定树形菜单节点加载器
					this.treeLoader = new Ext.tree.TreeLoader({
								url : this.treeLoaderUrl,
								listeners : {
									beforeload : {
										fn : function(loader, node) {
											loader.baseParams.qMenu = Ext
													.encode({
																parent : {
																	menucode : node.id
																}
															});
										}
									}
								}
							});
					// 重新设置树形菜单
					this.treePanel.setTitle("菜单树");
					this.treePanel.loader = this.treeLoader;
					this.treePanel.collapseAll();
					this.treePanel.setRootNode(new Ext.tree.AsyncTreeNode({
								id : "0",
								text : '顶端'
							}));
					this.treePanel.un('click');
					this.treePanel.on('click', function(node, evt) {
								this.ownerCt.currentNodeId = node.id;
							});
					// 重新设置表格按钮
					// 重新设置查询面板
					var queryFormPanel = this.findById(this.id
							+ "QueryCondition");
					var queryBtnPanel = this
							.findById(this.id + "QueryBtnPanel");
					Ext.each(queryBtnPanel.findBy(function(item) {
										return item.getText() == "查询"
									}), function(item) {
								item.setHandler(function() {
											var params = {
												qMenu : queryFormPanel
														.getForm().getValues()
											};
											params.qMenu.parent = {
												'menucode' : mm.currentNodeId
											};
											params.qMenu = Ext
													.encode(params.qMenu);
											Ext.apply(mm.gridStore.baseParams,
													params);
											mm.gridStore.load();
										});
							});
				}
			});
}
