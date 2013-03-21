/**
 * Filename: usermanage.js Descrtion: 用户管理 coding: utf8
 */

// 声明包
Ext.ns('techsupport.systemmanage');

if (!techsupport.systemmanage.UserManager) {
	techsupport.systemmanage.UserManager = Ext.extend(Ext.Panel, {
		title_base : "用户",
		id : 'userManager',
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
		style : "height:100%",
		enableDD : false,
		addURL : context_path + '/sysadminDefault/add_user.action',
		modifyURL : context_path + '/sysadminDefault/modify_user.action',
		queryURL : context_path + '/sysadminDefault/querylist_user.action',
		detailURL : context_path + '/sysadminDefault/query_user.action',
		removeURL : context_path + '/sysadminDefault/remove_user.action',
		actionPrefix : 'user.',
		removePrefix : 'userList[i].',
		gridSelectionModel : new Ext.grid.CheckboxSelectionModel(),
		// 操作
		actions : {
			// 添加用户
			add : function(params, scope) {
				var _scope = this;
				if (scope && typeof scope == "Object")
					_scope = scope;
				Ext.Ajax.simpleSubmit({
							url : _scope.addUrl,
							actionPrefix : _scope.actionPrefix,
							params : params,
							successCallback : function(data) {
								if (_scope.window)
									_scope.window.close();
								_scope.gridStore.load();

								var currentNode = _scope.treePanel
										.getNodeById(_scope.currentNodeId);
								_scope.treeLoader.load(currentNode, function(
												node) {
											if (node.childNodes.length > 0) {
												node.leaf = false;
											} else
												node.leaf = true;

											node.expand();
										});
							}
						});
			},
			// 修改用户
			modify : function(params, scope) {
				var _scope = this;
				if (scope && typeof scope == "Object")
					_scope = scope;
				Ext.Ajax.simpleSubmit({
							url : _scope.addUrl,
							actionPrefix : _scope.actionPrefix,
							params : params,
							successCallback : function(data) {
								if (_scope.window)
									_scope.window.close();
								_scope.gridStore.load();

								var currentNode = _scope.treePanel
										.getNodeById(_scope.currentNodeId);
								_scope.treeLoader.load(currentNode, function(
												node) {
											if (node.childNodes.length > 0) {
												node.leaf = false;
											} else
												node.leaf = true;

											node.expand();
										});
							}
						});
			},
			// 删除用户
			remove : function(params) {
				var _scope = this;
				if (scope && typeof scope == "Object")
					_scope = scope;
				Ext.Ajax.simpleSubmit({
							url : _scope.addUrl,
							actionPrefix : _scope.actionPrefix,
							params : params,
							successCallback : function(data) {
								if (_scope.window)
									_scope.window.close();
								_scope.gridStore.load();

								var currentNode = _scope.treePanel
										.getNodeById(_scope.currentNodeId);
								_scope.treeLoader.load(currentNode, function(
												node) {
											if (node.childNodes.length > 0) {
												node.leaf = false;
											} else
												node.leaf = true;

											node.expand();
										});
							}
						});
			}
		},
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
						fields : [{
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
								}]
					});

			this.gridColumnModel = new Ext.grid.ColumnModel({
						columns : [this.gridSelectionModel, {
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
								}],
						defaults : {
							sortable : false,
							menuDisabled : true
						}
					});

			techsupport.systemmanage.UserManager.superclass.constructor.apply(
					this, arguments);
		},
		// -----------------------------------------------初始化页面的组件-------------------------------------------------
		initComponent : function(ct, position) {
			var um = this;
			// -----------------------------------------------机构树加载节点---------------------------------------------------
			this.treeLoader = new Ext.tree.TreeLoader({
				url : context_path
						+ '/sysadminDefault/query_department_node_departmentmanage.action',
				method : 'post',
				listeners : {
					beforeload : {
						fn : function(loader, node) {
							loader.baseParams['department.departid'] = node.id;
						}
					}
				}
			});
			// --------------------------------机构树面板（加载位置在用户管理布局的左边）---------------------------------
			this.treePanel = new Ext.tree.TreePanel({
						region : 'west',
						id : this.id + "TreePanel",
						title : "机构树",
						useArrows : true,
						autoScroll : true,
						animate : true,
						enableDD : false,
						containerScroll : true,
						border : false,
						width : '20%',
						rootVisable : false,
						viewConfig : {
							forceFit : true
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
								this.ownerCt.gridStore.load({
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
			// ------------------------------------用户展示的数据表格-------------------------------------
			// -----------------------------嵌入到右边面板中---------------------------------------------
			this.gridPanel = new Ext.grid.GridPanel({
				id : this.id + "Grid",
				store : this.gridStore,
				border : false,
				viewConfig : {
					forceFit : true
				},
				sm : this.gridSelectionModel,
				cm : this.gridColumnModel,
				tbar : [{
					xtype : 'button',
					text : '添加',
					handler : function() {
						var userAddWindow = new techsupport.systemmanage.UserWindow(
								{
									ownerCt : this.ownerCt.ownerCt.ownerCt,
									mode : 'add'
								});
						userAddWindow.center();
						userAddWindow.show();
					}
				}, '-', {
					xtype : 'button',
					text : '修改',
					handler : function() {
						var userModifyWindow = new techsupport.systemmanage.UserWindow(
								{
									ownerCt : this.ownerCt.ownerCt.ownerCt,
									mode : 'modify'
								});
						userModifyWindow.center();
						userModifyWindow.show();

					}
				}, '-', {
					xtype : 'button',
					text : '删除',
					handler : function() {
					}
				}, '-', '-', {
					xtype : 'button',
					text : '置顶',
					handler : function() {
					}
				}, '-', {
					xtype : 'button',
					text : '上移',
					handler : function() {
					}
				}, '-', {
					xtype : 'button',
					text : '下移',
					handler : function() {
					}
				}, '-', {
					xtype : 'button',
					text : '置底',
					handler : function() {
					}
				}],
				bbar : [new Ext.AsinoPagingToolBar({
							store : this.store,
							displayInfo : true,
							pageSize : this.pagesize
						})]
			});
			// --------------------查询面板内容的默认值------------------------
			var queryPanelItemsDefaults = {
				xtype : 'textfield'
			};
			// ----------------------查询面板----------------------
			this.queryPanel = Ext.create({
						xtype : 'panel',
						id : this.id + 'Query',
						border : true,
						width : '100%',
						viewConfig : {
							forceFit : true
						},
						items : [{
							xtype : 'form',
							id : this.id + "QueryCondition",
							layout : 'column',
							layoutConfig : {
								padding : 4
							},
							viewConfig : {
								forceFit : true
							},
							frame : false,
							border : false,
							defaults : {
								border : false,
								labelAlign : 'right'
							},
							items : [{
										layout : 'form',
										xtype : 'panel',
										defaults : queryPanelItemsDefaults,
										items : [{
													name : 'username',
													fieldLabel : this.title_base
															+ '名称'
												}]
									}, {
										layout : 'form',
										xtype : 'panel',
										defaults : queryPanelItemsDefaults,
										items : [{
													name : 'useraccount',
													fieldLabel : this.title_base
															+ '帐号'
												}]
									}, {
										layout : 'form',
										xtype : 'panel',
										defaults : queryPanelItemsDefaults,
										items : [{
											name : 'mobilephone',
											fieldLabel : this.title_base
													+ '电话号码'
										}]
									}, {
										layout : 'form',
										xtype : 'panel',
										defaults : queryPanelItemsDefaults,
										items : [{
													name : 'email',
													fieldLabel : this.title_base
															+ '邮箱'
												}]
									}]
						},
								// 查询按钮面板，里面放置查询按钮和重置按钮
								{
									id : this.id + 'QueryBtnPanel',
									xtype : 'panel',
									layout : 'hbox',
									layoutConfig : {
										padding : '2 10 2 2',
										pack : 'end'
									},
									border : false,
									defaults : {
										margins : '5 5 0 0',
										width : 75
									},
									items : [Ext.create({
														xtype : 'button',
														text : '查询',
														handler : function() {
															// 查询的具体
														}
													}), Ext.create({
														xtype : 'button',
														text : '重置',

														handler : function() {
															Ext
																	.getCmp(um.id
																			+ "QueryCondition")
																	.getForm()
																	.reset();
														}
													})]
								}]
					});
			// ---------------------右边面板-----------------------
			this.rightPanel = Ext.create({
						xtype : 'panel',
						title : this.title_base + '信息',
						region : 'center',
						layout : 'vbox',
						viewConfig : {
							forceFit : true
						},
						// 在右边面板中，从上到下放入，查询条件和数据显示用的表格
						items : [this.queryPanel, this.gridPanel]
					});

			// 在用户管理的顶层面板放入树形菜单和右边面板
			this.items = [this.treePanel, this.rightPanel];

			techsupport.systemmanage.UserManager.superclass.initComponent
					.apply(this, arguments);
		},
		// 在页面本顶层面板组件渲染以后的调用的事件，用来调节数据表格的自动适应高度。
		afterRender : function(ct, position) {
			this.bodyHeight = this.getHeight() - this.getFrameHeight();
			this.body.setHeight(this.bodyHeight);

			techsupport.systemmanage.UserManager.superclass.afterRender.apply(
					this, arguments);

			this.treePanel.getRootNode().expand();
			// 设置内容表格高度
			this.gridBodyHeight = this.rightPanel.getInnerHeight()
					- this.gridPanel.getFrameHeight()
					- this.queryPanel.getHeight() - 9;
			this.gridPanel.body.setHeight(this.gridBodyHeight);
		}
	});
}

/**
 * 用户管理的窗口
 */
if (!techsupport.systemmanage.UserWindow) {
	techsupport.systemmanage.UserWindow = Ext.extend(Ext.Window, {
		constructor : function(config) {
			this.mode = config.mode || 'detail';
			this.ownerCt = config.ownerCt;
			this.renderTo = config.renderTo || Ext.getBody();
			this.width = config.width || 500;
			this.closeAction = "close";
			this.title = '用户';
			this.viewConfig = {
				forceFit : true
			};
			// 设置是否为置顶窗口 , 可通过参数来改变
			this.modal = config.modal || true,
			// 初始化数据
			this.initRecord = config.initRecord;
			this.defaults = config.defaults || {
				bodyStyle : 'padding: 4px;',
				xtype : 'textfield'
			};
			techsupport.systemmanage.UserWindow.superclass.constructor.call(
					this, config);
		},
		initComponent : function(ct, position) {
			var uw = this;
			techsupport.systemmanage.UserWindow.superclass.initComponent.call(
					this, ct, position);
			// 表单区域
			this.formPanel = new Ext.form.FormPanel({
				layoutConfig : {
					forceFit : true
				},
				defaults : {
					xtype : 'textfield'
				},
				items : [{
							id : 'userid',
							name : 'userid',
							fieldLabel : '用户id',
							allowBlank : true,
							hidden : true
						}, {
							id : 'username',
							name : 'username',
							fieldLabel : '用户名称',
							allowBlank : false,
							blankText : '用户名称不能为空'
						}, {
							id : 'useraccount',
							name : 'useraccount',
							fieldLabel : '用户帐号',
							allowBlank : false,
							validationEvent : 'blur',
							validator : function(val) {
								if(!val)
									return '用户帐号必须输入';
								if (uw.initRecord) {
									if (val == uw.initRecord.data[this.name])
										return true;
								}

								var result = false;

								$.ajax({
									url : context_path
											+ '/sysadminDefault/check_user.action',
									data : {
										'user.useraccount' : val
									},
									async : false,
									success : function(response, opt) {
										var data = response;
										if (!data.returnNo)
											result = true;
										else
											result = false;
									}
								});
								if (result)
									return true;
								else
									return '用户帐号已存在';
							},
							vtype : 'alphanum'
						}, {
							id : 'password',
							name : 'password',
							fieldLabel : '密码',
							blankText : '密码必须输入',
							validationEvent : 'blue',
							validator : function(val) {
								var passwdRepeat = this.ownerCt
										.find('passwordRepeat');
								if (val && passwdRepeat.getValue()) {
									if (val == passwdRepeat.getValue())
										return true;
									else
										return "两次输入密码不一致";
								}
							}
						}, {
							id : 'passwordRepeat',
							name : 'passwordRepeat',
							fieldLabel : '重复密码',
							blankText : '重复密码必须输入',
							validationEvent : 'blue',
							validator : function(val) {
								var passwd = this.ownerCt.find('password');
								if (val && passwd.getValue()) {
									if (val == passwd.getValue())
										return true;
									else
										return "两次输入密码不一致";
								}
							}
						}, {
							id : 'idnum',
							name : 'idnum',
							fieldLabel : '身份证号码',
							allowBlank : true
						}, {
							id : 'mobilephone',
							name : 'mobilephone',
							fieldLabel : '电话',
							allowBlank : true,
							vtype : 'number',
							vtypeText : "电话输入必须为数字"

						}, {
							id : 'email',
							name : 'email',
							fieldLabel : '电子邮件',
							allowBlank : true,
							vtype : 'email',
							emailText : '输入的电子邮件不正确'
						}, {
							id : 'usertype',
							name : 'usertype',
							fieldLabel : '用户类别',
							xtype : 'checkboxgroup',
							itemCls : 'x-check-group-alt',
							columns : 1,
							items : [{}]

						}, {
							id : 'userorder',
							name : 'userorder',
							fieldLabel : '序号',
							allowBlank : true
						}, new Ext.form.ComboBox({
									id : 'isvalid',
									name : 'isvalid',
									fieldLabel : '是否可用',
									typeAhead : true,
									trigerAction : 'all',
									mode : 'local',
									store : new Ext.data.ArrayStore({
												id : 0,
												fields : ['factValue',
														'displayName'],
												data : [['Y', '是'], ['N', '否']]
											}),
									valueField : 'factValue',
									displayField : 'displayName'
								})]
			});

			// 加载用户类型内容项
			Ext.Ajax.request({
						url : context_path
								+ '/sysadminDefault/find_dictItem.action',
						params:{'dictItem.dict_code':USER_TYPE_DICT_CODE},
						method:"post",
						success : function(response, option) {
							
							var data = response.responseJSON;
							
							var oldUsertypeField = uw.formPanel
									.findById("usertype");
							//复选框列表
							var lCheckboxs = [];
							for (var i = 0; i < data.lDictItems.length; i++) {
								var checkbox = new Ext.form.Checkbox({
									name:'usertype',
									boxLabel:data.lDictItems[i].display_name,
									inputValue:data.lDictItems[i].fact_value
								});
								lCheckboxs.push(checkbox);
							}
							//延迟创建的新的用户类别字段,用于替换老的初始化占位用的
							var newUsertypeField = new Ext.form.CheckboxGroup({
										id : 'usertypeNew',
										name : 'usertype',
										fieldLabel : '用户类别',
										height : 70,
										itemCls : 'x-check-group-alt',
										columns : 1,
										items : lCheckboxs
									});

							uw.formPanel.insert(8, newUsertypeField);
							uw.formPanel.remove(oldUsertypeField);
							uw.doLayout();
							uw.center();
						}
					});
			// 添加表单到窗口面板
			this.add(this.formPanel);
			
			// 详情模式
			if (this.mode == 'detail') {
				Ext.each(this.formPanel.find(), function(item, index, all) {
							if (item.setReadOnly)
								item.setReadOnly(true);
							else if (item.setEditable)
								item.setEditable(true);
							else if (item.setDisable)
								item.setDisable(true);
						});

				var useraccountField = this.formPanel.findById('useraccout');
				useraccountField.un('blur');
				var passwdField = this.formPanel.findById('password');
				passwdField.un('blur');
				var passwdRepeatField = this.formPanel
						.findById('passwordRepeat');
				passwdRepeatField.un('blur');

				// 关闭按钮
				this.addButton({
							xtype : 'button',
							text : '关闭',
							handler : function() {
								this.ownerCt.ownerCt.close();
							}
						});
				// 修改模式
			} else if (this.mode == 'modify') {
				// 不让修改用户帐号
				var useraccountField = this.formPanel.findById('useraccout');
				useraccountField.setReadOnly(true);
				useraccountField.un('blur');

				// 确认按钮
				this.addButton({
							xtype : 'button',
							text : '确认',
							handler : function() {
								if (this.ownerCt.formPanel.getForm().isValid()) {
									this.ownerCt.ownerCt.actions
											.modify(this.ownerCt.formPanel
													.getForm().getValues());
								}
							}
						});
				// 关闭按钮
				this.addButton({
							xtype : 'button',
							text : '关闭',
							handler : function() {
								this.ownerCt.ownerCt.close();
							}
						});
				// 添加模式
			} else if (this.mode == 'add') {
				// 隐藏是否可用
				var isValidField = this.formPanel.findById('isvalid');
				isValidField.hide();
				// 隐藏序号
				var userOrderField = this.formPanel.findById('userorder');
				userOrderField.hide();

				// 确认按钮
				this.addButton(new Ext.Button({
							xtype : 'button',
							text : '确认',
							handler : function() {
								if (this.ownerCt.formPanel.getForm().isValid()) {
									this.ownerCt.ownerCt.actions
											.add(this.ownerCt.formPanel
													.getForm().getValues());
								}
							}
						}));
				// 关闭按钮
				this.addButton(new Ext.Button({
							xtype : 'button',
							text : '关闭',
							handler : function() {
								this.ownerCt.ownerCt.close();
							}
						}));
			}
		}
	});
}