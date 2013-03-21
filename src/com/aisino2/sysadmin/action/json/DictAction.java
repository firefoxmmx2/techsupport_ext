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
 * 
 * @author ffmmx
 * 
 */
@Component
@Scope("prototype")
public class DictAction extends PageAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6449118636725309318L;

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

	@Resource(name = "dictServiceImpl")
	public void setDictService(IDictService dictService) {
		this.dictService = dictService;
	}

	/**
	 * 查询字典列表
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String querylist() throws Exception {
		try {
			Pager pager = dictService.getListForPage(dict, this.queryExtraCond,
					this.start, this.limit, this.dir, this.sort);
			lDicts = pager.getDatas();
			this.total = pager.getTotalCount();
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "字典列表查询出错";
			if (log.isDebugEnabled()) {
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			
			throw e;
		}
		return SUCCESS;
	}

	/**
	 * 查询单个字典
	 * 
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception {
		try {
			if(dict == null)
				throw new RuntimeException("查询字典详情参数传递发生错误");
			dict = dictService.getDict(dict);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "查询字典详情发生错误";
			if(log.isDebugEnabled()){
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}

	/**
	 * 添加字典
	 * 
	 * @return
	 * @throws Exception
	 */
	public String add() throws Exception {
		try {
			if(dict == null)
				throw new RuntimeException("添加字典参数传递发生错误");
			dictService.insertDict(dict);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "添加字典发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}

	/**
	 * 修改字典
	 * 
	 * @return
	 * @throws Exception
	 */
	public String modify() throws Exception {
		try {
			if(dict == null)
				throw new RuntimeException("修改字典参数传递发生错误");
			dictService.updateDict(dict);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "修改字典发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}

	/**
	 * 删除字典(多个)
	 * 
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception {
		try {
			if(lDicts == null || lDicts.size() == 0)
				throw new RuntimeException("删除字典参数传递发生错误");
			dictService.removeDicts(lDicts);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = 1;
			this.returnMessage = "删除字典发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e,e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
			throw e;
		}
		return SUCCESS;
	}

}
