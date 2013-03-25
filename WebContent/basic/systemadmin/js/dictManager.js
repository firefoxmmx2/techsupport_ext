/**
 * filename: dictManager.js description: 系统字典管理 fileEncoding: utf8
 */

Ext.ns("techsupport.systemmanage");

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
		constructor : function(config) {

			techsupport.systemmanage.DictManager.superclass.constructor.call(
					this, {
						style:'height:100%',
						renderTo : config.renderTo,
						pagesize : config.pagesize || 25,
						id : config.id || "dictManager",
						// 字典内容表格列
						gridColumnModel : config.gridColumnModel
								|| new Ext.grid.ColumnModel({
											columns : [this.gridSelectionModel,
													{
														header : '字典代码',
														dataIndex : 'dict_code'
													}, {
														header : '字典名称',
														dataIndex : 'dict_name'
													}, {
														header : '字典序号',
														dataIndex : 'sib_order'
													}, {
														header : '维护标记',
														dataIndex : 'maint_flag'
													}, {
														header : '字典类型',
														dataIndex : 'dict_type'
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
						gridStore : config.gridStore
								|| new Ext.data.JsonStore({
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
													name : 'leaf_flag',
													mapping : 'leaf_flag'
												}, {
													name : 'maint_flag',
													mapping : 'maint_flag'
												}, {
													name : 'dict_type',
													mapping : 'dict_type'
												}, {
													name : 'dict_simplepin',
													mapping : 'dict_simplepin'
												}, {
													name : 'dict_allpin',
													mapping : 'dict_allpin'
												}, {
													name : 'dict_itemtablename',
													mapping : 'dict_itemtablename'
												}, {
													name : 'dict_versionid',
													mapping : 'dict_versionid'
												}, {
													name : 'dict_id',
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
															xtype : 'textfield',
															name : 'dict_type',
															fieldLabel : '字典类型',
															maxLength : 50
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
											var params = dm.queryPanel.items
													.itemAt(0).getForm()
													.getValues();
											buildSubmitParam(
													dm.gridStore.baseParams,
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
									ownerCt : dm
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
										initRecord : selectedRecord
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

if (!techsupport.systemmanage.DictWindow) {
	techsupport.systemmanage.DictWindow = Ext.extend(Ext.Window, {});
}