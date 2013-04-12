package com.aisino2.sysadmin.action.json;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.Role;
import com.aisino2.sysadmin.service.IRoleService;

@Component
@Scope("prototype")
public class RoleManageAction extends PageAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 893208498985954493L;

	/**
	 * 角色
	 */
	private Role role;
	/**
	 * 角色列表
	 */
	private List<Role> roleList;

	private IRoleService roleService;

	@Resource(name = "roleServiceImpl")
	public void setRoleService(IRoleService roleService) {
		this.roleService = roleService;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	/**
	 * 添加角色
	 * 
	 * @return
	 */
	public String add() {
		try {
			role = (Role) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("aRole")),
					Role.class);
			if (role == null)
				throw new RuntimeException("添加角色参数传输错误");
			this.roleService.insertRole(role);
		} catch (RuntimeException e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "添加角色发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	/**
	 * 修改角色
	 * 
	 * @return
	 */
	public String modify() {
		try {
			role = (Role) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("mRole")),
					Role.class);
			if (role == null)
				throw new RuntimeException("修改角色参数错误");
			this.roleService.updateRole(role);
		} catch (RuntimeException e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "修改角色发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	/**
	 * 删除角色
	 * 
	 * @return
	 */
	@SuppressWarnings({ "unchecked"})
	public String remove() {
		try {
			roleList = (List<Role>) JSONArray.toCollection(
					JSONArray.fromObject(this.request.getParameter("rRoles")),
					Role.class);
			if(roleList == null || roleList.isEmpty())
				throw new RuntimeException("删除角色参数传输错误");
			this.roleService.removeRoles(roleList);
		} catch (RuntimeException e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "删除角色发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	/**
	 * 查询单个角色
	 * 
	 * @return
	 */
	public String query() {
		try {
			role = (Role)JSONObject.toBean(JSONObject.fromObject(this.request.getParameter("qRole")), Role.class);
			if (role == null) {
				throw new RuntimeException("查询角色详情参数传输错误");
			}
			role = this.roleService.getRole(role);
		} catch (RuntimeException e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "查询角色详情发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	/**
	 * 查询角色列表可分页
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String querylist() {
		try {
			role = (Role)JSONObject.toBean(JSONObject.fromObject(this.request.getParameter("qRole")), Role.class);
			if (role == null) {
				role = new Role();
			}
			Pager pager = this.roleService.getListForPage(role, queryExtraCond, start, limit, sort, dir);
			total = pager.getTotalCount();
			roleList = pager.getDatas();
		} catch (RuntimeException e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "查询角色列表发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	/**
	 * 校验角色是否可用 或者 未存在
	 * 
	 * @return
	 */
	public String check() {
		try {
			String rolename = this.request.getParameter("rolename");
			if (rolename == null) {
				throw new RuntimeException("校验角色参数传输错误");
			}
			if(!this.roleService.checkRolename(rolename)){
				this.returnNo = 1;
				this.returnMessage = "角色名称已存在";
			}
		} catch (RuntimeException e) {
			log.error(e);
			this.returnNo = -1;
			this.returnMessage = "校验角色发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

}
