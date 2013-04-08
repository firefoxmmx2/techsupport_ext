/**
 * filename: menuManager.js description: 菜单管理 主要模块 1: 菜单管理主面板 2: 菜单窗口
 */

Ext.ns("techsupport.systemmanage");

if (!techsupport.systemmanage.MenuManager) {
	Ext.Loader.load(['basic/systemadmin/js/userManage.js'], function() {

		techsupport.systemmanage.MenuManager = Ext.extend(
				techsupport.systemmanage.UserManager, {
					addURL : context_path + '/sysadminDefault/add_user.action',
					modifyURL : context_path
							+ '/sysadminDefault/modify_user.action',
					queryURL : context_path
							+ '/sysadminDefault/querylist_user.action',
					detailURL : context_path
							+ '/sysadminDefault/query_user.action',
					removeURL : context_path
							+ '/sysadminDefault/remove_user.action',
					actionPrefix : 'user.',
					removePrefix : 'userList[i]',
					title_base : "菜单",
					id : 'menuManager',
					constructor : function(config) {
						this.gridStore = Ext.create({
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
								});

						this.gridColumnModel = new Ext.grid.ColumnModel({
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
								dataIndex : 'menufullcode',
								width : 200
							}, {
								header : '序号',
								dataIndex : 'nodeorder',
								width : 200
							}, {
								header : '所属系统',
								dataIndex : 'system.name',
								width : 200
							}],
							defaults : {
								sortable : false,
								menuDisabled : true
							}
						});
					}

				});

	});
}
