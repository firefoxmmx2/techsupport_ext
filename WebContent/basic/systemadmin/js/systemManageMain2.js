/*******************************************************************************
 * filename: systemManageMain.js description: 系统管理页面组件 主要继承 系统管理页面组件， 对中间部分组件做修改
 * 
 */

Ext.ns("techsupport.systemmanage");

if (!techsupport.systemmanage.SystemWindow) {

	/**
	 * 系统动作，例如增删改详情
	 * 
	 * @param config
	 *            构造参数
	 * @author hooxin
	 * 
	 */
	techsupport.systemmanage.SystemWindow = Ext
			.extend(
					Ext.Window,
					{
						constructor : function(config) {
							this.width = config.width || 300;
							this.layout = config.layout;
							this.title = config.title || '系统';
							this.id = config.id;
							this.defaults = config.defaults || {
								bodyStyle : 'padding: 4px;',
								xtype : 'textfield'
							};
							this.renderTo = config.renderTo || Ext.getBody();
							this.closeAction = config.closeAction || "close";
							this.viewConfig = {
								forceFit : true
							};
							// 设置上层容器
							this.ownerCt = config.ownerCt;
							// 动作名称 例如 add modify detail之类的
							this.action_name = config.action_name || 'detail';
							this.action = config.action;
							this.modal = config.modal || true;
							// 初始化数据
							this.initRecord = config.initRecord;
							// 分页条
							// this.pager = config.pager;

							techsupport.systemmanage.SystemWindow.superclass.constructor
									.apply(this, arguments);
						},
						initComponent : function(ct, position) {
							var self = this;
							// form对象默认值
							this.form_panel_default = {
								xtype : 'textfield',
								columnWidth : .20
							};
							// 内容包含一个form表单
							this.form_panel = Ext
									.create({
										xtype : 'form',
										layout : 'form',
										viewConfig : {
											forceFit : true
										},
										defaults : this.form_panel_default,
										// 面板里面放置系统所需的属性
										items : [
												{
													name : 'systemname',
													fieldLabel : '系统名称',
													allowBlank : false,
													blankText : '系统名称不能空'
												},
												{
													name : 'systemcode',
													fieldLabel : '系统代码',
													allowBlank : false,
													blankText : '系统代码不能为空',
													validationEvent : 'blur',
													validator : function(val) {
														// 验证系统代码是否可用
														if (self.initRecord) {
															if (val == self.initRecord.data[this.name])
																return true;
														}

														var result = false;

														$
																.ajax({
																	url : context_path
																			+ '/sysadminDefault/checkSystemcode_systemmanage.action',
																	data : {
																		'system.systemcode' : val
																	},
																	async : false,
																	success : function(
																			response,
																			opt) {
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
															return '系统代码不可用';
													}
												}, {
													name : 'picturepath',
													fieldLabel : '系统图标'
												}, {
													name : "systemdefine",
													fieldLabel : "系统定义",
													allowBlank : true
												}, {
													name : 'parent.systemname',
													fieldLabel : '上级系统',
													allowBlank : true,
													blankText : '上级系统不能为空',
													readOnly : true
												}, {
													name : 'fullcode',
													fieldLabel : '系统全码',
													allowBlank : false,
													blankText : '系统全码不能为空',
													readOnly : true
												}, {
													name : 'parent.systemcode',
													fieldLabel : '上级系统代码',
													allowBlank : true,
													blankText : '上级系统代码不能为空',
													readOnly : true,
													hidden : true
												}, {
													name : 'parent.isleaf',
													fieldLabel : '上级系统叶子',
													hidden : true,
													readOnly : true
												}, {
													name : 'parent.fullcode',
													fieldLabel : '上级系统全码',
													allowBlank : true,
													blankText : '上级系统全码不能为空',
													readOnly : true,
													hidden : true
												}, {
													name : 'nodeorder',
													fieldLabel : '序列',
													allowBlank : true,
													readOnly : true,
													regex : /^\d*$/,
													regexText : '序列必须为数字',
													hidden : true
												}, {
													name : "isleaf",
													fieldLabel : "子节点",
													regex : /^[YN]*$/,
													hidden : true
												} ]
									});
							// 添加FORM事件
							this.form_panel
									.getForm()
									.findField('systemcode')
									.on(
											'blur',
											function(field) {
												var form = this.form_panel
														.getForm();
												var parentfullcodeField = form
														.findField('parent.fullcode');
												var fullcodeField = form
														.findField('fullcode');
												fullcodeField
														.setValue(parentfullcodeField
																.getValue()
																+ field
																		.getValue()
																+ '.');
											}, this);

							// 初始化表单
							if (this.initRecord) {
								this.form_panel.getForm().setValues(
										buildSubmitParam({},
												this.initRecord.data));
							}

							this.items = [ this.form_panel ];

							if (this.action_name == 'add') {
								this.title = '添加系统信息';
								this.buttons = [
										{
											xtype : 'button',
											text : '保存',
											handler : function() {
												var action = self.action;
												if (self.form_panel.getForm()
														.isValid()) {
													action.add(self.form_panel
															.getForm()
															.getValues());
												}

											}
										}, {
											xtype : 'button',
											text : '关闭',
											handler : function() {
												self.close();
											}
										} ];

							} else if (this.action_name == 'modify') {
								this.title = '修改系统信息';
								var form = self.form_panel.getForm();
								// 显示序列
								var itm = form.findField("nodeorder");

								itm.setReadOnly(false);
								itm.show();

								//
								this.buttons = [
										{
											xtype : 'button',
											text : '保存',
											handler : function() {
												if (self.form_panel.getForm()
														.isValid()) {
													self.action
															.modify(self.form_panel
																	.getForm()
																	.getValues());
												}

											}
										}, {
											xtype : 'button',
											text : '关闭',
											handler : function() {
												self.close();
											}
										} ];
							} else if (this.action_name == 'detail') {
								this.title = '系统信息';
								var form = self.form_panel.getForm();

							}

							techsupport.systemmanage.SystemWindow.superclass.initComponent
									.apply(this, arguments);
						}
					});

}

if (!techsupport.systemmanage.SystemMain) {

	techsupport.systemmanage.SystemMain = Ext
			.extend(
					Ext.Panel,
					{
						title_base : "系统",
						layout : 'border',
						id : 'manage_panal',
						defaults : {
							bodyStyle : 'padding:4px;',
							split : true
						},
						width : '100%',
						height : '100%',
						style : 'height:100%;',
						enableDD : false,
						viewConfig : {
							forceFit : true
						},
						tree_level : 99,
						pagesize : 25,
						dir : "nodeorder",
						addURL : context_path
								+ '/sysadminDefault/add_systemmanage.action',
						modifyURL : context_path
								+ '/sysadminDefault/modify_systemmanage.action',
						queryURL : context_path
								+ '/sysadminDefault/querylist_systemmanage.action',
						detailURL : context_path
								+ '/sysadminDefault/query_systemmanage.action',
						removeURL : context_path
								+ '/sysadminDefault/remove_systemmanage.action',
						actionPrefix : 'system.',
						removePrefix : 'systemList[i]',
						// 详情弹出窗口容器
						detailWindowCt : Ext.getBody(),
						/** 初始化组件内容 */
						initComponent : function(ct, position) {
							var self = this;
							this.action = {
								remove : function(records) {
									var params = [];
									for ( var i = 0; i < records.length; i++) {
										params[i] = records[i].data;
									}

									Ext.Ajax
											.simpleSubmit({
												url : self.removeURL,
												para : params,
												actionPrefix : self.removePrefix,
												successCallback : function(data) {
													self.store.load();
													var currentNode = self.treepanel
															.getNodeById(self.current_treenode_id);
													self.treeloader
															.load(
																	currentNode,
																	function(
																			node) {
																		if (node.childNodes.length == 0)
																			node.leaf = true;
																		node
																				.expand();
																	});

												}
											});
								},
								modify : function(para) {
									Ext.Ajax
											.simpleSubmit({
												url : self.modifyURL,
												para : para,
												actionPrefix : self.actionPrefix,
												successCallback : function(data) {
													self.store.load();
													if (self.window)
														self.window.close();
													var currentNode = self.treepanel
															.getNodeById(self.current_treenode_id);
													self.treeloader
															.load(
																	currentNode,
																	function(
																			node) {
																		if (node.childNodes.length > 0) {
																			node.leaf = false;
																		} else
																			node.leaf = true;

																		node
																				.expand();
																	});
												}
											});
								},
								add : function(para) {
									Ext.Ajax
											.simpleSubmit({
												url : self.addURL,
												para : para,
												actionPrefix : self.actionPrefix,
												successCallback : function(data) {
													self.store.load();
													if (self.window)
														self.window.close();
													var currentNode = self.treepanel
															.getNodeById(self.current_treenode_id);
													self.treeloader
															.load(
																	currentNode,
																	function(
																			node) {
																		if (node.childNodes.length > 0) {
																			node.leaf = false;
																		}

																		node
																				.expand();
																	});
												}
											});
								}
							};
							this.store = new Ext.data.JsonStore(
									{
										idProperty : 'systemcode',
										root : 'systemList',
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
											name : 'systemcode',
											mapping : 'systemcode'
										}, {
											name : 'systemname',
											mapping : 'systemname'
										}, {
											name : 'fullcode',
											mapping : 'fullcode'
										}, {
											name : 'picturepath',
											mapping : 'picturepath'
										}, {
											name : 'isleaf',
											mapping : 'isleaf'
										}, {
											name : 'nodeorder',
											mapping : 'nodeorder'
										}, {
											name : 'parent',
											mapping : 'parent'
										}, {
											name : 'systemdefine',
											mapping : 'systemdefine'
										} ],
										listeners : {
											beforeload : {
												fn : function(store, options) {
													Ext.apply(options.params, {
														dir : this.dir,
														sort : this.sort
													});
													options.params[this.actionPrefix
															+ 'parent.systemcode'] = this.current_treenode_id;
												},
												scope : this
											}

										}
									});

							this.detail_store = new Ext.data.JsonStore({
								idProperty : 'systemcode',
								root : 'systemList',
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
									name : 'systemcode',
									mapping : 'systemcode'
								}, {
									name : 'systemname',
									mapping : 'systemname'
								}, {
									name : 'fullcode',
									mapping : 'fullcode'
								}, {
									name : 'picturepath',
									mapping : 'picturepath'
								}, {
									name : 'isleaf',
									mapping : 'isleaf'
								}, {
									name : 'nodeorder',
									mapping : 'nodeorder'
								}, {
									name : 'parent',
									mapping : 'parent'
								}, {
									name : 'systemdefine',
									mapping : 'systemdefine'
								} ]
							});
							// 复习重新设定父类属性加载器属性
							this.treeloader = new Ext.tree.TreeLoader(
									{
										url : context_path
												+ '/sysadminDefault/querySystemNodes_systemmanage.action', // 设置为系统管理查询节点的链接
										method : 'post',
										listeners : {
											beforeload : {
												fn : function(loader, node) {
													loader.baseParams[this.actionPrefix
															+ 'systemcode'] = node.id;
												},
												scope : this
											}
										}
									});
							this.treepanel = new Ext.tree.TreePanel(
									{
										region : 'west',
										id : this.id + '_tree',
										title : this.title_base + '树',// 以后去掉
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
											enableRowBody : true
										},
										loader : this.treeloader,
										root : {
											id : '0',
											text : '顶端',
											nodeType : 'async'
										},
										listeners : {
											click : function(node, evt) {
												// 子类可以按照自己的需求重载
												this.ownerCt.current_treenode_id = node.id;

												this.ownerCt.store
														.load({
															params : {
																start : 0,
																limit : this.ownerCt.pagesize,
																dir : this.ownerCt.dir,
																desc : this.ownerCt.desc
															}
														});
												// 点击动作
												if (node.id != 0) { // 非根节点的时候，显示右边详情面版和保存按钮
													Ext.getCmp("saveDetailBtn")
															.enable();

													var param = {};
													param[this.ownerCt.actionPrefix
															+ self.store.idProperty] = node.id;
													this.ownerCt.detail_store
															.load({
																params : param,
																callback : function(
																		r,
																		options,
																		success) {
																	var record = this
																			.getAt(0);
																	var form = self.detail_panel
																			.getForm();

																	form
																			.setValues(buildSubmitParam(
																					{},
																					record.data));
																}
															});
												} else {
													// 根节点的时候，关闭右边的详情面版和保存按钮
													Ext.getCmp("saveDetailBtn")
															.disable();
													var form = self.detail_panel
															.getForm();
													form.reset();
													self.detail_store
															.removeAll();
												}

											}
										}
									});

							// 子机构面板
							var sm = new Ext.grid.CheckboxSelectionModel();
							var columnModel = new Ext.grid.ColumnModel({
								columns : [ sm, {
									id : 'systemcode',
									header : this.title_base + '代码',
									dataIndex : 'systemcode',
									width : 100
								}, {
									header : this.title_base + '名称',
									dataIndex : 'systemname',
									width : 300
								}, {
									header : this.title_base + '全码',
									dataIndex : 'fullcode',
									width : 300
								}, {
									header : this.title_base + '定义',
									dataIndex : 'systemdefine',
									width : 300
								} ],
								defaults : {
									sortable : false,
									menuDisabled : false
								}
							});
							this.gridpanel = new Ext.grid.GridPanel(
									{
										id : this.id + '_grid',
										store : this.store,
										border : false,
										viewConfig : {
											forceFit : true
										},
										sm : sm,
										cm : columnModel,
										tbar : [
												{
													xtype : 'button',
													text : '添加',
													handler : function() {
														// 弹出添加窗口
														// 判断是不是已经点击了左边的机构树
														if (self.current_treenode_id) {
															self.window = new techsupport.systemmanage.SystemWindow(
																	{
																		ownerCt : self,
																		action_name : 'add',
																		action : self.action,
																		renderTo : self.detailWindowCt,
																		width : 340
																	});
															self.window
																	.center();
															self.window.show();
															// 初始化添加机构时候的必须数据
															if (self.detail_store
																	.getCount()) {
																var record = self.detail_store
																		.getAt(0);
																var form = self.window.form_panel
																		.getForm();
																form
																		.setValues({
																			'parent.systemcode' : record.data.systemcode,
																			'parent.systemname' : record.data.systemname,
																			'parent.fullcode' : record.data.fullcode
																		});
															} else {
																self.window.form_panel
																		.getForm()
																		.reset();
															}

														} else {
															Ext.MessageBox
																	.alert(
																			"提示",
																			"请选择树形菜单中的"
																					+ self.title_base);
														}
													}
												},
												'-',
												{
													xtype : 'button',
													text : '修改',
													handler : function() {
														// 弹出修改窗口
														var record = self.gridpanel
																.getSelectionModel()
																.getSelected();
														if (record) {
															self.window = new techsupport.systemmanage.SystemWindow(
																	{
																		ownerCt : self,
																		action_name : 'modify',
																		action : self.action,
																		renderTo : self.detailWindowCt,
																		initRecord : record,
																		width : 340
																	});
															self.window
																	.center();
															self.window.show();
														} else
															Ext.MessageBox
																	.alert(
																			"提示",
																			"请选择需要修改的记录");

													}
												},
												'-',
												{
													xtype : 'button',
													text : '删除',
													handler : function() {
														// 执行删除动作
														var records = self.gridpanel
																.getSelectionModel()
																.getSelections();
														if (records
																&& records.length > 0) {
															Ext.MessageBox.buttonText = {
																ok : "确认",
																cancel : "取消",
																yes : "是",
																no : "否"
															};
															Ext.MessageBox
																	.confirm(
																			"提示",
																			"是否确认要删除选择的记录",
																			function(
																					btn,
																					text) {
																				if (btn == 'yes') {
																					self.action
																							.remove(records);
																				}
																			});
														} else
															Ext.MessageBox
																	.alert(
																			"提示",
																			"请选择需要修改的记录");
													}
												},
												'-',
												{
													xtype : 'button',
													text : '置顶',
													handler : function() {
														// 执行置顶动作
													}
												},
												'-',
												{
													xtype : 'button',
													text : '上移',
													handler : function() {
														// 执行上移动作
													}
												},
												'-',
												{
													xtype : 'button',
													text : '下移',
													handler : function() {
														// 执行下移动作
													}
												},
												'-',
												{
													xtype : 'button',
													text : '置底',
													handler : function() {
														// 执行置底动作
													}
												},
												'-',
												'-',
												{
													id : "saveDetailBtn",
													xtype : 'button',
													text : '保存↑',
													handler : function() {
														/* 保存当前系统 */
														var record = this.ownerCt.ownerCt.ownerCt.ownerCt.detail_store
																.getAt(0);
														this.ownerCt.ownerCt.ownerCt.ownerCt.detail_panel
																.getForm()
																.updateRecord(
																		record);
														this.ownerCt.ownerCt.ownerCt.ownerCt.action
																.modify(record.data);
													}
												} ],
										bbar : new Ext.AsinoPagingToolBar({
											store : this.store,
											displayInfo : true,
											pageSize : this.pagesize
										})
									});

							// -------------------------------子系统面板------------------------------------

							// 右边详情显示面板
							var detail_panel_items_defaults = {
								xtype : 'textfield',
								columnWidth : .25
							};

							this.detail_panel = Ext.create({
								xtype : 'form',
								layout : 'column',
								viewConfig : {
									forceFit : true
								},
								frame : false,
								defaults : {
									border : false,
									bodyStyle : 'padding:2',
									labelAlign : 'right'
								},

								// 自动适应浏览器宽度
								items : [ {
									layout : 'form',
									xtype : 'panel',
									defaults : detail_panel_items_defaults,
									items : [ {
										name : 'systemcode',
										fieldLabel : this.title_base + '代码',
										readOnly : true
									}

									]
								}, {
									layout : 'form',
									xtype : 'panel',
									defaults : detail_panel_items_defaults,
									items : [ {
										name : 'systemname',
										fieldLabel : this.title_base + '名称'
									} ]
								}, {
									layout : 'form',
									xtype : 'panel',
									defaults : detail_panel_items_defaults,
									items : [ {
										name : 'fullcode',
										fieldLabel : this.title_base + '全码',
										readOnly : true
									} ]
								}, {
									layout : 'form',
									xtype : 'panel',
									defaults : detail_panel_items_defaults,
									items : [ {
										name : 'systemdefine',
										fieldLabel : this.title_base + '定义'
									} ]
								}, {
									layout : 'form',
									xtype : 'panel',
									defaults : detail_panel_items_defaults,
									items : [ {
										name : 'nodeorder',
										fieldLabel : this.title_base + '序列',
										vtype : "number",
										vtypeText : "输入必须为数字"
									} ]
								}, {
									layout : 'form',
									xtype : 'panel',
									defaults : detail_panel_items_defaults,
									items : [ {
										name : 'picturepath',
										fieldLabel : this.title_base + '图标路径'
									} ]
								}, {
									layout : 'form',
									xtype : 'panel',
									defaults : detail_panel_items_defaults,
									items : [ {
										name : 'isleaf',
										fieldLabel : this.title_base + '子节点'
									} ]
								} ]
							});

							// -----------------------------------------------详情面板------------------------
							// 右边面板
							this.right_panel = Ext.create({
								xtype : 'panel',
								title : this.title_base + '信息',
								region : 'center',
								layout : 'vbox',
								viewConfig : {
									forceFit : true
								},
								items : [ this.detail_panel, this.gridpanel ]
							});
							// ----------------------------右边面板-------------------------------------------
							// 给最外面的面板添加树形菜单和右边的垂直面板
							this.items = [ this.right_panel, this.treepanel ];
							techsupport.systemmanage.SystemMain.superclass.initComponent
									.apply(this, arguments);
						},
						afterRender : function(ct, position) {
							this.body_height = this.getHeight()
									- this.getFrameHeight();
							this.body.setHeight(this.body_height);
							techsupport.systemmanage.SystemMain.superclass.afterRender
									.apply(this, arguments);

							this.treepanel.getRootNode().expand();
							// 设置内容表格高度
							this.grid_body_height = this.right_panel
									.getInnerHeight()
									- this.gridpanel.getFrameHeight()
									- this.detail_panel.getHeight() - 9;
							this.gridpanel.body
									.setHeight(this.grid_body_height);
						}
					// -----------------------------------附加内容结束-------------------------------------
					});
}