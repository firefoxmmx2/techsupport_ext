/**
 * filename:departmentManageMan.js 
 * description:机构管理页面
 */

	Ext.ns("techsupport.deparmentmanage");


	if(!techsupport.deparmentmanage.DepartmentWindow){
		/**
		 * 机构动作，例如增删改详情
		 * @param config 构造参数
		 * @author hooxin
		 *
		 */
		techsupport.deparmentmanage.DepartmentWindow = Ext.extend(Ext.Window,{
			constructor: function(config){
				this.width = config.width || 300;
				this.layout = config.layout;
				this.title = config.title || '机构';
				this.id = config.id;
				this.defaults = config.defaults || { bodyStyle : 'padding: 4px;',xtype:'textfield'};
				this.renderTo = config.renderTo || Ext.getBody();
				this.closeAction=config.closeAction || "close";
				this.viewConfig = {
						forceFit:true
				};
//				设置上层容器
				this.ownerCt = config.ownerCt;
//				动作名称 例如 add modify detail之类的
				this.action_name = config.action_name || 'detail';
				this.action = config.action;
				this.modal = config.modal || true;
				//初始化数据
				this.initRecord = config.initRecord;
				
				techsupport.deparmentmanage.DepartmentWindow.superclass.constructor.apply(this,arguments);
			},
			initComponent:function(ct,position){
				var self = this;
				//form对象默认值
				this.form_panel_default = {
					xtype:'textfield',
					columnWidth:.20
				};
				//内容包含一个form表单
				this.form_panel = Ext.create({
					xtype:'form',
					layout:'form',
					viewConfig:{ forceFit:true},
					defaults:this.form_panel_default,
//					面板里面放置机构所需的属性
					items:[
					      {name:'departid',fieldLabel:'机构ID',xtype:'hidden'},
					      {name:'departname',fieldLabel:'机构名称',allowBlank:false,blankText:'机构名称不能空'},
					      {name:'departcode',fieldLabel:'机构代码',allowBlank:false,blankText:'机构代码不能为空',
					    	  validationEvent:'blur',
					    	  validator:function(val){
					    		  //验证机构代码是否可用
					    		  if(self.initRecord){
					    			  if(val == self.initRecord.data[this.name])
					    				  return true;
					    		  }
					    		  var result = false;
					    		  Ext.Ajax.request({url:context_path+'/sysadminDefault/check_departcode_department.action',
					    			  params:{'department.departcode':val},
					    			  async:false,
					    			  success:function(response,opt){
					    				  var data = Ext.decode(response.responseText);
					    				  if(!data.returnNo)
					    					  result = true;
					    				  else
					    					  result = false;
					    			  }
					    		  });
					    		  if(result)
					    			  return true;
					    		  else
					    			  return '机构代码不可用';
					    	  }
					      },
					      {name:'departlevel',fieldLabel:'机构级别',readOnly:true,hidden:true},
					      {name:'parent.departname',fieldLabel:'上级机构',allowBlank:false,blankText:'上级机构不能为空',readOnly:true},
					      {name:'departfullcode',fieldLabel:'机构全码',allowBlank:false,blankText:'机构全码不能为空',readOnly:true},
					      {name:'parent.departid',fieldLabel:'上级机构ID',allowBlank:false,blankText:'上级机构ID不能为空',readOnly:true,hidden:true},
					      {name:'parent.isleaf',fieldLabel:'上级机构叶子',hidden:true,readOnly:true},
					      {name:'parent.departfullcode',fieldLabel:'上级机构全码',allowBlank:false,blankText:'上级机构全码不能为空',readOnly:true,hidden:true},
					      {name:'nodeorder',fieldLabel:'序列',allowBlank:true,readOnly:true,regex:/^\d*$/,regexText:'序列必须为数字',hidden:true}
					      
					]
				});
				if(self.initRecord)
					this.form_panel.getForm().setValues(buildSubmitParam({},self.initRecord.data));
				//添加FORM事件
				this.form_panel.getForm().findField('departcode').on('blur',function(field){
		    				  	var form = this.form_panel.getForm();
				    		    var parentfullcodeField = form.findField('parent.departfullcode');
								var fullcodeField = form.findField('departfullcode');
								fullcodeField.setValue(parentfullcodeField.getValue()+field.getValue()+'.');
				    	  },
		    			  this
		    		  );
				
				this.items = [this.form_panel];
				
				if(this.action_name=='add'){
					this.title='添加机构信息';
					this.buttons = [
					     {
					    	 xtype:'button',text:'保存',handler:function(){
					    		 var action = self.action;
					    		 if(self.form_panel.getForm().isValid()){
					    			 action.add(self.form_panel.getForm().getValues());
					    		 }
					    		 
					    	 }
					     },
					     {xtype:'button',text:'关闭',handler:function(){
					    	 self.close();
					     }}
					];

				}
				else if (this.action_name == 'modify'){
					this.title = '修改机构信息';
					var form = self.form_panel.getForm();
					//显示序列
					var itm = form.findField("nodeorder");
					
					itm.setReadOnly(false);
					itm.show();
					//
					this.buttons = [
					    {
					    	xtype:'button',text:'保存',handler:function(){
					    		self.form_panel.getForm().findField('nodeorder').setVisable(true);
					    		if(self.form_panel.getForm().isValid()){
					    			self.action.modify(self.form_panel.getForm().getValues());
					    		}
					    		
					    	}
					    },
					    {
					    	xtype:'button',text:'关闭',handler:function(){
					    		self.close();
					    	}
					    }
					];
				}
				else if (this.action_name == 'detail'){
					this.title = '机构信息';
				}
				
				techsupport.deparmentmanage.DepartmentWindow.superclass.initComponent.apply(this,arguments);
			},
			afterRender:function(ct,position){
				techsupport.deparmentmanage.DepartmentWindow.superclass.afterRender.apply(this,arguments);
			}
		});
	}
	
	
	if(!techsupport.deparmentmanage.DepartmentMain){
		techsupport.deparmentmanage.DepartmentMain = Ext.extend(Ext.Panel, {
			title_base:'机构',
			layout:'border',
			id:'manage_panal',
			defaults:{
				bodyStyle : 'padding:4px;',
					split : true
			},
			width:'100%',
			height:'100%',
			style:'height:100%;',
			enableDD:false,
			viewConfig:{
				forceFit:true
			},
			tree_level:99,
			pagesize:25,
			addURL:context_path+'/sysadminDefault/add_department.action',
			modifyURL:context_path+'/sysadminDefault/modify_department.action',
			removeURL:context_path+'/sysadminDefault/remove_department.action',
			queryURL:context_path+'/sysadminDefault/querylist_department.action',
			detailURL:context_path+'/sysadminDefault/query_department.action',
			actionPrefix : 'department.',
			removePrefix : 'department_list[i]',
			//详情弹出窗口容器
			detailWindowCt : Ext.getBody(),
			
			/** 初始化组件内容 */
			initComponent : function(ct,position) {
				var self = this;
				this.action = {
						remove:function(records){
							var para = [];
							for(var i=0;i< records.length;i++){
								para.push(records[i].data);
							}
							
							Ext.Ajax.simpleSubmit({url:self.removeURL,para:para,actionPrefix:self.removePrefix,
								successCallback:function(data){
									self.store.load();
									var currentNode = self.treepanel.getNodeById(self.current_treenode_id);
									
									self.treeloader.load(currentNode,function(node){
										if(node.childNodes.length=0)
											node.leaf=true;
										
										currentNode.expand();
									});
								}
							});
						},
						modify:function(para){
							Ext.Ajax.simpleSubmit({url:self.modifyURL,para:para,actionPrefix:self.actionPrefix,successCallback:function(data){
								self.store.load();
								self.window.close();
								var currentNode = self.treepanel.getNodeById(self.current_treenode_id);
								self.treeloader.load(currentNode,function(){
									if(currentNode.childNodes.length>0){
										currentNode.leaf=false;
									}
									else
										currentNode.leaf=true;
									currentNode.expand();
								});
							}});
						},
						add:function(para){
							Ext.Ajax.simpleSubmit({url:self.addURL,para:para,actionPrefix:self.actionPrefix,successCallback:function(data){
								self.store.load();
								self.window.close();
								var currentNode = self.treepanel.getNodeById(self.current_treenode_id);
								self.treeloader.load(currentNode,function(){
									if(currentNode.childNodes.length>0){
										currentNode.leaf=false;
									}
									currentNode.expand();
									
								});
							}});
						}
				};
				this.store =  new Ext.data.JsonStore( {
					idProperty:'departid',
					root:'department_list',
					url:this.queryURL,
					baseParams:{
						start:0,
						limit:this.pagesize,
						dir:this.dir,
						sort:this.sort
					},
					remoteSort:true,
					totalProperty:'total',
					fields:[
						{name:'departid',mapping:'departid'},
						{name:'departcode',mapping:'departcode'},
						{name:'departname',mapping:'departname'},
						{name:'departfullcode',mapping:'departfullcode'},
						{name:'departlevel',mapping:'departlevel'},
						{name:'isleaf',mapping:'isleaf'},
						{name:'nodeorder',mapping:'nodeorder'},
						{name:'parent',mapping:'parent'},
						{name:'departbrevitycode',mapping:'departbrevitycode'}
					],
					listeners:{
						beforeload:{
							fn:function(store,options){
								Ext.apply(options.params,{
									dir:this.dir,
									sort:this.sort
								});
								options.params[this.actionPrefix+'parent.departid']=this.current_treenode_id;
							},
							scope:this
						}
						
					}
					});
				
				
				this.detail_store = new Ext.data.JsonStore({
					idProperty:'departid',
					root:'department_list',
					url:this.queryURL,
					baseParams:{
						start:0,
						limit:this.pagesize,
						dir:this.dir,
						sort:this.sort
					},
					remoteSort:true,
					totalProperty:'total',
					fields:[
						{name:'departid',mapping:'departid'},
						{name:'departcode',mapping:'departcode'},
						{name:'departname',mapping:'departname'},
						{name:'departfullcode',mapping:'departfullcode'},
						{name:'departlevel',mapping:'departlevel'},
						{name:'isleaf',mapping:'isleaf'},
						{name:'nodeorder',mapping:'nodeorder'},
						{name:'parent',mapping:'parent'},
						{name:'departbrevitycode',mapping:'departbrevitycode'}
					]
					});
				
				this.treeloader = new Ext.tree.TreeLoader({
					url:context_path+'/sysadminDefault/queryDepartmentNode_department.action',
					method:'post',
					listeners:{
						beforeload:{
							fn:function(loader,node){
								loader.baseParams[this.actionPrefix+'departid'] = node.id;
								loader.baseParams[this.actionPrefix+'departlevel'] = this.tree_level;
							},
							scope:this
						}
					}});
				this.treepanel = new Ext.tree.TreePanel({
					region : 'west',
					id : this.id+'_tree',
					title : this.title_base +'树',// 以后去掉
					useArrows : true,
					autoScroll : true,
					animate : true,
					enableDD : false,
					containerScroll : true,
					border : false,
					width: '25%',
					rootVisable : false,
					viewConfig:{
						forceFit:true,
						enableRowBody:true
					},
					loader:this.treeloader,
					root:{id:'0',text:'顶端',nodeType: 'async'},
					listeners:{
						click:function(node,evt){
							//点击动作
//							子类可以按照自己的需求重载
							this.ownerCt.current_treenode_id = node.id;
							
							this.ownerCt.store.load(
									{
										params:{
											start:0,
											limit:this.ownerCt.pagesize,
											dir:this.ownerCt.dir,
											sort:this.ownerCt.sort
										}
									}
							);
							if(node.id != 0){//非根节点的时候，显示右边详情面版和保存按钮
								this.ownerCt.detail_panel.show();
								Ext.getCmp("saveDetailBtn").enable();
								
								var param={};
								param[this.ownerCt.actionPrefix+self.store.idProperty]=node.id;
								this.ownerCt.detail_store.load({params:param,callback:function(r,options,success){
									var record = this.getAt(0);
									var form = self.detail_panel.getForm();
								
									form.setValues(buildSubmitParam({},record.data));
								}});
							}
							else {
								//根节点的时候，关闭右边的详情面版的保存按钮
								Ext.getCmp("saveDetailBtn").disable();
								var form = this.ownerCt.detail_panel.getForm();
								form.reset();
							}
							
							
						}
					}
				});

//				子机构面板
				var sm = new Ext.grid.CheckboxSelectionModel();
				var columnModel = new Ext.grid.ColumnModel({
				    columns:[
					    sm,
						{header: '机构ID', dataIndex: 'departid', sortable: false,width:100},
						{header: this.title_base+'代码',dataIndex:'departfullcode',width:300},
						{header: this.title_base+'名称',dataIndex:'departname',width:300},
						{header:'上级'+this.title_base,dataIndex:'parent',renderer:function(obj){return obj?obj.departname:null;},width:300}
					],
				    defaults: {
				        sortable: false,
				        menuDisabled: false
				    }
				    
				});
				this.gridpanel = new Ext.grid.GridPanel({
					id : this.id+'_grid',
					store : this.store,
					border:false,
					viewConfig:{
						forceFit:true
					},
					sm:sm,
					cm:columnModel,
					tbar:[
							{xtype:'button',
							cls:'x-btn-text-icon',
							iconCls:'icon-add',text:'添加',handler:function(){
//								弹出添加窗口
//								判断是不是已经点击了左边的机构树
								if(self.current_treenode_id && self.current_treenode_id > 0){
									 self.window = new techsupport.deparmentmanage.DepartmentWindow({
										ownerCt:self,action_name:'add',action:self.action,
										renderTo:self.detailWindowCt,
										store:self.store,
										dstore:self.detail_store,
										width:340
									});
									 self.window.center();
									 self.window.show();
//									初始化添加机构时候的必须数据
									 if(self.detail_store.getCount()){
										 var record = self.detail_store.getAt(0);
										 var form = self.window.form_panel.getForm();
										 form.setValues({
													'parent.departid':record.data.departid,
													'parent.departname':record.data.departname,
													'parent.departfullcode':record.data.departfullcode
												});
									 }
									 
								}
								else{
									Ext.MessageBox.alert("提示","请选择树形菜单中的机构");
								}
							}},
							'-',
							{xtype:'button',cls:'x-btn-text-icon',iconCls:'icon-save',text:'修改',handler:function(){
//								弹出修改窗口
								var record = self.gridpanel.getSelectionModel().getSelected();
								if(record){
									self.window = new techsupport.deparmentmanage.DepartmentWindow({
										ownerCt:self,action_name:'modify',action:self.action,
										renderTo:self.detailWindowCt,
										initRecord:record,
										width:340
									});
									self.window.center();
									self.window.show();
									
								}
								else
									Ext.MessageBox.alert("提示","请选择需要修改的记录");
								
							}},
							'-',
							{xtype:'button',cls:'x-btn-text-icon',iconCls:'icon-delete',text:'删除',handler:function(){
//								执行删除动作
								var records = self.gridpanel.getSelectionModel().getSelections();
								if(records && records.length > 0){
									Ext.MessageBox.buttonText =  {ok: "确认", cancel: "取消", yes: "是", no: "否"};
									Ext.MessageBox.confirm("提示","是否确认要删除选择的机构",function(btn,text){
										if(btn == 'yes'){
											self.action.remove(records);
										}
									});
								}
								else
									Ext.MessageBox.alert("提示","请选择需要修改的记录");
							}},
							'-',
							{xtype:'button',cls:'x-btn-text-icon',text:'置顶',handler:function(){
//								执行置顶动作
							}},
							'-',
							{xtype:'button',cls:'x-btn-text-icon',text:'上移',handler:function(){
//								执行上移动作
							}},
							'-',
							{xtype:'button',cls:'x-btn-text-icon',text:'下移',handler:function(){
//								执行下移动作
							}},
							'-',
							{xtype:'button',cls:'x-btn-text-icon',text:'置底',handler:function(){
//								执行置底动作
							}},
							'-','-',
							{id:"saveDetailBtn",cls:'x-btn-text-icon',xtype:'button',text:'保存↑',handler:function(){ 
								/* 保存当前机构 */
								var record = this.ownerCt.ownerCt.ownerCt.ownerCt.detail_store.getAt(0);
								this.ownerCt.ownerCt.ownerCt.ownerCt.detail_panel.getForm().updateRecord(record);
								this.ownerCt.ownerCt.ownerCt.ownerCt.action.modify(record.data);
							}}
						],
						bbar:new Ext.AsinoPagingToolBar({
							store:this.store,
							displayInfo:true,
							pageSize:this.pagesize
						})
				});
//				-------------------------------子机构面板------------------------------------
				
				//右边详情显示面板
				var detail_panel_items_defaults = {
					   xtype:'textfield',
					   columnWidth: .25
				};
				
				this.detail_panel = Ext.create({
					xtype:'form',
					layout:'column',
					viewConfig:{forceFit:true},
					frame:false,
					defaults:{
						border:false,
						bodyStyle:'padding:2',
						labelAlign:'right'
					},
//					自动适应浏览器宽度
					items:[
					       {
					    	   layout:'form',
					    	   defaults:detail_panel_items_defaults,
					    	   items:[
					    	          {name:'departid',fieldLabel:this.title_base+'ID',readOnly:true}
					    	          
					    	   ]
					       },
					       {
					    	   layout:'form',
					    	   defaults:detail_panel_items_defaults,
					    	   items:[
					    	          {name:'departcode',fieldLabel:this.title_base+'代码',readOnly:true}
					    	          
					    	   ]
					       },
					       {
					    	   layout:'form',
					    	   defaults:detail_panel_items_defaults,
					    	   items:[
					    	          {name:'departname',fieldLabel:this.title_base+'名称'}
					    	   ]
					       },
					       {
					    	   layout:'form',
					    	   defaults:detail_panel_items_defaults,
					    	   items:[
					    	          {name:'departfullcode',fieldLabel:this.title_base+'全码',readOnly:true}
					    	   ]
					       },
					       {
					    	   layout:'form',
					    	   defaults:detail_panel_items_defaults,
					    	   items:[
					    	          {name:'parent.departid',fieldLabel:'上级'+this.title_base+'ID',readOnly:true}
					    	   ]
					       },
					       {
					    	   layout:'form',
					    	   defaults:detail_panel_items_defaults,
					    	   items:[
					    	          {name:'parent.departname',fieldLabel:'上级机构名称',readOnly:true}
					    	   ]
					       }
					]
				});
				//-----------------------------------------------详情面板------------------------
				//右边面板
				this.right_panel = Ext.create({
					xtype:'panel',
					title : this.title_base +'信息',
					region : 'center',
					layout : 'vbox',
					viewConfig : { forceFit:true},
					items: [this.detail_panel , this.gridpanel]
				});
//				----------------------------右边面板-------------------------------------------
				//给最外面的面板添加树形菜单和右边的垂直面板
				this.items = [this.right_panel, this.treepanel ];
				techsupport.deparmentmanage.DepartmentMain.superclass.initComponent.apply(this,arguments);
			},
			onRender:function(ct,position){
				techsupport.deparmentmanage.DepartmentMain.superclass.onRender.apply(this,arguments);
			},
			afterRender:function(ct,position){
				this.body_height = this.getHeight()-this.getFrameHeight();
				this.body.setHeight(this.body_height);
				techsupport.deparmentmanage.DepartmentMain.superclass.afterRender.apply(this,arguments );
				
				this.treepanel.getRootNode().expand();
//				设置内容表格高度
				this.grid_body_height = this.right_panel.getInnerHeight() - this.gridpanel.getFrameHeight()
					- this.detail_panel.getHeight() - 9;
				this.gridpanel.body.setHeight(this.grid_body_height);
			}
			//-----------------------------------附加内容结束-------------------------------------
		});

	}
