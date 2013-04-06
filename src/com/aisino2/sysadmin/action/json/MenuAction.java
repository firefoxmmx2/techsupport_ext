package com.aisino2.sysadmin.action.json;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.Menu;

/**
 * 菜单
 */
@Component
@Scope("prototype")
public class MenuAction extends PageAction {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Menu menu;
	private List<Menu> menuList;
	
	public Menu getMenu() {
		return menu;
	}
	public void setMenu(Menu menu) {
		this.menu = menu;
	}
	public List<Menu> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<Menu> menuList) {
		this.menuList = menuList;
	}
	
	/**
	 * 添加菜单
	 * @return
	 */
	public String add() {
		return SUCCESS;
	}
	
	/**
	 * 修改菜单
	 * @return
	 */
	public String modify(){
		return SUCCESS;
	}
	
	/**
	 * 删除菜单
	 * @return
	 */
	public String remove(){
		return SUCCESS;
	}
	
	/**
	 * 查询列表分页
	 * @return
	 */
	public String querylist(){
		return SUCCESS;
	}
	
	/**
	 * 查询单个菜单
	 * @return
	 */
	public String query(){
		return SUCCESS;
	}
}
