package com.aisino2.sysadmin.action.json;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.service.IDictService;
import com.aisino2.sysadmin.service.IDict_itemService;

/**
 * 字典
 * @author ffmmx
 *
 */
/**
 * @author hooxin
 *
 */
@Component
@Scope("prototype")
public class DictAction extends PageAction {
	private IDictService dictService;
	
	@Resource(name="dictService")
	public void setDictService(IDictService dictService) {
		this.dictService = dictService;
	}

	/**
	 * 查询字典列表
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception{
		
		return SUCCESS;
	}
	
	/**
	 * 查询单个字典
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 添加字典
	 * @return
	 * @throws Exception
	 */
	public String add() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 修改字典
	 * @return
	 * @throws Exception
	 */
	public String modify() throws Exception{
		return SUCCESS;
	}
	
	/**
	 * 删除字典(多个)
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception{
		return SUCCESS;
	}
	
	
}
