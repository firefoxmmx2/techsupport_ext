package com.aisino2.sysadmin.dao;

import java.util.List;
import java.util.Map;

import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.Role;
import com.aisino2.sysadmin.domain.User;

public interface IRoleDao {
	/**
	 * @param 角色
	 *            (t_role) 增加
	 */
	void insertRole(Role role);

	/**
	 * @param 角色
	 *            (t_role) 删除
	 */
	void deleteRole(Role role);

	/**
	 * @param 角色
	 *            (t_role) 修改
	 */
	void updateRole(Role role);

	/**
	 * @param 角色
	 *            (t_role) 查询单条
	 */
	Role getRole(Role role);

	/**
	 * @param 角色
	 *            (t_role) 分页查询
	 */
	Pager getListForPage(Role map, Map<String, Object> extra, int pageNo,
			int pageSize, String sort, String desc);

	/**
	 * @param 角色
	 *            (t_role) 多条查询
	 */
	List<Role> getListRole(Role role);

	List<Role> getRolesByUser(User user);

	List<Role> getOptionRolesForUser(User user);

	/**
	 * @param 查询登陆账号非所属部门和下属部门的角色
	 *            (t_role) 多条查询
	 */
	List<Role> getloginUserRoleOutDeptList(User user);

	/**
	 * @param 查询部门及下属部门的全部角色
	 *            (t_role) 多条查询
	 */
	List<Role> getDeptRoleList(User user);
	
	/**
	 * 校验角色名称
	 * @param rolename 角色名称
	 * @return true可用 ,false不可用
	 */
	boolean checkRolename(String rolename);
}
