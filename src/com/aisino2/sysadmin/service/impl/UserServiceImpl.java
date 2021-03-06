package com.aisino2.sysadmin.service.impl;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.dao.IUserDao;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.sysadmin.service.IUserService;

@Component
public class UserServiceImpl implements IUserService {

	private IUserDao user_dao;

	@Resource(name = "userDaoImpl")
	public void setUser_dao(IUserDao user_dao) {
		this.user_dao = user_dao;
	}

	@Transactional
	public void insertUser(User user) throws Exception {
		if (user == null) {
			throw new RuntimeException("需要添加的用户信息为空");
		}
		if (!this.checkUser(user)) {
			throw new RuntimeException("需要添加的用户的帐号信息已经存在");
		}

		// md5加密密码
		MessageDigest encoder = MessageDigest.getInstance("MD5");
		encoder.update(user.getPassword().getBytes("UTF-8"));
		String password = new BigInteger(1, encoder.digest()).toString(16);
		user.setPassword(password);
		// 设置序列
		user.setUserorder(getNextNodeorder(user));
		this.user_dao.insertUser(user);
	}

	@Transactional
	public void deleteUser(User user) {
		if (user == null || !Util.isNotEmpty(user.getUserid())) {
			throw new RuntimeException("需要被删除的用户id为空");
		}
		this.user_dao.deleteUser(user);
	}

	@Transactional
	public void updateUser(User user) {
		if (user == null || user.getUserid() == null) {
			throw new RuntimeException("修改用户的ID为空");
		}
		User originalUser = this.getUser(user);
		Util.copyProperties(originalUser, user);

		this.user_dao.updateUser(originalUser);
	}

	public User getUser(User user) {
		if (user == null)
			throw new RuntimeException("查询单个用户的参数为空");
		if (Util.isNotEmpty(user.getUserid()))
			return this.user_dao.getUser(user);
		else if (Util.isNotEmpty(user.getUseraccount())
				&& Util.isNotEmpty(user.getPassword()))
			return this.user_dao.getPasswordByUseraccount(user);
		else
			return null;
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

	public boolean checkUser(User user) {
		return this.user_dao.checkUser(user);
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

	@Transactional
	@Override
	public void removeUsers(List<User> needRemovedUsers) {
		if (needRemovedUsers == null || needRemovedUsers.size() == 0)
			throw new RuntimeException("[用户删除]需要被删除的用户列表为空");
		for (User user : needRemovedUsers) {
			this.deleteUser(user);
		}

	}

}
