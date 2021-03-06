package com.aisino2.sysadmin.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.Constants;
import com.aisino2.sysadmin.domain.Menu;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.sysadmin.service.IMenuService;
import com.aisino2.sysadmin.service.ISystemService;
import com.aisino2.sysadmin.tree.TreeNodeTool;
import com.aisino2.sysadmin.tree.UIContainer;

@Component
@Scope("prototype")
public class LoadMenuItemsAction extends PageAction {
	private IMenuService menu_service;
	private ISystemService system_service;
	private TreeNodeTool tree_node_tool;
	/**
	 * 
	 */
	private static final long serialVersionUID = -2499590520119161154L;

	public String execute() throws Exception{
		HttpSession session = this.request.getSession();
		User user = (User) session.getAttribute(Constants.userKey);
		List<Menu> user_root_menu_list = new ArrayList<Menu>();
//		for(Role role : user.getRoles()){
//			user_root_menu_list.addAll(role.getRoleMenus());
//		}
		Menu menu = new Menu();
		user_root_menu_list = menu_service.getTheUserChildMenu(menu, user);
		UIContainer side_system_menu_container = new UIContainer();
		com.aisino2.sysadmin.domain.System system = new com.aisino2.sysadmin.domain.System();
		queryExtraCond.put("top", 1); //设置为顶层的系统标志
		List<com.aisino2.sysadmin.domain.System> system_list = system_service.getListSystem(system,queryExtraCond);
		side_system_menu_container.initContainer(system_list, user_root_menu_list, user,tree_node_tool);
		session.setAttribute(Constants.systemKey, side_system_menu_container);
		
		return SUCCESS;
	}

	@Resource(name="menuServiceImpl")
	public void setMenu_service(IMenuService menu_service) {
		this.menu_service = menu_service;
	}

	@Resource(name="treeNodeTool")
	public void setTree_node_tool(TreeNodeTool tree_node_tool) {
		this.tree_node_tool = tree_node_tool;
	}

	@Resource(name="systemServiceImpl")
	public void setSystem_service(ISystemService system_service) {
		this.system_service = system_service;
	}
	
	
}
