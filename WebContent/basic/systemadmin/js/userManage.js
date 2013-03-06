/**
 * Filename: usermanage.js Descrtion: 用户管理 coding: utf8
 */

// 声明包
Ext.ns('techsupport.systemmanage');

if (!techsupport.systemmanage.UserManager) {
	techsupport.systemmanage.UserManager = Ext.extend(Ext.Panel, {
		title_base : "用户",
		id : 'userManagePanel',
		layout : 'border',
		viewConfig : {
			forceFit : true
		},
		pagesize : 25,
		dir : "userorder",
		defaults : {
			bodyStyle : 'padding:4px;',
			split : true
		},
		enableDD : false,
		addURL : context_path + '/sysadminDefault/add_user.action',
		modifyURL : context_path + '/sysadminDefault/modify_user.action',
		queryURL : context_path + '/sysadminDefault/querylist_user.action',
		detailURL : context_path + '/sysadminDefault/query_user.action',
		removeURL : context_path + '/sysadminDefault/remove_user.action',
		actionPrefix : 'user.',
		removePrefix : 'userList[i].',
		gridSelectionModel : new Ext.grid.CheckboxSelectionModel(),
		constructor : function(config) {
			this.renderTo = config.renderTo;
			this.width = config.width || "100%";
			this.height = config.height || "100%";
			this.pagesize = config.pagesize || 25;

			this.gridStore = Ext.create({
				xtype : 'jsonstore',
				idProperty : 'userid',
				root : 'userList',
				url : this.queryURL,
				baseParams : {
					start : 0,
					limit : this.pagesize,
					dir : this.dir,
					sort : this.sort
				},
				remoteSort : true,
				totalProperty : 'total',
				fields : [ {
					name : 'userid',
					mapping : 'userid'
				}, {
					name : 'username',
					mapping : 'username'
				}, {
					name : 'useraccount',
					mapping : 'useraccount'
				}, {
					name : 'password',
					mapping : 'password'
				}, {
					name : 'departid',
					mapping : 'departid'
				}, {
					name : 'userorder',
					mapping : 'userorder'
				}, {
					name : 'isvalid',
					mapping : 'isvalid'
				}, {
					name : 'usertype',
					mapping : 'usertype'
				}, {
					name : 'idnum',
					mapping : 'idnum'
				}, {
					name : 'mobilephone',
					mapping : 'mobilephone'
				}, {
					name : 'email',
					mapping : 'email'
				} ]
			});

			this.gridColumnModel = new Ext.grid.ColumnModel({
				columns : [ this.gridSelectionModel, {
					id : 'userid',
					header : this.title_base + 'ID',
					dataIndex : 'userid',
					width : 100
				}, {
					header : this.title_base + '名称',
					dataIndex : 'username',
					width : 200
				}, {
					header : this.title_base + '帐号',
					dataIndex : 'useraccount',
					width : 200
				}, {
					header : this.title_base + '密码',
					dataIndex : 'password',
					width : 200
				}, {
					header : this.title_base + '身份证',
					dataIndex : 'idnum',
					width : 200
				}, {
					header : this.title_base + '电话',
					dataIndex : 'mobilephone',
					width : 200
				}, {
					header : this.title_base + '邮箱',
					dataIndex : 'email',
					width : 200
				}, {
					header : this.title_base + '类别',
					dataIndex : 'usertype',
					width : 200
				}, {
					header : '有效状态',
					dataIndex : 'isValid',
					width : 200
				}, {
					header : '显示序列',
					dataIndex : 'userorder',
					width : 200
				} ],
				defaults : {
					sortable : false,
					menuDisabled : true
				}
			});

			techsupport.systemmanage.UserManager.superclass.constructor.apply(
					this, arguments);
		},
		initComponent : function(ct, position) {
			this.treeLoader = new Ext.tree.TreeLoader(
					{
						url : context_path+'/sysadminDefault/query_department_node_departmentmanage.action',
						method : 'post',
						listeners : {
							beforeload : {
								fn : function(loader, node) {
									loader.baseParams['department.departid'] = node.id;
								}
							}
						}
					});
			//左边机构树
			this.treePanel = Ext.create({
				xtype : 'treepanel',
				region : 'west',
				id : this.id + "TreePanel",
				title : "机构树",
				useArrows : true,
				autoScroll : true,
				animate : true,
				enableDD : false,
				containerScroll : true,
				border : false,
				width : '25%',
				rootVisable : false,
				viewConfig : {
					forceFit : true,
				},
				loader : this.treeLoader,
				root : {
					id : '0',
					text : '顶端',
					nodeType : 'async'
				},
				listeners : {
					click : function(node, evt) {
						this.ownerCt.currentNodeId = node.id;
						this.ownerCt.store.load({
							params : {
								start : 0,
								limit : this.ownerCt.pagesize,
								dir : this.ownerCt.dir,
								desc : this.ownerCt.desc
							}
						});
					}
				}
			});
			//右边的表格
			this.gridPanel = Ext.create({
				xtype : 'grid',
				id : this.id + "Grid",
				store : this.gridStore,
				border : false,
				viewConfig : {
					forceFit : true
				},
				sm : this.gridSelectionModel,
				cm : this.gridColumnModel,
				tbar : [ {
					xtype : 'button',
					text : '添加',
					handler : function() {
					}
				}, {
					xtype : 'button',
					text : '修改',
					handler : function() {
					}
				}, {
					xtype : 'button',
					text : '删除',
					handler : function() {
					}
				}, {
					xtype : 'button',
					text : '置顶',
					handler : function() {
					}
				}, {
					xtype : 'button',
					text : '上移',
					handler : function() {
					}
				}, {
					xtype : 'button',
					text : '下移',
					handler : function() {
					}
				}, {
					xtype : 'button',
					text : '置底',
					handler : function() {
					}
				} ],
				bbar : [ new Ext.AsinoPagingToolBar({
					store : this.store,
					displayInfo : true,
					pageSize : this.pagesize
				}) ]
			});
//--------------------查询面板内容的默认值------------------------
			var queryPanelItemsDefaults = {
				xtype : 'textfield',
				columnWidth : .25
			};
//----------------------查询面板----------------------
			this.queryPanel = Ext.create({
				xtype : 'form',
				id : this.id + "Detail",
				layout : 'column',
				viewConfig : {
					forceFit : true
				},
				defaults : {
					border : false,
					bodyStyle : 'padding:2px',
					labelAlign : 'right'
				},
				items : [ {
					layout : 'form',
					xtype : 'panel',
					defaults : queryPanelItemsDefaults,
					items : [ {
						name : 'username',
						fieldLabel : this.title_base + '名称'
					} ]
				}, {
					layout : 'form',
					xtype : 'panel',
					defaults : queryPanelItemsDefaults,
					items : [ {
						name : 'useraccount',
						fieldLabel : this.title_base + '帐号'
					} ]
				}, {
					layout : 'form',
					xtype : 'panel',
					defaults : queryPanelItemsDefaults,
					items : [ {
						name : 'mobilephone',
						fieldLabel : this.title_base + '电话号码'
					} ]
				}, {
					layout : 'form',
					xtype : 'panel',
					defaults : queryPanelItemsDefaults,
					items : [ {
						name : 'email',
						fieldLabel : this.title_base + '邮箱'
					} ]
				} ]
			});
//---------------------右边面板-----------------------
			this.rightPanel = Ext.create({
				xtype : 'panel',
				title : this.title_base + '信息',
				region : 'center',
				layout : 'vbox',
				viewConfig : {
					forceFit : true
				},
				items : [ this.queryPanel, this.gridPanel ]
			});

			this.items = [ this.treePanel, this.rightPanel ];

			techsupport.systemmanage.UserManager.superclass.initComponent
					.apply(this, arguments);
		},
		afterRender : function(ct, position) {
			this.body_height = this.getHeight() - this.getFrameHeight();
			this.body.setHeight(this.body_height);
			techsupport.systemmanage.UserManager.superclass.afterRender.apply(
					this, arguments);

			this.treePanel.getRootNode().expand();
			// 设置内容表格高度
			this.gridBodyHeight = this.rightPanel.getInnerHeight()
					- this.gridPanel.getFrameHeight()
					- this.detailPanel.getHeight() - 9;
			this.gridPanel.body.setHeight(this.gridBodyHeight);
		}
	});
}
