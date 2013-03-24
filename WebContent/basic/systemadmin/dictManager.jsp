<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<script type="text/javascript">
	Ext.onReady(function(){
		Ext.Loader.load(["basic/systemadmin/js/dictManager.js"],function(){
			var dictManager = new techsupport.systemmanage.DictManager({
				renderTo:'dictManagerCt'
			});
			
			dictManager.show();
		});
	});
</script>

<div id="dictManagerCt" style="width:100%;height:100%;"></div>