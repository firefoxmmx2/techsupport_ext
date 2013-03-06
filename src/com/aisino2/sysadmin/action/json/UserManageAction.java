package com.aisino2.sysadmin.action.json;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.sysadmin.service.IUserService;

@Component
@Scope("prototype")
public class UserManageAction extends PageAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8965936252677047815L;

	
	private User user;
	private List<User> userList;
	
	private IUserService userService;
	
	public void setUserService(IUserService userService) {
		this.userService = userService;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<User> getUserList() {
		return userList;
	}
	public void setUserList(List<User> userList) {
		this.userList = userList;
	}
	/**
	 * 用户单一查询
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception{
		
		return SUCCESS;
	}
	/**
	 * 添加用户
	 * @return
	 * @throws Exception
	 */
	public String add() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 修改用户
	 * @return
	 * @throws Exception
	 */
	public String modify() throws Exception{
		return SUCCESS;
	}
	/**
	 * 删除用户
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception{
		return SUCCESS;
	}
	/**
	 * 用户检查
	 * @return
	 * @throws Exception
	 */
	public String check() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 用户列表查询
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception{
		return SUCCESS;
	}
}
