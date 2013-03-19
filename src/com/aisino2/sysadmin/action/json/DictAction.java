package com.aisino2.sysadmin.action.json;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Pager;
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
	
	private Dict dict;
	private List<Dict> lDicts;
	
	
	public List<Dict> getlDicts() {
		return lDicts;
	}

	public void setlDicts(List<Dict> lDicts) {
		this.lDicts = lDicts;
	}

	public Dict getDict() {
		return dict;
	}

	public void setDict(Dict dict) {
		this.dict = dict;
	}

	@Resource(name="dictServiceImpl")
	public void setDictService(IDictService dictService) {
		this.dictService = dictService;
	}

	/**
	 * 查询字典列表
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception{
		try {
			Pager pager=dictService.getListForPage(dict,this.queryExtraCond, pageNo, pageSize, dir, this.sort);
			
		} catch (Exception e) {
			// TODO: handle exception
		}
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
