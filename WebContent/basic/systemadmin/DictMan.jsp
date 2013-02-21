<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript">
Ext.onReady(function() {
	var cm = new Ext.grid.ColumnModel({
		columns:[{header:'序号',tooltip:'提示序号',align:'right',width:40,dataIndex:'ID'},
		         {header:'产品名称',tooltip:'XX产品名称',align:'left',width:100,dataIndex:'Name'}],//注意此dataIndex要与product中的name对应，且却分大小写
	    defaults:{sortable:false}//不允许客户端点击列头排序，可以打开s
		});	
	var myStore = new Ext.data.ArrayStore({
	    fields: ['ID', 'Name'],
	    idIndex: 0
// 	   	,data:[
// 	          ["1","1"],
// 	          ["2","2"]
// 	    ]
	});
	
	var panel  = Ext.create({
		renderTo:'dict_manage_panel',
		xtype:"panel",
		title:"panel",
		border:false,
// 		viewConfig:{forceFit:true},
		items:[{
			xtype:'grid',
			title:'字典管理',
			id:'xxxx',
				tbar:'头部',
			border:false,
			cm:cm,
			store:myStore,
			autoScroll:true,
				loadMask:true,
				stripeRows:true
			
			}]
	});
		panel.show();
		//grid.store.on('load',function(){});//在服务器数据获取后，呈现之前自行处理结果集[比如，增加合计]
		//grid.loadMask.msg='加载中...';
		//grid.load({params:{start:0,limit:25},callback:overLoad});//callback用于在数据加载完成后处理页面的按钮状态，或其他业务需求。如果无其他需求可以去掉callback
		//grid.load({params:{start:0,limit:25}});

});


</script>
<div id="dict_manage_panel" style="width: 100%; height: 100%;"></div>
