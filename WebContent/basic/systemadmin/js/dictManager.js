/**
 * filename: dictManager.js description: 系统字典管理 fileEncoding: utf8
 */

Ext.ns("techsupport.systemmanage");

/**
 * 字典管理
 */
if (!techsupport.systemmanage.DictManager) {
	techsupport.systemmanage.DictManager = Ext.extend(Ext.Panel, {
		id : 'dictManager',
		title : "字典管理",
		defaults : {
			viewConfig : {
				forceFit : true
			},
			bodyStyle : 'padding:4px;'
		},
		actionPrefix : 'dict.',
		removePrefix : 'lDicts[i]',
		gridSelectionModel : new Ext.grid.CheckboxSelectionModel(),
		gridStore : null,
		gridColumnModel : null,
		pagesize : 25,
		dictTypeStore : Ext.create({
					xtype : 'arraystore',
					id : 0,
					fields : ['value', 'display'],
					data : [['01', '普通字典'], ['02', '树形字典']]
				}),
		maintFlagStore : Ext.create({
					xtype : 'arraystore',
					id : 0,
					fields : ['value', 'display'],
					data : [['0', '维护'], ['1', '不维护']]
				}),
		actions : {
			addURL : context_path + '/sysadminDefault/add_dict.action',
			modifyURL : context_path + '/sysadminDefault/modify_dict.action',
			queryURL : context_path + '/sysadminDefault/querylist_dict.action',
			detailURL : context_path + '/sysadminDefault/query_dict.action',
			removeURL : context_path + '/sysadminDefault/remove_dict.action',
			add : function(data, store, window) {
				Ext.Ajax.request({
							url : this.addURL,
							params : {
								aDict : Ext.encode(data)
							},
							success : function(response, options) {
								if (response.responseJSON) {
									var data = response.responseJSON;

									if (data.success) {
										if (data.returnMessage)
											Ext.example.msg("成功",
													data.returnMessage);
										window.close();
										store.load();
									} else {
										if (data.returnMessage) {
											Ext.example.msg("错误",
													data.returnMessage);
											if (data.returnMessageDebug) {
												Ext.example
														.msg(
																"具体",
																data.returnMessageDebug);
											}
										}
									}
								}
							}
						});
			},
			modify : function(data, store, window) {
				Ext.Ajax.request({
							url : this.modifyURL,
							params : {
								mDict : Ext.encode(data)
							},
							success : function(response, options) {
								if (response.responseJSON) {
									var data = response.responseJSON;

									if (data.success) {
										if (data.returnMessage)
											Ext.example.msg("成功",
													data.returnMessage);
										window.close();
										store.load();
									} else {
										if (data.returnMessage) {
											Ext.example.msg("错误",
													data.returnMessage);
											if (data.returnMessageDebug) {
												Ext.example
														.msg(
																"具体",
																data.returnMessageDebug);
											}
										}
									}
								}
							}
						});
			},
			remove : function(data, store) {
				Ext.Ajax.request({
							url : this.removeURL,
							params : {
								rlDicts : Ext.encode(data)
							},
							success : function(response, options) {
								if (response.responseJSON) {
									var data = response.responseJSON;

									if (data.success) {
										if (data.returnMessage)
											Ext.example.msg("成功",
													data.returnMessage);
										store.load();
									} else {
										if (data.returnMessage) {
											Ext.example.msg("错误",
													data.returnMessage);
											if (data.returnMessageDebug) {
												Ext.example
														.msg(
																"具体",
																data.returnMessageDebug);
											}
										}
									}
								}
							}
						});
			}
		},
		constructor : function(config) {
			var dm = this;
			techsupport.systemmanage.DictManager.superclass.constructor.call(
					this, {
						style : 'height:100%',
						renderTo : config.renderTo,
						pagesize : config.pagesize || 25,
						id : config.id || "dictManager",
						// 字典内容表格列
						gridColumnModel : config.gridColumnModel
								|| new Ext.grid.ColumnModel({
									columns : [this.gridSelectionModel, {
										header : '字典代码',
										dataIndex : 'dict_code',
										renderer : function(value) {
											if (value)
												return '<a href="#">' + value
														+ '</a>'
										},
										listeners : {
											click : function(col, grid,
													rowIndex, evt) {
												var dictDetailWindow = new techsupport.systemmanage.DictWindow(
														{
															ownerCt : grid.ownerCt,
															mode : 'detail',
															initRecord : grid
																	.getSelectionModel()
																	.getSelected(),
															dictTypeStore : grid.ownerCt.dictTypeStore,
															maintFlagStore : grid.ownerCt.maintFlagStore
														});
												dictDetailWindow.center();
												dictDetailWindow.show();
											}
										}
									}, {
										header : '字典名称',
										dataIndex : 'dict_name'
									}, {
										header : '字典序号',
										dataIndex : 'sib_order'
									}, {
										header : '维护标记',
										dataIndex : 'maint_flag',
										renderer : function(value) {
											return value != undefined
													? dm.maintFlagStore
															.getById(value).data.display
													: value;
										}
									}, {
										header : '字典类型',
										dataIndex : 'dict_type',
										renderer : function(value) {
											return value
													? dm.dictTypeStore
															.getById(value).data.display
													: value;
										}
									}, {
										header : '字典版本',
										dataIndex : 'dict_versionid'
									}],
									defaults : {
										sortable : true,
										menuDisabled : true,
										autoFill : true
									}
								}),
						// 内容数据
						gridStore : config.gridStore || new Ext.data.Store({
									proxy : new Ext.data.HttpProxy({
												url : this.actions.queryURL
											}),
									reader : new Ext.data.JsonReader({
												root : "lDicts",
												idProperty : 'dict_code',
												totalProperty : 'total',
												messageProperty : 'returnMessage',
												fields : [{
															name : 'dict_code',
															mapping : 'dict_code'
														}, {
															name : 'dict_name',
															mapping : 'dict_name'
														}, {
															name : 'super_dict_code',
															mapping : 'super_dict_code'
														}, {
															name : 'sib_order',
															mapping : 'sib_order'
														}, {
															name : 'maint_flag',
															mapping : 'maint_flag'
														}, {
															name : 'dict_type',
															mapping : 'dict_type'
														}, {
															name : 'dict_versionid',
															mapping : 'dict_versionid'
														}, {
															name : 'dict_id',
															mapping : "dict_id"
														}]
											}),
									baseParams : {
										start : 0,
										limit : this.pagesize
									},
									autoSave : false
								})
					});
		},
		initComponent : function() {
			var dm = this;
			techsupport.systemmanage.DictManager.superclass.initComponent
					.call(this);
			// this.items = [];
			// 查询面板
			this.queryPanel = new Ext.Panel({
						id : this.getId() + "QueryPanel",
						width : '100%',
						autoHeight : true,
						items : [{
									xtype : 'form',
									layout : 'column',
									border : false,
									frame : false,
									defaults : {
										labelAlign : 'right',
										layout : 'form',
										xtype : 'panel',
										border : false

									},
									items : [{

												items : [{
															xtype : 'textfield',
															name : 'dict_code',
															fieldLabel : '字典代码',
															maxLength : 40

														}]
											}, {
												items : [{
															xtype : 'textfield',
															name : 'dict_name',
															fieldLabel : '字典名称',
															maxLength : 50
														}]
											}, {
												items : [{
															xtype : 'combo',
															hiddenName : 'dict_type',
															fieldLabel : '字典类型',
															triggerAction : 'all',
															mode : 'local',
															editable : false,
															store : this.dictTypeStore,
															valueField : 'value',
															displayField : 'display'
														}]
											}]

								}, {
									xtype : 'panel',
									layout : 'hbox',
									layoutConfig : {
										padding : '2 10 2 2',
										pack : 'end'
									},
									defaults : {
										margins : '5 5 0 0',
										width : 75
									},
									border : false,
									frame : false,
									items : [{
										xtype : 'button',
										text : '查询',
										handler : function() {
											var params = {
												qDict : Ext
														.encode(dm.queryPanel.items
																.itemAt(0)
																.getForm()
																.getValues())
											};
											Ext.apply(dm.gridStore.baseParams,
													params);
											dm.gridStore.load();
										}
									}, {
										xtype : 'button',
										text : '重置',
										handler : function() {
											dm.queryPanel.items.itemAt(0)
													.getForm().reset();
										}
									}]
								}]

					});
			this.add(this.queryPanel);

			// 表格面板
			this.gridPanel = new Ext.grid.GridPanel({
				id : this.getId() + "GridPanel",
				sm : this.gridSelectionModel,
				colModel : this.gridColumnModel,
				store : this.gridStore,
				tbar : [{
					xtype : 'button',
					text : '添加',
					handler : function() {
						var dictAddWindow = new techsupport.systemmanage.DictWindow(
								{
									ownerCt : dm,
									mode : 'add',
									store : dm.gridStore,
									actions : dm.actions,
									maintFlagStore : dm.maintFlagStore,
									dictTypeStore : dm.dictTypeStore
								});

						dictAddWindow.center();
						dictAddWindow.show();
					}
				}, {
					xtype : 'button',
					id : this.getId() + 'ModifyBtn',
					text : '修改',
					handler : function() {
						var selectedRecord = dm.gridSelectionModel
								.getSelected();
						if (selectedRecord) {
							var dictModifyWindow = new techsupport.systemmanage.DictWindow(
									{
										ownerCt : dm,
										initRecord : selectedRecord,
										mode : 'modify',
										store : dm.gridStore,
										actions : dm.actions,
										maintFlagStore : dm.maintFlagStore,
										dictTypeStore : dm.dictTypeStore
									});
							dictModifyWindow.center();
							dictModifyWindow.show();
						} else {
							Ext.MessageBox.alert("警告", "请选择需要修改的记录");
						}
					}
				}, {
					xtype : 'button',
					text : '删除',
					handler : function() {
						var selections = dm.gridSelectionModel.getSelections();
						if (selections) {
							var lNeedRemoves = [];
							for (var i = 0; i < selections.length; i++) {
								lNeedRemoves.push(selections[i].data);
							}
							dm.actions.remove(lNeedRemoves, dm.gridStore);
						} else {
							Ext.MessageBox.alert("警告", "请选择需要删除的记录");
						}
					}
				}],
				bbar : [{
							xtype : 'aisinopagebar',
							store : this.gridStore
						}]
			});
			this.add(this.gridPanel);
		},
		afterRender : function(ct, position) {
			techsupport.systemmanage.DictManager.superclass.afterRender.apply(
					this, arguments);
			// 设置内容表格高度
			this.gridBodyHeight = this.getHeight() - this.getFrameHeight()
					- this.gridPanel.getFrameHeight()
					- this.queryPanel.getHeight() - 2;
			this.gridPanel.body.setHeight(this.gridBodyHeight);
		}
	});
}

/**
 * 字典窗口
 */
if (!techsupport.systemmanage.DictWindow) {
	techsupport.systemmanage.DictWindow = Ext.extend(Ext.Window, {
		constructor : function(config) {
			techsupport.systemmanage.DictWindow.superclass.constructor.call(
					this, {
						id : config.id || 'dictWindow',
						width : config.width || 360,
						height : config.height,
						closeAction : 'close',
						title : '字典',
						defaults : {
							padding : '2 2 2 2',
							viewConfig : {
								forceFit : true
							}
						},
						modal : true,
						initRecord : config.initRecord,
						ownerCt : config.ownerCt,
						mode : config.mode || 'detail',
						renderTo : config.renderTo || Ext.getBody(),
						store : config.store,
						dictTypeStore : config.dictTypeStore,
						maintFlagStore : config.maintFlagStore,
						actions : config.actions
					});
		},
		init : function() {
			var dw = this;
			if (this.initRecord) {
				this.formPanel.getForm().loadRecord(this.initRecord);
			}
		},
		initComponent : function() {
			var dw = this;
			techsupport.systemmanage.DictWindow.superclass.initComponent
					.call(this);

			this.formPanel = Ext.create({
				xtype : 'form',
				id : this.id + "Form",
				labelAlign : 'right',
				defaults : {
					xtype : 'textfield',
					width : 200
				},
				items : [{
					id : 'dict_code',
					name : 'dict_code',
					fieldLabel : '字典代码',
					validator : function(value) {
						if (!value)
							return '字典代码必须输入';
						if (dw.initRecord
								&& dw.initRecord.data.dict_code == value)
							return true;
						var result = '该字典代码已经存在';
						var params = {
							cDict : Ext.encode({
										'dict_code' : value
									})
						};
						$.ajax({
							url : context_path
									+ '/sysadminDefault/checkDictcode_dict.action',
							data : params,
							async : false,
							dataType : 'json',
							success : function(data, options) {
								if (data.success)
									result = true;
							}
						});
						return result;
					},
					validationEvent : 'blur',
					maxLength : 30
				}, {
					id : 'dict_name',
					name : 'dict_name',
					allowBlank : false,
					blankText : '字典名称必须输入',
					fieldLabel : '字典名称',
					maxLength : 50
				}, {
					id : 'sib_order',
					name : 'sib_order',
					fieldLabel : '字典序号',
					maxLength : 5
				}, {
					id : 'maint_flag',
					xtype : 'combo',
					hiddenName : 'maint_flag',
					allowBlank : false,
					blankText : '维护标记必须输入',
					fieldLabel : '维护标记',
					triggerAction : 'all',
					mode : 'local',
					editable : false,
					store : this.maintFlagStore,
					valueField : 'value',
					displayField : 'display'
				}, {
					id : 'dict_type',
					hiddenName : 'dict_type',
					fieldLabel : '字典类型',
					allowBlank : false,
					blankText : '字典类型必须输入',
					xtype : 'combo',
					triggerAction : 'all',
					mode : 'local',
					editable : false,
					store : this.dictTypeStore,
					valueField : 'value',
					displayField : 'display'
				}, {
					id : 'dict_versionid',
					name : 'dict_versionid',
					fieldLabel : '字典版本',
					defaultValue : 1
				}]
			})

			this.add(this.formPanel);

			// 初始化数据
			this.init();

			// 添加模式
			if (this.mode == 'add') {
				this.title += "添加";
//				隐藏不需要的字段
				sibFlagField = this.formPanel.findById('sib_order');
				sibFlagField.hide();
				// 添加 添加的确认按钮，保存时候出发
				this.addButton({
							xtype : 'button',
							text : '确定',
							handler : function() {
								if (dw.formPanel.getForm().isValid()) {
									var data = dw.formPanel.getForm()
											.getValues();
									dw.actions.add(data, dw.store, dw);
								}

							}
						});
				this.addButton({
							xtype : 'button',
							text : '关闭',
							handler : function() {
								dw.close();
							}
						});
				// 修改模式
			} else if (this.mode == 'modify') {
				this.title += "修改";
				// 想gridStore里面保存修改的记录
				this.addButton({
							xtype : 'button',
							text : '确定',
							handler : function() {
								if (dw.formPanel.getForm().isValid()) {
									dw.actions.modify(data, store, dw);
								}
							}
						});
				this.addButton({
							xtype : 'button',
							text : '关闭',
							handler : function() {
								dw.close();
							}
						});
			} else { // 默认详情模式
				this.title += "详情";
				Ext.each(this.formPanel.find(),function(item,idx,all){
					if(item.setReadOnly)
						item.setReadOnly(true);
					else if(item.setDisable)
						item.setDisable(true);
				});
				this.addButton({
							xtype : 'button',
							text : '关闭',
							handler : function() {
								dw.close();
							}
						});
			}
		}
	});
}