package com.aisino2.sysadmin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.aisino2.sysadmin.dao.IUserDao;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.sysadmin.service.IUserService;

@Component
public class UserServiceImpl implements IUserService {

	private IUserDao user_dao;
	
	@Resource(name="userDaoImpl")
	public void setUser_dao(IUserDao user_dao) {
		this.user_dao = user_dao;
	}

	@Transactional
	public void insertUser(User user) {
		this.user_dao.insertUser(user);
	}

	@Transactional
	public void deleteUser(User user) {
		this.user_dao.deleteUser(user);
	}
	@Transactional
	public void updateUser(User user) {
		this.user_dao.updateUser(user);
	}

	public User getUser(User user) {
		return this.user_dao.getUser(null);
	}

	public User getPasswordByUseraccount(User user) {
		return this.user_dao.getPasswordByUseraccount(user);
	}

	public Pager getListForPage(User user, int pageNo, int pageSize,
			String sort, String desc) {
		return this.user_dao.getListForPage(user, pageNo, pageSize, sort, desc);
	}

	public List<User> getListUser(User user) {
		return this.user_dao.getListUser(user);
	}

	public User checkUser(User user) {
		return this.user_dao.checkUser(user);
	}

	public User checkCAUser(User user) {
		return this.user_dao.checkCAUser(user);
	}
	@Transactional
	public boolean updatePwd(User user) {
		 this.user_dao.updatePwd(user);
		 return true;
	}

	public List<User> getUserRoles(User user) {
		return null;
	}

	public boolean deleteRolesFromUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean insertRolesToUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	public List<User> getOptionUserRoles(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean updateUserEditEdOrder(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean updateUser_role(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	public Integer getNextNodeorder(User user) {
		return this.user_dao.getNextNodeorder(user);
	}

	public User getQybmByCyrybh(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getQymcByQybm(String qybm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	@Override
	public void removeUsers(List<User> needRemovedUsers) {
		if(needRemovedUsers==null || needRemovedUsers.size()==0)
			throw new RuntimeException("[用户删除]需要被删除的用户列表为空");
		for(User user : needRemovedUsers){
			this.deleteUser(user);
		}
		
	}
	
	

}
