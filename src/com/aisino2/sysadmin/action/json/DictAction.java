package com.aisino2.sysadmin.action.json;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JSONString;
import net.sf.json.util.JSONStringer;
import net.sf.json.util.JSONUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.core.util.json.JsonUtil;
import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.service.IDictService;
import com.hp.hpl.sparta.xpath.ThisNodeTest;

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
			dict = (Dict) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("qDict")),
					Dict.class);
			if (dict == null) {
				dict = new Dict();
			}
			Pager pager = dictService.getListForPage(dict, this.queryExtraCond,
					this.start, this.limit, this.dir, this.sort);
			lDicts = pager.getDatas();
			this.total = pager.getTotalCount();
			if ("detalilist".equals(mode)) {
				return "detaillist";
			}
		} catch (Exception e) {
			log.error(e);
			this.returnNo = -1;
			this.returnMessage = "字典列表查询出错";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}

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
			dict = (Dict) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("qDict")),
					Dict.class);
			if (dict == null)
				throw new RuntimeException("查询字典详情参数传递发生错误");
			dict = dictService.getDict(dict);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = -1;
			this.returnMessage = "查询字典详情发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
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
			dict = (Dict) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("aDict")),
					Dict.class);
			if (dict == null)
				throw new RuntimeException("添加字典参数传递发生错误");
			dictService.insertDict(dict);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = -1;
			this.returnMessage = "添加字典发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
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
			dict = (Dict) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("mDict")),
					Dict.class);
			if (dict == null)
				throw new RuntimeException("修改字典参数传递发生错误");
			dictService.updateDict(dict);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = -1;
			this.returnMessage = "修改字典发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	/**
	 * 删除字典
	 * 
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception {
		try {
			lDicts = (List<Dict>) JSONArray.toList(
					JSONArray.fromObject(this.request.getParameter("rlDicts")),
					Dict.class);
			if (lDicts == null || lDicts.size() == 0)
				throw new RuntimeException("删除字典参数传递发生错误");
			dictService.removeDicts(lDicts);
		} catch (Exception e) {
			log.error(e);
			this.returnNo = -1;
			this.returnMessage = "删除字典发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				this.returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}

	public String checkDictcode() throws Exception {
		try {
			dict = (Dict) JSONObject.toBean(
					JSONObject.fromObject(this.request.getParameter("cDict")),
					Dict.class);
			if (dict == null || !Util.isNotEmpty(dict.getDict_code())) {
				throw new RuntimeException("检查字典代码参数传输错误");
			}
			boolean result = dictService.checkDictcode(dict.getDict_code());
			if (result) {
				returnNo = 0;
			} else {
				returnNo = 1;
			}
		} catch (Exception e) {
			log.error(e);
			returnNo = -1; 
			returnMessage = "检查字典代码发生错误";
			if (log.isDebugEnabled()) {
				log.debug(e, e.fillInStackTrace());
				returnMessageDebug = e.getMessage();
			}
		}
		return SUCCESS;
	}
}
