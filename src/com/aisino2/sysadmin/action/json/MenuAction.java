package com.aisino2.sysadmin.action.json;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.usertype.LoggableUserType;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.Menu;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.service.IMenuService;

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
	private IMenuService menuService;

	@Resource(name = "menuServiceImpl")
	public void setMenuService(IMenuService menuService) {
		this.menuService = menuService;
	}

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
	 * 
	 * @return
	 */
	public String add() {
		try {
			menu = (Menu) JSONObject
					.toBean(JSONObject.fromObject(this.request
							.getParameter("addMenu")), Menu.class);
			if (menu == null)
				throw new RuntimeException("添加菜单参数传输错误");
			menuService.insertMenu(menu);
		} catch (RuntimeException e) {
			this.returnNo = 1;
			this.returnMessage = "添加菜单发生错误";
			log.error(e);
			if (log.isDebugEnabled()) {
				this.returnMessageDebug = e.getMessage();
				log.debug(e, e.fillInStackTrace());
			}
		}
		return SUCCESS;
	}

	/**
	 * 修改菜单
	 * 
	 * @return
	 */
	public String modify() {
		try {
			menu = (Menu) JSONObject.toBean(JSONObject.fromObject(this.request
					.getParameter("modifyMenu")), Menu.class);
			if (menu == null)
				throw new RuntimeException("修改菜单参数传递发生错误");
			menuService.updateMenu(menu);
		} catch (RuntimeException e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "修改菜单发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	/**
	 * 删除菜单
	 * 
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "deprecation" })
	public String remove() {
		try {
			menuList = (List<Menu>) JSONArray.toList(JSONArray
					.fromObject(this.request.getParameter("removeMenuList")),
					Menu.class);
			if (menuList == null || menuList.isEmpty())
				throw new RuntimeException("删除菜单参数传递发生错误");
			menuService.removeMenus(menuList);
		} catch (RuntimeException e) {
			this.returnNo = 1;
			this.returnMessage = "删除菜单发生错误";
			log.error(e);
			if (log.isDebugEnabled()) {
				this.returnMessageDebug = e.getMessage();
				log.debug(e, e.fillInStackTrace());
			}
		}
		return SUCCESS;
	}

	/**
	 * 查询列表分页
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String querylist() {
		try {
			menu = (Menu) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("qMenu")),
					Menu.class);
			if (menu == null)
				menu = new Menu();
			if (menu.getParent()!=null && "0".equals(menu.getParent().getMenucode()))
				menu.setParent(null);
			if(this.start>=0&&this.limit>1){
				Pager pager = this.menuService.getListForPage(menu, this.start,
						this.limit, this.sort, this.dir);
				menuList = pager.getDatas();
				this.total = pager.getTotalCount();
			}
			else {
				menuList = this.menuService.getListMenu(menu);
			}

		} catch (RuntimeException e) {
			this.returnNo = 1;
			this.returnMessage = "查询菜单列表发生错误";
			log.error(e);
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	/**
	 * 查询单个菜单
	 * 
	 * @return
	 */
	public String query() {
		try {
			menu = (Menu) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("qMenu")),
					Menu.class);
			if (menu == null)
				throw new RuntimeException("获取菜单详细信息参数传递错误");
			menu = menuService.getMenu(menu);
		} catch (RuntimeException e) {
			this.returnNo = 1;
			this.returnMessage = "获取菜单详细信息发生错误";
			log.error(e);
			if (log.isDebugEnabled()) {
				this.returnMessageDebug = e.getMessage();
				log.debug(e, e.fillInStackTrace());
			}
		}
		return SUCCESS;
	}
}
