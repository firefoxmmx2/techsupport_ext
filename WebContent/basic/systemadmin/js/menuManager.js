/**
 * filename: menuManager.js description: 菜单管理 主要模块 1: 菜单管理主面板 2: 菜单窗口
 */

Ext.ns("techsupport.systemmanage");

if (!techsupport.systemmanage.MenuManager) {
	Ext.Loader.load(['basic/systemadmin/js/userManage.js'], function() {

				techsupport.systemmanage.MenuManager = Ext.extend(
						techsupport.systemmanage.UserManager, {
							addURL : context_path
									+ '/sysadminDefault/add_user.action',
							modifyURL : context_path
									+ '/sysadminDefault/modify_user.action',
							queryURL : context_path
									+ '/sysadminDefault/querylist_user.action',
							detailURL : context_path
									+ '/sysadminDefault/query_user.action',
							removeURL : context_path
									+ '/sysadminDefault/remove_user.action',
							actionPrefix : 'user.',
							removePrefix : 'userList[i]',
							title_base : "菜单",
							id : 'menuManager'
							
						});

			});
}
