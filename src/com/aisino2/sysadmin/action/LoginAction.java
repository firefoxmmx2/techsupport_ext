package com.aisino2.sysadmin.action;

import java.io.PrintWriter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Hibernate;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.domain.Role;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.sysadmin.service.IRoleService;
import com.aisino2.sysadmin.service.IUserService;

@Component
@Scope("prototype")
public class LoginAction extends PageAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = -499200930319623886L;
	private IUserService userService;
	private IRoleService roleService;
	private User user;
	
	public String execute() throws Exception{
		MessageDigest encoder = MessageDigest.getInstance("MD5");
		
		encoder.update(user.getPassword().getBytes("UTF-8"));
		String password = new BigInteger(1,encoder.digest()).toString(16);
		user.setPassword(password);
		user = userService.getPasswordByUseraccount(user);
		if (user==null){
			 this.response.setContentType("text/html; charset=UTF-8");
			 PrintWriter out = this.response.getWriter();
			 out.println("用户名或者密码不正确");
			 out.close();
			return null;
		}
		Hibernate.initialize(user);
		this.request.getSession().setAttribute(com.aisino2.sysadmin.Constants.userKey, user);
		
		return SUCCESS;
	}
	
	
	@Resource(name="roleServiceImpl")
	public void setRoleService(IRoleService roleService) {
		this.roleService = roleService;
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	@Resource(name="userServiceImpl")
	public void setUserService(IUserService userService) {
		this.userService = userService;
	}
	
	
}
