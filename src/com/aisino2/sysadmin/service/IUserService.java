package com.aisino2.sysadmin.service;

import java.util.List;

import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.User;

public interface IUserService {
	/** @param 用户(t_user) 增加 */
	void insertUser(User user) throws Exception;

	/** @param 用户(t_user) 除 */
	void deleteUser(User user);

	/** @param 用户(t_user) 修改 */
	void updateUser(User user);

	/** @param 用户(t_user) 查询单条 */
	User getUser(User user);
	
	/** @param 用户(t_user) 查询单条 */
	User getPasswordByUseraccount(User user);

	/** @param 用户(t_user) 分页查询 */
	Pager getListForPage(User user, int pageNo,int pageSize,String sort,String desc);

	/** @param 用户(t_user) 多条查询 */
	List<User> getListUser(User user);
	
	  /** 
	   * 根据account取得用户或查看用户
	   * userType可选
	   * 
	   * @param user */
	  boolean checkUser(User user);
	  /**
	   *  根据id更新用户
	   * @param user
	   * @return
	   */
	  boolean updatePwd(User user);
	  
	  /** 
	   * 根据用户id取得用户角色
	   * 
	   * @param user */
	  List<User> getUserRoles(User user);
	  

	  /** 
	   *删除user对象中的userRoles属性中的角色
	   * userID和roleID
	   * 
	   * @param user */
	  boolean deleteRolesFromUser(User user);
	  
	  /**
	   * 
	   *  新增user对象中的userRoles属性中的角色
	   *  @param user */
	  boolean insertRolesToUser(User user);
	  
	  /**
	   * 根据用户id取得这个用户没有的角色
	   * @param user
	   * @return
	   */
	  List<User> getOptionUserRoles(User user);
	  
	  /**
	    * 用户的上移、下移、置顶、置底
	    * @param user
	    * user.way取值：上移,下移,置顶,置底
	    * @return
	    */
	  boolean updateUserEditEdOrder(User user);
	  
	  /**
	   * 修改用户角色
	   * @param user_role
	   * @return
	   */
	  boolean updateUser_role(User user);
	  
	  /**
	   * 获得下一个排序号
	   * @param user.departid
	   * @return 
		*/
	Integer getNextNodeorder(User user);
	
	/**
	 * 移除多个用户(物理)
	 * @param needRemovedUsers 将要被删除的用户
	 */
	void removeUsers(List<User> needRemovedUsers);
}
