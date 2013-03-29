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
		addURL : context_path + '/sysadminDefault/add_dict.action',
		modifyURL : context_path + '/sysadminDefault/modify_dict.action',
		queryURL : context_path + '/sysadminDefault/querylist_dict.action',
		detailURL : context_path + '/sysadminDefault/query_dict.action',
		removeURL : context_path + '/sysadminDefault/remove_dict.action',
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
										dataIndex : this.actionPrefix
												+ 'dict_code'
									}, {
										header : '字典名称',
										dataIndex : this.actionPrefix
												+ 'dict_name'
									}, {
										header : '字典序号',
										dataIndex : this.actionPrefix
												+ 'sib_order'
									}, {
										header : '维护标记',
										dataIndex : this.actionPrefix
												+ 'maint_flag',
										renderer : function(value) {
												return value!=undefined? dm.maintFlagStore
													.getById(value).data.display : value;
										}
									}, {
										header : '字典类型',
										dataIndex : this.actionPrefix
												+ 'dict_type',
										renderer : function(value) {
											return value? dm.dictTypeStore
													.getById(value).data.display : value;
										}
									}, {
										header : '字典版本',
										dataIndex : this.actionPrefix
												+ 'dict_versionid'
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
												api : {
													read : this.queryURL,
													create : this.addURL,
													update : this.modifyURL,
													desctroy : this.removeURL
												}
											}),
									reader : new Ext.data.JsonReader({
												root : "lDicts",
												idProperty : 'dict_code',
												totalProperty : 'total',
												messageProperty:'returnMessage',
												fields : [{
													name : this.actionPrefix
															+ 'dict_code',
													mapping : 'dict_code'
												}, {
													name : this.actionPrefix
															+ 'dict_name',
													mapping : 'dict_name'
												}, {
													name : this.actionPrefix
															+ 'super_dict_code',
													mapping : 'super_dict_code'
												}, {
													name : this.actionPrefix
															+ 'sib_order',
													mapping : 'sib_order'
												}, {
													name : this.actionPrefix
															+ 'leaf_flag',
													mapping : 'leaf_flag'
												}, {
													name : this.actionPrefix
															+ 'maint_flag',
													mapping : 'maint_flag'
												}, {
													name : this.actionPrefix
															+ 'dict_type',
													mapping : 'dict_type'
												}, {
													name : this.actionPrefix
															+ 'dict_simplepin',
													mapping : 'dict_simplepin'
												}, {
													name : this.actionPrefix
															+ 'dict_allpin',
													mapping : 'dict_allpin'
												}, {
													name : this.actionPrefix
															+ 'dict_itemtablename',
													mapping : 'dict_itemtablename'
												}, {
													name : this.actionPrefix
															+ 'dict_versionid',
													mapping : 'dict_versionid'
												}, {
													name : this.actionPrefix
															+ 'dict_id',
													mapping : "dict_id"
												}]
											}),
									writer : new Ext.data.JsonWriter({
												encode : true
											}),
									baseParams : {
										start : 0,
										limit : this.pagesize
									}
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
											name : this.actionPrefix
													+ 'dict_code',
											fieldLabel : '字典代码',
											maxLength : 40

										}]
							}, {
								items : [{
											xtype : 'textfield',
											name : this.actionPrefix
													+ 'dict_name',
											fieldLabel : '字典名称',
											maxLength : 50
										}]
							}, {
								items : [{
									xtype : 'combo',
									hiddenName : this.actionPrefix
											+ 'dict_type',
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
									var params = dm.queryPanel.items.itemAt(0)
											.getForm().getValues();
									Ext.apply(dm.gridStore.baseParams, params);
									dm.gridStore.load();
								}
							}, {
								xtype : 'button',
								text : '重置',
								handler : function() {
									dm.queryPanel.items.itemAt(0).getForm()
											.reset();
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
									actionPrefix : dm.actionPrefix,
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
						var selectedRecord = dm.gridSelectionModel()
								.getSelected();
						if (selectedRecord) {
							var dictModifyWindow = new techsupport.systemmanage.DictWindow(
									{
										ownerCt : dm,
										initRecord : selectedRecord,
										mode : 'modify',
										store : dm.gridStore,
										actionPrefix : dm.actionPrefix,
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
						var selections = dm.gridSelectionModel()
								.getSelections();
						if (selections) {
							dm.gridStore.remove(selections);
							dm.gridStore.save();
						} else {
							Ext.MessageBox.alert("警告", "请选择需要修改的记录");
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
						actionPrefix:config.actionPrefix || dw.ownerCt.actionPrefix
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
									name : this.actionPrefix + 'dict_code',
									fieldLabel : '字典代码',
									maxLength : 30
								}, {
									id : 'dict_name',
									name : this.actionPrefix + 'dict_name',
									fieldLabel : '字典名称',
									maxLength : 50
								}, {
									id : 'sib_order',
									name : this.actionPrefix + 'sib_order',
									fieldLabel : '字典序号',
									maxLength : 5
								}, {
									id : 'maint_flag',
									xtype : 'combo',
									hidenName : this.actionPrefix
											+ 'maint_flag',
									fieldLabel : '维护标记',
									triggerAction : 'all',
									mode : 'local',
									editable : false,
									store : this.maintFlagStore,
									valueField : 'value',
									displayField : 'display'
								}, {
									id : 'dict_type',
									hiddenName : this.actionPrefix
											+ 'dict_type',
									fieldLabel : '字典类型',
									xtype : 'combo',
									triggerAction : 'all',
									mode : 'local',
									editable : false,
									store : this.dictTypeStore,
									valueField : 'value',
									displayField : 'display'
								}, {
									id : 'dict_versionid',
									name : this.actionPrefix + 'dict_versionid',
									fieldLabel : '字典版本'
								}]
					})

			this.add(this.formPanel);

			// 初始化数据
			this.init();

			// 添加模式
			if (this.mode == 'add') {
				// 添加 添加的确认按钮，保存时候出发
				this.addButton({
							xtype : 'button',
							text : '确定',
							handler : function() {
								if (dw.formPanel.getForm().isValid()) {
									var data = dw.formPanel.getForm()
											.getValues();
									var fields = dw.store.fields.keys;
									var columns = [];
									var recordData = [];
									for (var i = 0; i < fields.length; i++) {
										if (data[fields[i]]) {
											recordData.push(data[fields[i]]);
											columns.push(fields[i]);
										}

									}
									var NewRecord = Ext.data.Record.create(
											columns,
											dw.actionPrefix + 'dict_code');
									var record = new NewRecord(data);
									dw.store.add(record);
									record.commit();
									dw.store.load();
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
				// 想gridStore里面保存修改的记录
				this.addButton({
							xtype : 'button',
							text : '确定',
							handler : function() {

								if (dw.formPanel.getForm().isValid()) {
									dw.formPanel.getForm()
											.updateRecord(this.initRecord);
									if (dw.gridStore.getModifiedRecords().length) {
										dw.store.save();
									}

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
				this.formPanel.setDisable(true);
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