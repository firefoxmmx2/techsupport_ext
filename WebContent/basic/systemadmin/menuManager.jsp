<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript">
	Ext.ns("techsupport.systemmanage");
	Ext.onReady(function() {
		var loadlist = [];
		if (!techsupport.systemmanage.UserManager)
			loadlist.push("basic/systemadmin/js/userManage.js");
		loadlist.push("basic/systemadmin/js/menuManager.js");
		Ext.Loader.load(loadlist, function() {
			var menuManager = new techsupport.systemmanage.MenuManager({
				renderTo : 'menuManagerCt'
			});
			menuManager.show();
		});
	});
</script>
<div id="menuManagerCt" style="width:100%;height:100%;"></div>