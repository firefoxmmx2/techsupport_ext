<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<script type="text/javascript">
	Ext.onReady(function(){
			Ext.Loader.load(['basic/systemadmin/js/userManage.js'],function(){
				var userManager = new techsupport.systemmanage.UserManager({renderTo:"userManageCt"});
				userManager.show();		
				});

			});
</script>
<div id="userManageCt" style="width:100%;height:100%;">
</div>
