package com.aisino2.sysadmin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.dao.IMenuDao;
import com.aisino2.sysadmin.dao.ISystemDao;
import com.aisino2.sysadmin.domain.Menu;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.sysadmin.service.IMenuService;

@Component
public class MenuServiceImpl implements IMenuService {
	private IMenuDao menu_dao;

	@Resource(name = "menuDaoImpl")
	public void setMenu_dao(IMenuDao menu_dao) {
		this.menu_dao = menu_dao;
	}

	@Transactional
	public void insertMenu(Menu menu) {
		if (menu.getParent() != null
				&& "0".equals(menu.getParent().getMenucode()))
			menu.setParent(null);
		else {
			menu.setParent(menu_dao.getMenu(menu.getParent()));
			menu.getParent().setIsleaf("N");
			this.updateMenu(menu.getParent());
		}
		this.menu_dao.insertMenu(menu);
	}

	@Transactional
	public void deleteMenu(Menu menu) {
		this.menu_dao.deleteMenu(menu);
	}

	@Transactional
	public void updateMenu(Menu menu) {
		Menu oldMenu = this.getMenu(menu);
		Util.copyProperties(oldMenu, menu);
		this.menu_dao.updateMenu(oldMenu);
	}

	public Menu getMenu(Menu menu) {
		return this.menu_dao.getMenu(menu);
	}

	public Pager getListForPage(Menu menu, int pageNo, int pageSize,
			String sort, String desc) {

		return this.menu_dao.getListForPage(menu, pageNo, pageSize, sort, desc);
	}

	public List<Menu> getListMenu(Menu menu) {
		return this.menu_dao.getListMenu(menu);
	}

	public List<Menu> getChildMenu(Menu menu) {
		return this.menu_dao.getChildMenu(menu);
	}

	public List<Menu> getTheUserChildMenu(Menu menu, User user) {
		return this.menu_dao.getTheUserChildMenu(menu, user);
	}

	public boolean checkMenu(Menu menu) {
		return this.menu_dao.checkChild(menu);
	}

	public List<Menu> getOwnMenu(Menu menu) {
		return this.menu_dao.getOwnMenu(menu);
	}

	public Menu getParentMenu(Menu menu) {
		return this.menu_dao.getParentMenu(menu);
	}

	public List<Menu> getAllMenu() {
		return this.menu_dao.getAllMenu();
	}

	public boolean updateMenuEditEdOrder(Menu menu) {
		return false;
	}

	public Integer getNextNodeorder(Menu menu) {
		return 0;
	}

	public List<Menu> getRoleCheckedMenuList(Menu menu) {
		return this.menu_dao.getRoleCheckedMenuList(menu);
	}

	@Transactional
	@Override
	public void removeMenus(List<Menu> menuList) {
		if (menuList == null || menuList.isEmpty()) {
			throw new RuntimeException("被删除菜单列表不能为空");
		}
		Menu someMenu  = null;
		for (Menu menu : menuList) {
			menu = this.getMenu(menu);
			someMenu = menu;
			this.deleteMenu(menu);
		}

		if (someMenu.getParent() != null
				&& !(someMenu.getChild_menu_list() == null || someMenu.getChild_menu_list().isEmpty())) {
			someMenu.getParent().setIsleaf("Y");
		}
	}

	@Override
	public boolean checkMenucode(String menucode) {
		if (!Util.isNotEmpty(menucode))
			throw new RuntimeException("被验证的菜单代码不能为空");

		return this.menu_dao.checkMenucode(menucode);
	}

}
