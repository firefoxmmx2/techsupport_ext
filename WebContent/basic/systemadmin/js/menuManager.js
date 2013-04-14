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
				pagesize : 25,

				constructor : function(config) {
					var mm = this;

					config = Ext.apply({
						actions : {
							add : function(params, store, window) {
								Ext.Ajax.request({
									url : mm.addURL,
									params : {
										'aMenu' : Ext.encode(params)
									},
									success : function(res, opt) {
										var json = res.responseJSON;
										if (json) {
											if (json.success) {
												if (store)
													store.load();
												if (window)
													window.close();
											} else {
												if (json.returnMessage) {
													Ext.example.msg("错误",
															json.returnMessage);
													if (json.returnMessageDebug)
														Ext.example
																.msg(
																		"具体",
																		json.returnMessageDebug);
												}
											}
										}
									}
								});
							},
							modify : function(params, store, window) {
								Ext.Ajax.request({
									url : mm.modifyURL,
									params : {
										mMenu : Ext.encode(params)
									},
									success : function(res, opt) {
										var json = res.responseJSON;
										if (json) {
											if (json.success) {
												if (store)
													store.load();
												if (window)
													window.close();
											} else {
												if (json.returnMessage) {
													Ext.example.msg("错误",
															json.returnMessage);
													if (json.returnMessageDebug)
														Ext.example
																.msg(
																		"具体",
																		json.returnMessageDebug);
												}
											}
										}
									}
								});
							},
							remove : function(params, store) {
								Ext.Ajax.request({
									url : mm.modifyURL,
									params : {
										rMenu : Ext.encode(params)
									},
									success : function(res, opt) {
										var json = res.responseJSON;
										if (json) {
											if (json.success) {
												if (store)
													store.load();
											} else {
												if (json.returnMessage) {
													Ext.example.msg("错误",
															json.returnMessage);
													if (json.returnMessageDebug)
														Ext.example
																.msg(
																		"具体",
																		json.returnMessageDebug);
												}
											}
										}
									}
								});
							}
						},
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
									metaData.style += 'cursor:pointer;';
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
								dataIndex : 'system',
								renderer : function(val) {
									if (val)
										return val.systemname;
								}

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
					if (this.treePanel.hasListener('click'))
						this.treePanel
								.un('click',
										this.treePanel.events.click.listeners
												.last().fn);
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
					// 替换查询面板内容
					queryFormPanel.removeAll();
					queryFormPanel.add([new Ext.Panel({
										layout : 'form',
										items : [new Ext.form.TextField({
													fieldLabel : '菜单代码',
													name : 'menucode'
												})]
									}), new Ext.Panel({
										layout : 'form',
										items : [new Ext.form.TextField({
													fieldLabel : '菜单名称',
													name : 'menuname'
												})]

									})]);
					var grid = Ext.getCmp(this.id + "Grid");
					Ext.each(grid.getTopToolbar().findByType('button'),
							function(item, idx, all) {
								if (item.text == '添加') {
									item.setHandler(function() {
										var window = new techsupport.systemmanage.MenuWindow(
												{
													ownerCt : this,
													store : grid.getStore(),
													actions : grid.ownerCt.actions,
													id : this.id + 'AddWindow',
													mode : 'add'
												});
										window.center();
										window.show();
									});

								} else if (item.text == '修改') {
									item.setHandler(function() {
										var selections = grid
												.getSelectionModel()
												.getSelected();
										if (selections) {
											var window = new techsupport.systemmanage.MenuWindow(
													{
														ownerCt : this,
														store : grid.getStore(),
														actions : grid.ownerCt.actions,
														id : this.id
																+ 'ModifyWindow',
														mode : 'modify',
														initRecord : selections
													});
											window.center();
											window.show();
										}

									});
								} else if (item.text == '删除') {
									item.setHandler(function() {
										var selections = grid
												.getSelectionModel()
												.getSelections();
										if (selections) {
											var paramsArray = [];
											Ext.each(selections, function(item,
													idx, all) {
												paramsArray.push({
													'menucode' : item.data.menucode
												});
											});
											mm.actions.remove(paramsArray, grid
															.getStore());
										}
									});

								}
							});
				}
			});
}

if (!techsupport.systemmanage.MenuWindow) {
	techsupport.systemmanage.MenuWindow = Ext.extend(Ext.Window, {
		title : '菜单',
		renderTo : Ext.getBody(),
		mode : 'detail',
		closeAction : 'close',
		modal : true,
		width : 400,
		initData : function(form, record) {
			if (record)
				form.getForm().loadRecord(record);
		},
		constructor : function(config) {
			config = Ext.apply({

			}		, config);
			techsupport.systemmanage.MenuWindow.superclass.constructor.call(
					this, config);
		},
		initComponent : function() {
			var mw = this;
			techsupport.systemmanage.MenuWindow.superclass.initComponent
					.call(this);
			this.add([{
				id : this.id + "Form",
				xtype : 'form',
				defaults : {
					xtype : 'textfield',
					allowBlank : false,
					width : 200
				},
				items : [{
					id : 'menucode',
					name : "menucode",
					fieldLabel : '菜单代码',
					blankText : '菜单代码必须输入',
					validator : function(val) {
						if (!val)
							return '菜单代码必须输入';
						if (mw.initRecord
								&& mw.initRecord.data[this.name] == val)
							return true;
						// 远程验证
						var result = "改菜单代码已存在";
						$.ajax({
							url : context_path
									+ '/sysadminDefault/checkMenucode_menu.action',
							data : {
								menucode : val
							},
							success : function(data) {
								if (data.success)
									result = data.success;
							},
							async : false
						});
						return result;
					}
				}, {
					name : 'menuname',
					fieldLabel : '菜单名称',
					blankText : '菜单名称必须输入',
					maxLength : 50,
					maxLengthText : '菜单名称最长50个字符'
				}, {
					id : 'menufullcode',
					name : 'menufullcode',
					fieldLabel : '菜单全码',
					blankText : '菜单全码必须输入',
					allowBlank : true,
					maxLength : 100,
					maxLengthText : '菜单全码最长100个字符',
					readOnly : true
				}, {
					name : 'funcentry',
					fieldLabel : '菜单路径',
					blankText : '菜单路径必须输入',
					maxLength : 500,
					maxLengthText : '菜单路径最长500个字符'
				}, {
					hiddenName : 'system.systemcode',
					fieldLabel : '所属系统',
					blankText : '所属系统必须输入',
					xtype : 'combo',
					store : new Ext.data.JsonStore({
						autoLoad : true,
						idProperty : 'systemcode',
						root : 'systemList',
						url : context_path
								+ '/sysadminDefault/querylistAll_system.action',
						remoteSort : true,
						totalProperty : 'total',
						fields : [{
									name : 'systemcode',
									mapping : 'systemcode'
								}, {
									name : 'systemname',
									mapping : 'systemname'
								}]
					}),
					triggerAction : 'all',
					editable : false,
					valueField : 'systemcode',
					displayField : 'systemname'

				}, {

					name : 'parent.menuname',
					fieldLabel : '父菜单',
					blankText : '父菜单必须输入',
					readOnly : true
				}, {
					name : 'parent.menucode',
					fieldLabel : '父菜单代码',
					blankText : '父菜单代码必须输入',
					readOnly : true,
					hidden : true
				}, {
					id : 'parentMenufullcode',
					name : 'parent.menufullcode',
					blankText : '父菜单全码必须输入',
					fieldLabel : '父菜单全码',
					readOnly : true,
					hidden : true
				}, {
					name : 'isleaf',
					blankText : '是否子菜单必须输入',
					fieldLabel : '是否子菜单',
					value : 'Y',
					hidden : true
				}]
			}]);

			// 设置自动填写菜单全码
			var menucodeField = this.findById('menucode');
			var menufullcodeField = this.findById('menufullcode');
			var parentMenufullcodeField = this.findById('parentMenufullcode');
			var menufullcodeSettingFunc = function() {
				menufullcodeField.setValue(parentMenufullcodeField.getValue()
						+ menucodeField.getValue() + ".");

			};
			menucodeField.on('blur', menufullcodeSettingFunc);

			// 初始化数据
			this.initData(this.findById(this.id + "Form"), this.initRecord);
			// 关闭按钮
			var closeButton = new Ext.Button({
						xtype : 'button',
						text : "关闭",
						handler : function() {
							mw.close();
						}
					});
			if (this.mode == 'add') {
				// 添加模式
				this.addButton([{
							xtype : 'button',
							text : '确认',
							handler : function() {
								var form = mw.findById(mw.id + "Form");
								var params = form.getForm().getValues();

								mw.actions.add(params, mw.store, mw);
							}
						}, closeButton]);
			} else if (this.mode == 'modify') {
				// 修改模式
				this.addButton([{
							xtype : 'button',
							text : '确认',
							handler : function() {
								var form = mw.findById(mw.id + 'Form');
								var params = form.getForm().getValues();
								mw.actions.modify(params, mw.store, mw);
							}
						}, closeButton]);
			} else {
				// 详情模式
				menucodeField.un('blur', menufullcodeSettingFunc);
				// 只读化成员字段
				var form = mw.findById(mw.id + "Form");
				Ext.each(form.find(), function(item, idx, all) {
							if (item.setReadOnly)
								item.setReadOnly(true);
							else if (item.setEditable)
								item.setEditable(true);
							else if (item.setDisable)
								item.setDisable(true);
						});

				this.addButton(closeButton);
			}
		}
	});
}
