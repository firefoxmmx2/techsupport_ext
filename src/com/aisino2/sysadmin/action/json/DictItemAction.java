package com.aisino2.sysadmin.action.json;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.service.IDict_itemService;

/**
 * 字典项
 * @author ffmmx
 *
 */
@Component
@Scope("prototype")
public class DictItemAction extends PageAction {
	private IDict_itemService dict_itemService;
	
	
	@Resource(name="dict_itemService")
	public void setDict_itemService(IDict_itemService dict_itemService) {
		this.dict_itemService = dict_itemService;
	}
	
	/**
	 * 查询字典项列表
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 查询单个字典项
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 添加字典项
	 * @return
	 * @throws Exception
	 */
	public String add() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 修改字典项
	 * @return
	 * @throws Exception
	 */
	public String modify() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 删除字典项（多个）
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception{
		return SUCCESS;
	}
}
