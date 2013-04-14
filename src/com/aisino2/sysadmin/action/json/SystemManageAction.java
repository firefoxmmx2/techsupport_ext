package com.aisino2.sysadmin.action.json;

import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.domain.Department;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.System;
import com.aisino2.sysadmin.service.ISystemService;
import com.aisino2.sysadmin.tree.TreeNodeTool;

@Component
@Scope("prototype")
public class SystemManageAction extends PageAction {
	private System system;
	private List<System> systemList;
	private ISystemService systemService;
	private TreeNodeTool treeNodeTool;
	private static final Logger log = Logger.getLogger(SystemManageAction.class);
	/**
	 * 
	 */
	private static final long serialVersionUID = 6479289252324243277L;
	
	public System getSystem() {
		return system;
	}

	public void setSystem(System system) {
		this.system = system;
	}

	public List<System> getSystemList() {
		return systemList;
	}

	public void setSystemList(List<System> systemList) {
		this.systemList = systemList;
	}
	@Resource(name="systemServiceImpl")
	public void setSystemService(ISystemService systemService) {
		this.systemService = systemService;
	}
	@Resource(name="treeNodeTool")
	public void setTreeNodeTool(TreeNodeTool treeNodeTool) {
		this.treeNodeTool = treeNodeTool;
	}
	
	/**
	 * 详情查询
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception{
		try{
			if(system == null || !Util.isNotEmpty(system.getSystemcode()))
				throw new RuntimeException("系统详情参数传输错误");
			system = systemService.getSystem(system);
		}catch(Exception e){
			this.returnNo = -1;
			this.returnMessage = "系统详情发生错误";
			log.error(e);
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage() +"\n";
			}
		}
		return SUCCESS;
	}
	/**
	 * 列表查询
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception{
		try {
			if(system == null)
				throw new RuntimeException("系统列表查询参数传输错误");
			if(system.getParent() != null && "0".equals(system.getParent().getSystemcode()))
				system.setParent(null);
			if("0".equals(system.getSystemcode()))
				system.setSystemcode(null);
			
			Pager pager = systemService.getListForPage(system, this.start, this.limit, this.dir, this.sort);
			this.total = pager.getTotalCount();
			this.systemList = (List<System>) pager.getDatas();
		} catch (Exception e) {
			this.returnNo = -1;
			this.returnMessage = "获取系统列表发生错误";
			log.error(e);
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage() +"\n";
			}
		}
		return SUCCESS;
	}
	/**
	 * 添加
	 * @return
	 * @throws Exception
	 */
	public String add() throws Exception{
		try {
			if(system == null)
				throw new RuntimeException("系统新增参数传输错误");
			systemService.insertSystem(system);
		} catch (Exception e) {
			this.returnNo = -1;
			this.returnMessage = "系统新增发生错误";
			log.error(e);
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage() +"\n";
			}
		}
		return SUCCESS;
	}
	/**
	 * 删除
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception{
		try {
			if(systemList == null || systemList.size()==0)
				throw new RuntimeException("系统删除参数传输错误");
			systemService.removeAll(systemList);
		} catch (Exception e) {
			this.returnNo = -1;
			this.returnMessage = "系统删除发生错误";
			log.error(e);
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage() +"\n";
			}
		}
		return SUCCESS;
	}
	/**
	 * 修改
	 * @return
	 * @throws Exception
	 */
	public String modify() throws Exception{
		try {
			if(system == null)
				throw new RuntimeException("系统修改参数传输错误");
			systemService.updateSystem(system);
		} catch (Exception e) {
			this.returnNo = -1;
			this.returnMessage = "系统修改发生错误";
			log.error(e);
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage() +"\n";
			}
		}
		return SUCCESS;
	}
	/**
	 * 上移
	 * @return
	 * @throws Exception
	 */
	public String up() throws Exception{
		try {
			if(system == null)
				throw new RuntimeException("系统上移参数传输错误");
			
		} catch (Exception e) {
			this.returnNo = -1;
			this.returnMessage = "系统上移发生错误";
			log.error(e);
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage() +"\n";
			}
		}
		return SUCCESS;
	}
	
	/**
	 * 下移
	 * @return
	 * @throws Exception
	 */
	
	public String down() throws Exception{
		return SUCCESS;
	}
	/**
	 * 置顶
	 */
	
	public String top() throws Exception{
		return SUCCESS;
	}
	/**
	 * 置底
	 * @return
	 * @throws Exception
	 */
	
	public String bottom() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 查询系统信息的树形节点 
	 */
	public String querySystemNodes() throws Exception {
		if (system == null)
			system = new System();
		if(system.getSystemcode()!=null && system.getSystemcode().equals("0"))
			system.setSystemcode(null);
		List<System> childSystemList = this.systemService.getChildSystem(system);
		if(Util.isNotEmpty(system.getSystemcode())){
			try{
				system = this.systemService.getSystem(system);
			}catch (Exception e) {
				system = null;
			}
		}
		else
			system = null;
		StringBuffer buff = new StringBuffer();
		String systemTreenodeList = "["+treeNodeTool.make_ext_tree_node(treeNodeTool
				.parseToTreenodeFromSystem(childSystemList,
						system, false),buff).toString()+"]";
		this.response.setContentType("text/html; charset=utf-8");
		PrintWriter out = this.response.getWriter();
		out.print(systemTreenodeList);
		out.close();
		return null;
	}
	
	/**
	 * 系统代码可用性验证
	 * @return
	 * @throws Exception
	 */
	public String checkSystemcode() throws Exception{
		try {
			if(system == null)
				throw new RuntimeException("系统代码验证参数传输错误");
			
			boolean result = systemService.checkSystemcode(system.getSystemcode());
			if(result)
				this.returnNo = 0;
			else
				this.returnNo = 1;
		} catch (Exception e) {
			this.returnNo = -1;
			this.returnMessage = "系统代码验证发生错误";
			log.error(e);
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage() +"\n";
			}
		}
		return SUCCESS;
	}
	
	/**
	 * 查询列表全部
	 * @return
	 */
	public String querylistAll() {
		try {
			if(system == null)
				system = new System();
			if(system.getParent() != null && "0".equals(system.getParent().getSystemcode()))
				system.setParent(null);
			if("0".equals(system.getSystemcode()))
				system.setSystemcode(null);
			systemList =  systemService.getListSystem(system, queryExtraCond);
		} catch (RuntimeException e) {
			this.returnNo = -1;
			this.returnMessage = "系统列表查询发生错误";
			log.error(e);
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage() +"\n";
			}
		}
		return SUCCESS;
	}
	
}
