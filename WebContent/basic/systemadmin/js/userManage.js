/**
 * Filename: usermanage.js Descrtion: 用户管理 coding: utf8
 */

// 声明包
Ext.ns('techsupport.systemmanage');

if (!techsupport.systemmanage.UserManager) {
	techsupport.systemmanage.UserManager = Ext.extend(Ext.Panel, {
		title_base : "用户",
		layout : 'border',
		viewConfig : {
			forceFit : true
		},
		defaults : {
			viewConfig : {
				forceFit : true
			},
			border : false,
			bodyStyle : 'padding:4px;'
		},
		split : true,
		border : true,
		enableDD : false,
		addURL : context_path + '/sysadminDefault/add_user.action',
		modifyURL : context_path + '/sysadminDefault/modify_user.action',
		queryURL : context_path + '/sysadminDefault/querylist_user.action',
		detailURL : context_path + '/sysadminDefault/query_user.action',
		removeURL : context_path + '/sysadminDefault/remove_user.action',
		actionPrefix : 'user.',
		removePrefix : 'userList[i]',
		gridSelectionModel : new Ext.grid.CheckboxSelectionModel(),
		// 操作
		actions : {
			// 添加用户
			add : function(params, window, scope) {
				var _scope = this;
				if (scope && typeof scope == "object")
					_scope = scope;
				Ext.Ajax.simpleSubmit({
							url : _scope.addURL,
							actionPrefix : _scope.actionPrefix,
							para : params,
							successCallback : function(data) {
								if (window)
									window.close();
								_scope.gridStore.load({
											params : {
												'user.departid' : _scope.currentNodeId
											}
										});
							}
						});
			},
			// 修改用户
			modify : function(params, window, scope) {
				var _scope = this;
				if (scope && typeof scope == "object")
					_scope = scope;
				Ext.Ajax.simpleSubmit({
							url : _scope.modifyURL,
							actionPrefix : _scope.actionPrefix,
							para : params,
							successCallback : function(data) {
								if (window)
									window.close();
								_scope.gridStore.load({
											params : {
												'user.departid' : _scope.currentNodeId
											}
										});
							}
						});
			},
			// 删除用户
			remove : function(params, scope) {
				var _scope = this;
				if (scope && typeof scope == "object")
					_scope = scope;
				Ext.Ajax.simpleSubmit({
							url : _scope.removeURL,
							actionPrefix : _scope.removePrefix,
							para : params,
							successCallback : function(data) {
								_scope.gridStore.load({
											params : {
												'user.departid' : _scope.currentNodeId
											}
										});
							}
						});
			}
		},
		constructor : function(config) {
			config = Ext.apply({
				width : "100%",
				height : "100%",
				pagesize : 25,
				gridStore : Ext.create({
							xtype : 'jsonstore',
							idProperty : 'userid',
							root : 'userList',
							url : this.queryURL,
							baseParams : {
								start : 0,
								limit : this.pagesize
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
						}),
				gridColumnModel : new Ext.grid.ColumnModel({
					columns : [this.gridSelectionModel, {
						id : 'userid',
						header : this.title_base + 'ID',
						dataIndex : 'userid',
						renderer : function(value, metaData, record, rowIndex,
								colIndex, store) {
							return '<a href="#">' + value + '</a>';
						},
						listeners : {
							click : function(col, grid, rowIndex, evt) {
								var userDetailWindow = new techsupport.systemmanage.UserWindow(
										{
											ownerCt : grid.ownerCt,
											mode : 'detail',
											initRecord : grid
													.getSelectionModel()
													.getSelected()
										});
								userDetailWindow.center();
								userDetailWindow.show();
							}
						}
					}, {
						header : this.title_base + '名称',
						dataIndex : 'username'
					}, {
						header : this.title_base + '帐号',
						dataIndex : 'useraccount'
					}, {
						header : this.title_base + '密码',
						dataIndex : 'password',
						renderer : function(value, metaData, record, rowIndex,
								colIndex, store) {
							return "******"
						}
					}, {
						header : this.title_base + '身份证',
						dataIndex : 'idnum'
					}, {
						header : this.title_base + '电话',
						dataIndex : 'mobilephone'
					}, {
						header : this.title_base + '邮箱',
						dataIndex : 'email'
					}, {
						header : this.title_base + '类别',
						dataIndex : 'usertype'
					}, {
						header : '有效状态',
						dataIndex : 'isvalid',
						renderer : function(value, metaData, record, rowIndex,
								colIndex, store) {
							if (value == "Y")
								return "是";
							else
								return "否";
						}
					}, {
						header : '显示序列',
						dataIndex : 'userorder'
					}],
					defaults : {
						sortable : false,
						menuDisabled : true
					}
				})
			}, config);
			techsupport.systemmanage.UserManager.superclass.constructor.call(
					this, config);
		},
		// -----------------------------------------------初始化页面的组件-------------------------------------------------
		initComponent : function(ct, position) {
			var um = this;
			techsupport.systemmanage.UserManager.superclass.initComponent
					.apply(this, arguments);

			// --------------------查询面板内容的默认值------------------------
			var queryPanelItemsDefaults = {
				xtype : 'textfield'
			};

			// -----------------------------------------------机构树加载节点---------------------------------------------------
			this.treeLoader = new Ext.tree.TreeLoader({
				url : context_path
						+ '/sysadminDefault/queryDepartmentNode_department.action',
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
						split : true,
						listeners : {
							click : function(node, evt) {
								this.ownerCt.currentNodeId = node.id;
								if (node.id != "0") {
									this.ownerCt.gridStore.load({
												params : {
													start : 0,
													limit : this.ownerCt.pagesize,
													'user.departid' : node.id
												}
											});
								}

							}
						}
					});
			// ------------------------------------用户展示的数据表格-------------------------------------

			// -----------------------------嵌入到右边面板中---------------------------------------------
			this.gridPanel = new Ext.grid.GridPanel({
				id : this.id + "Grid",
				store : this.gridStore,
				border : false,
				sm : this.gridSelectionModel,
				cm : this.gridColumnModel,
				viewConfig:{
					forceFit:true
				},
				listeners : {
					// 双击打开修改窗口
					rowdblclick : function(grid, rowIndex, evt) {
						var userModifyBtn = grid.getTopToolbar()
								.findById("userModifyBtn");
						userModifyBtn.handler();
					}
				},
				tbar : [{
					xtype : 'button',
					cls : 'x-btn-text-icon',
					iconCls : 'icon-add',
					text : '添加',
					handler : function() {
						if (um.currentNodeId == "0") {
							Ext.MessageBox.alert("警告", "请选择下级机构");
							return;
						}
						var userAddWindow = new techsupport.systemmanage.UserWindow(
								{
									ownerCt : um,
									mode : 'add'
								});
						userAddWindow.center();
						userAddWindow.show();
					}
				}, '-', {
					id : 'userModifyBtn',
					xtype : 'button',
					cls : 'x-btn-text-icon',
					iconCls : 'icon-save',
					text : '修改',
					handler : function() {
						var selectedRecord = um.gridSelectionModel
								.getSelected();
						if (!selectedRecord) {
							Ext.MessageBox.alert("警告", "请选择需要修改的记录");
							return;
						}

						var userModifyWindow = new techsupport.systemmanage.UserWindow(
								{
									ownerCt : um,
									mode : 'modify',
									initRecord : selectedRecord
								});
						userModifyWindow.center();
						userModifyWindow.show();

					}
				}, '-', {
					xtype : 'button',
					text : '删除',
					cls : 'x-btn-text-icon',
					iconCls : 'icon-delete',
					handler : function() {
						var lSelections = um.gridSelectionModel.getSelections();
						if (lSelections && lSelections.length) {
							var lSelectionDatas = [];
							for (var i = 0; i < lSelections.length; i++) {
								lSelectionDatas.push(lSelections[i].data);
							}

							um.actions.remove(lSelectionDatas, um);
						}

					}
				}],
				bbar : [new Ext.AsinoPagingToolBar({
							store : this.gridStore,
							displayInfo : true,
							pageSize : this.pagesize
						})]
			});

			// ----------------------查询面板----------------------
			this.queryPanel = Ext.create({
				xtype : 'panel',
				id : this.id + 'Query',
				autoHeight : true,
				items : [{
					xtype : 'form',
					id : this.id + "QueryCondition",
					layout : 'column',
					layoutConfig : {
						padding : '4 4 4 4'
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
											fieldLabel : this.title_base + '名称'
										}]
							}, {
								layout : 'form',
								xtype : 'panel',
								defaults : queryPanelItemsDefaults,
								items : [{
											name : 'useraccount',
											fieldLabel : this.title_base + '帐号'
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
											fieldLabel : this.title_base + '邮箱'
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
									// 参数
									var params = {
										limit : um.pagesize
									};

									params[um.actionPrefix + 'departid'] = um.currentNodeId;
									buildSubmitParam(params,
											um.queryPanel.items.itemAt(0)
													.getForm().getValues(),
											um.actionPrefix);
									Ext.apply(um.gridStore.baseParams, params);
									um.gridStore.load();
								}
							}), Ext.create({
										xtype : 'button',
										text : '重置',

										handler : function() {
											Ext
													.getCmp(um.id
															+ "QueryCondition")
													.getForm().reset();
										}
									})]
						}]
			});
			// ---------------------右边面板-----------------------
			this.rightPanel = new Ext.Panel({
						id : this.id + "RightPanel",
						xtype : 'panel',
						width:'79%',
						title : this.title_base + '信息',
						region : 'center',
						items : [this.queryPanel, this.gridPanel]
					});
			this.add(this.treePanel);
			this.add(this.rightPanel);

		},
		// 在页面本顶层面板组件渲染以后的调用的事件，用来调节数据表格的自动适应高度。
		afterRender : function(ct, position) {
			techsupport.systemmanage.UserManager.superclass.afterRender.apply(
					this, arguments);
			this.setHeight(ct.getHeight());
			this.rightPanel.setHeight(this.getInnerHeight());
			this.treePanel.getRootNode().expand();
			// 设置内容表格高度
			this.gridBodyHeight = this.rightPanel.getInnerHeight()
					- this.gridPanel.getFrameHeight()
					- this.queryPanel.getHeight() - 5;
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
			this.defaults = {
				viewConfig : {
					forceFit : true
				}
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
		initData : function() {
			var uw = this;
			// 初始化数据
			if (uw.initRecord) {
				var data = uw.initRecord.data;
				uw.formPanel.getForm().setValues(data);
				var passwdRepeatField = uw.formPanel.findById('passwordRepeat');
				passwdRepeatField.setValue(data.password);
			}

			// 加载用户类型内容项
			Ext.Ajax.request({
						url : context_path
								+ '/sysadminDefault/find_dictItem.action',
						params : {
							'dictItem.dict_code' : USER_TYPE_DICT_CODE
						},
						method : "post",
						success : function(response, option) {

							var data = response.responseJSON;

							var oldUsertypeField = uw.formPanel
									.findById("usertype");
							// 复选框列表
							var lCheckboxs = [];
							for (var i = 0; i < data.lDictItems.length; i++) {
								var checkbox = new Ext.form.Checkbox({
											boxLabel : data.lDictItems[i].display_name,
											inputValue : data.lDictItems[i].fact_value
										});
								lCheckboxs.push(checkbox);
							}
							// 延迟创建的新的用户类别字段,用于替换老的初始化占位用的
							var newUsertypeField = new Ext.form.CheckboxGroup({
										id : 'usertypeNew',
										name : 'usertype',
										fieldLabel : '用户类别',
										height : 70,
										itemCls : 'x-check-group-alt',
										autoScroll : true,
										allowBlank : false,
										blankText : '用户类型必须选择',
										columns : 1,
										items : lCheckboxs
									});

							uw.formPanel.insert(10, newUsertypeField);
							uw.formPanel.remove(oldUsertypeField);
							uw.doLayout();
							uw.center();

							if (uw.initRecord) {
								var data = uw.initRecord.data;
								var usertypeField = uw.formPanel
										.findById("usertypeNew");
								usertypeField.setValue(data.usertype);

								if (uw.mode == 'detail') {
									newUsertypeField.setDisabled(true);
								}
							}
						}
					});

		},
		initComponent : function(ct, position) {
			var uw = this;
			techsupport.systemmanage.UserWindow.superclass.initComponent.call(
					this, ct, position);
			// 表单区域
			this.formPanel = new Ext.form.FormPanel({
				defaults : {
					xtype : 'textfield',
					width : 200
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
								if (!val)
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
							inputType : 'password',
							validationEvent : 'blue',
							validator : function(val) {
								if (!val)
									return "密码必须输入";
								var passwdRepeat = this.ownerCt
										.findById('passwordRepeat');
								if (val && passwdRepeat.getValue()) {
									if (val == passwdRepeat.getValue()) {
										passwdRepeat.clearInvalid();
										return true;
									}

									else
										return "两次输入密码不一致";
								}
							}
						}, {
							id : 'passwordRepeat',
							name : 'passwordRepeat',
							fieldLabel : '重复密码',
							inputType : 'password',
							submitValue : false,
							validationEvent : 'blue',
							validator : function(val) {
								if (!val)
									return "重复密码必须输入";
								var passwd = this.ownerCt.findById('password');
								if (val && passwd.getValue()) {
									if (val == passwd.getValue()) {
										passwd.clearInvalid();
										return true;

									} else
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
							id : 'userorder',
							name : 'userorder',
							fieldLabel : '序号',
							allowBlank : true
						}, new Ext.form.ComboBox({
									id : 'isvalid',
									hiddenName : 'isvalid',
									fieldLabel : '是否可用',
									triggerAction : 'all',
									mode : 'local',
									store : new Ext.data.ArrayStore({
												id : 0,
												fields : ['factValue',
														'displayName'],
												data : [['Y', '是'], ['N', '否']],
												autoLoad : true
											}),
									valueField : 'factValue',
									displayField : 'displayName',
									editable : false
								}), {
							id : 'usertype',
							name : 'usertype',
							fieldLabel : '用户类别',
							xtype : 'checkboxgroup',
							itemCls : 'x-check-group-alt',
							columns : 1,
							items : [{}]

						}, new Ext.form.TextField({
									id : 'departid',
									name : 'departid',
									fieldLabel : '机构ID',
									allowBlank : false,
									hidden : true
								})]
			});

			// 添加表单到窗口面板
			this.add(this.formPanel);
			// 初始化数据
			this.initData(this);
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

				var useraccountField = this.formPanel.findById('useraccount');
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
				var useraccountField = this.formPanel.findById('useraccount');
				useraccountField.setReadOnly(true);
				useraccountField.un('blur');

				// 确认按钮
				this.addButton({
					xtype : 'button',
					text : '确认',
					handler : function() {
						if (uw.formPanel.getForm().isValid()) {
							uw.ownerCt.actions.modify(
									function(formValues) {
										if (Ext.isArray(formValues.usertype)) {
											var usertype = "";
											for (var i = 0; i < formValues.usertype.length; i++) {
												usertype += formValues.usertype[i]
														+ ",";
											}
											if (usertype.length == 0) {
												formValues.usertype = undefined;
											} else
												formValues.usertype = usertype
														.substring(0,
																usertype.length
																		- 1);
										}
										return formValues;
									}(uw.formPanel.getForm().getValues()), uw,
									uw.ownerCt);
						}
					}
				});
				// 关闭按钮
				this.addButton({
							xtype : 'button',
							text : '关闭',
							handler : function() {
								uw.close();
							}
						});
				// 添加模式
			} else if (this.mode == 'add') {
				// 隐藏是否可用
				var isValidField = this.formPanel.findById('isvalid');
				isValidField.hide();
				// 设置默认为可用状态
				isValidField.setValue("Y");
				// 隐藏序号
				var userOrderField = this.formPanel.findById('userorder');
				userOrderField.hide();

				// 设置当前机构的id
				var departIdFeild = this.formPanel.findById("departid");
				departIdFeild.setValue(this.ownerCt.currentNodeId);

				// 确认按钮
				this.addButton(new Ext.Button({
					xtype : 'button',
					text : '确认',
					handler : function() {
						if (uw.formPanel.getForm().isValid()) {
							uw.ownerCt.actions.add(
									function(formValues) {
										if (Ext.isArray(formValues.usertype)) {
											var usertype = "";
											for (var i = 0; i < formValues.usertype.length; i++) {
												usertype += formValues.usertype[i]
														+ ",";
											}
											if (usertype.length == 0) {
												formValues.usertype = undefined;
											} else
												formValues.usertype = usertype
														.substring(0,
																usertype.length
																		- 1);
										}

										return formValues;
									}(uw.formPanel.getForm().getValues()), uw,
									uw.ownerCt);
						}
					}
				}));
				// 关闭按钮
				this.addButton(new Ext.Button({
							xtype : 'button',
							text : '关闭',
							handler : function() {
								uw.close();
							}
						}));
			}
		}
	});
}