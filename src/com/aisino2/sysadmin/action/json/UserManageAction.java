package com.aisino2.sysadmin.action.json;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.Pager;
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
	
	@Resource(name="userServiceImpl")
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
		try{
			if(user==null||user.getUserid()==null)
				throw new RuntimeException("需要查询的用户");
			user=userService.getUser(user);
		}catch(RuntimeException e){
			log.error(e);
			this.returnNo=1;
			this.returnMessage = "获取用户详细数据错误";
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug=e.getMessage();
			}
		}
		
		
		return SUCCESS;
	}
	/**
	 * 添加用户
	 * @return
	 * @throws Exception
	 */
	public String add() throws Exception{
		try {
			if(user==null)
				throw new RuntimeException("添加用户数据传输错误");
			userService.insertUser(user);
		} catch (Exception e) {
			log.error(e);
			this.returnNo=1;
			this.returnMessage="添加用户发生错误";
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug=e.getMessage();
			}
			
		}
		return SUCCESS;
	}
	
	/**
	 * 修改用户
	 * @return
	 * @throws Exception
	 */
	public String modify() throws Exception{
		try {
			if(user==null)
				throw new RuntimeException("修改用户信息数据传输错误");
			userService.updateUser(user);
		} catch (Exception e) {
			log.error(e);
			this.returnNo=1;
			this.returnMessage="修改用户嘻嘻发生错误";
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug=e.getMessage();
			}
		}
		return SUCCESS;
	}
	/**
	 * 删除用户
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception{
		try {
			if(userList==null || userList.size()==0)
				throw new RuntimeException("删除用户参数传输错误");
			userService.removeUsers(userList);
		} catch (Exception e) {
			log.error(e);
			this.returnNo=1;
			this.returnMessage="删除用户信息发生错误";
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug=e.getMessage();
			}
		}
		return SUCCESS;
	}
	/**
	 * 用户检查,检查用户名是否存在
	 * @return
	 * @throws Exception
	 */
	public String check() throws Exception{
		try {
			if(user == null)
				throw new RuntimeException("用户检查参数传输错误");
			boolean result = userService.checkUser(user);
			if(result)
				returnNo = 0;
			else{
				returnNo = 1;
				returnMessage = "用户帐号已经存在";
			}
		} catch (Exception e) {
			log.error(e);
			returnNo = -1;
			returnMessage = "用户检查发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e,e.fillInStackTrace());
				returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}
	
	/**
	 * 用户列表查询
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String querylist() throws Exception{
		try {
			Pager pager=userService.getListForPage(this.user, this.start, this.limit, this.sort, this.dir);
			this.total=pager.getTotalCount();
			userList=pager.getDatas();
			
		} catch (Exception e) {
			this.returnNo=1;
			this.returnMessage="用户列表查询出错";
			log.error(e);
			if(log.isDebugEnabled()){
				this.returnMessageDebug=e.getMessage();
				log.debug(e,e.fillInStackTrace());
			}
		}
		return SUCCESS;
	}
}
