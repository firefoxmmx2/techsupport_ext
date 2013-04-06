<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
	Ext.onReady(function(){
		Ext.Loader.load(['basic/systemadmin/js/menuManager.js'],function(){
			var menuManager = new techsupport.systemmanage.MenuManager({
				renderTo:'menuManager'
			});
			menuManager.show();
		});
	});
</script>

<div id="menuManager"></div>