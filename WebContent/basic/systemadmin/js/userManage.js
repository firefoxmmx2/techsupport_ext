/**
 * Filename: usermanage.js
 * Descrtion: 用户管理
 * coding: utf8
 */

//声明包
Ext.ns('techsupport.systemmanage')

if(!techsupport.systemmanage.UserManager){
	techsupport.systemmanage.UserManager = Ext.extend(techsupport.systemmanage.SystemMain,{
		title_base : "用户",
		layout:'border',
		width:'100%',
		height:'100%',
		viewConfig:{
			forceFit:true
		},
		pagesize:25,
		dir : "nodeorder",
		addURL : context_path+'/sysadminDefault/add_user.action',
		modifyURL : context_path+'/sysadminDefault/modify_user.action',
		queryURL : context_path+'/sysadminDefault/querylist_user.action',
		detailURL : context_path+'/sysadminDefault/query_user.action',
		removeURL : context_path+'/sysadminDefault/remove_user.action',
		actionPrefix : 'user.',
		removePrefix : 'userList[i].',
		//构造器
		constructor:function(config){
			this.width = config.width || '100%';
			this.height = config.width || '100%';
			this.pagesize = config.pagesize || this.pagesize;//设置默认的每页显示记录数
			this.dir = config.dir || 'nodeorder'; //设置默认的排序字段

			techsupport.systemmanage.UserManager.superclass.apply(this,arguments);
		},
		//组件初始化
		initComponent:function(ct,position){
			var detail_panel_items_defaults = {
				xtype:'textfield',
				columnWidth: .25
			}; 
			this.detail_panel = Ext.create({
				xtype:"form",
				layout:'column',
				viewConfig:{forceFit:true},
				frame:false,
				defaults:{
					border:false,
					bodyStyle:'padding:2',
					labelAlign:'right'
				},
				items:[
					{
			    	   layout:'form',
			    	   xtype:'panel',
			    	   defaults:detail_panel_items_defaults,
			    	   items:[
			    	          {name:'username',fieldLabel:this.title_base+'名称'}
			    	   ]
					},
					{
						layout:'form',
						xtype:'panel',
						defaults:detail_panel_items_defaults,
						items:[{name:'useraccount',fieldLabel:this.title_base+'帐号'}]
					},
					{
						layout:'form',
						xtype:'panel',
						defaults:detail_panel_items_defaults,
						items:[{name:'mobile',fieldLabel:this.title_base+'电话'}]
					}
				]
			});
			techsupport.systemmanage.UserManager.superclass.call(this);
		}
	});

}
