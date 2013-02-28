/**
 * Filename: usermanage.js
 * Descrtion: 用户管理
 * coding: utf8
 */

//声明包
Ext.ns('techsupport.systemmanage')

if(!techsupport.systemmanage.UserManager){
	let um;
	um = techsupport.systemmanage.UserManager = Ext.extend(Ext.Panel,{
		title_base : "用户",
		layout:'border',
		width:'100%',
		height:'100%',
		viewConfig:{
			forceFit:true
		},
		pagesize:25,
		dir : "userorder",
		addURL : context_path+'/sysadminDefault/add_user.action',
		modifyURL : context_path+'/sysadminDefault/modify_user.action',
		queryURL : context_path+'/sysadminDefault/querylist_user.action',
		detailURL : context_path+'/sysadminDefault/query_user.action',
		removeURL : context_path+'/sysadminDefault/remove_user.action',
		actionPrefix : 'user.',
		removePrefix : 'userList[i].',
		gridStore : Ext.create({
			xtype:'jsonstore',
			idProperty:'userid',
			root:'userList',
			url:um.url,
			baseParams:{
				start:0,
				limit:um.pagesize,
				dir:um.dir,
				sort:um.sort
			},
			remoteSort:true,
			totalProperty:'total',
			fields[
				{name:'userid',mapping:'userid'},
				{name:'username',mapping:'username'},
				{name:'useraccount',mapping:'useraccount'},
				{name:'password',mapping:'password'},
				{name:'departid',mapping:'departid'},
				{name:'userorder',mapping:'userorder'},
				{name:'isvalid',mapping:'isvalid'},
				{name:'usertype',mapping:'usertype'},
				{name:'idnum',mapping:'idnum'},
				{name:'mobilephone',mapping:'mobilephone'},
				{name:'email',mapping:'email'}
			]
		}),
		treeLoader:Ext.create({
			url:um.queryURL,
			method:'post',
			listeners:{
				beforeload:{
					fn:function(loader,node){
						loader.baseParams[this.actionPrefix+'userid'] = node.id;
					}
				}
			}
		},Ext.tree.TreeLoader),
		treePanel : Ext.create({
			xtype:'treepanel',
			region:'west',
			id:um.id+"TreePanel",
			title:"机构树",
			useArrows:true,
			autoScroll:true,
			animate:true,
			enableDD:false,
			containerScroll:true,
			border:false,
			width:'25%',
			rootVisable:false,
			viewConfig:{
				forceFit:true,
			},
			loader:um.treeLoader,
			root:{id:'0',text:'顶端',nodeType:'async'},
			listeners:{
				click:function(node,evt){
					this.ownerCt.currentNodeId = node.id;
					this.ownerCt.store.load({
						params:{
							start:0,
							limit:this.ownerCt.pagesize,
							dir:this.ownerCt.dir,
							desc:this.ownerCt.desc
						}
					});
				}
			}
		}),
		gridSelectionModel:new Ext.grid.CheckboxSelectionModel(),
		gridPanel:Ext.create({
			xtype:'grid',
			id:um.id+"Grid",
			store:um.store,
			border:false,
			viewConfig:{
				forceFit:true
			},
			sm:um.gridSelectionModel,
			tbar:[
				{xtype:'button',text:'添加',handler:function(){

															  }},
				{xtype:'button',text:'修改',handler:function(){}},
				{xtype:'button',text:'删除',handler:function(){}},
				{xtype:'button',text:'置顶',handler:function(){}},
				{xtype:'button',text:'上移',handler:function(){}},
				{xtype:'button',text:'下移',handler:function(){}},
				{xtype:'button',text:'置底',handler:function(){}}
			]
		})
	});

}
