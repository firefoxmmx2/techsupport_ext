package com.aisino2.sysadmin.action.json;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.Dict_item;
import com.aisino2.sysadmin.service.IDict_itemService;

/**
 * 字典项
 * 
 * @author ffmmx
 * 
 */
@Component
@Scope("prototype")
public class DictItemAction extends PageAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7270661126325151735L;

	private IDict_itemService dict_itemService;

	private Dict_item dictItem;
	private List<Dict_item> lDictItems;

	public Dict_item getDictItem() {
		return dictItem;
	}

	public void setDictItem(Dict_item dictItem) {
		this.dictItem = dictItem;
	}

	public List<Dict_item> getlDictItems() {
		return lDictItems;
	}

	public void setlDictItems(List<Dict_item> lDictItems) {
		this.lDictItems = lDictItems;
	}

	@Resource(name = "dict_itemService")
	public void setDict_itemService(IDict_itemService dict_itemService) {
		this.dict_itemService = dict_itemService;
	}

	/**
	 * 查询字典项列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception {
		try {

		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "查询字典项列表错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}

			throw e;
		}
		return SUCCESS;
	}

	/**
	 * 查询单个字典项
	 * 
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception {
		try {
			if (dictItem == null)
				throw new RuntimeException("查询单个字典项参数传输发生错误");
			dictItem = this.dict_itemService.getDict_item(dictItem);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "查询单个字典发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}

	/**
	 * 添加字典项
	 * 
	 * @return
	 * @throws Exception
	 */
	public String add() throws Exception {
		try {
			if (dictItem == null)
				throw new RuntimeException("添加字典项参数传输错误");
			this.dict_itemService.insertDict_item(dictItem);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "添加字典项发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}

	/**
	 * 修改字典项
	 * 
	 * @return
	 * @throws Exception
	 */
	public String modify() throws Exception{
		try {
			if(dictItem == null)
				throw new RuntimeException("修改字典项参数传输发生错误");
			this.dict_itemService.updateDict_item(dictItem);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "修改字典项发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}

	/**
	 * 删除字典项（多个）
	 * 
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception {
		try {
			if (lDictItems == null || lDictItems.isEmpty())
				throw new RuntimeException("删除字典项参数传输发生错误");
			this.dict_itemService.removeDictItems(lDictItems);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "删除字典项发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}
}
