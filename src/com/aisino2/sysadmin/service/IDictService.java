package com.aisino2.sysadmin.service;

import java.util.List;
import java.util.Map;

import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Pager;

public interface IDictService {
	/** @param 字典(t_dict) 增加 */
	void insertDict(Dict dict);

	/** @param 字典(t_dict) 删除 */
	void deleteDict(Dict dict);

	/** @param 字典(t_dict) 修改 */
	void updateDict(Dict dict);

	/** @param 字典(t_dict) 查询单条 */
	Dict getDict(Dict dict);

	/** @param 字典(t_dict) 分页查询 */
	Pager getListForPage(final Dict dict,final Map<String, Object> extraParams,final int pageNo, final int pageSize,final String sort,final String desc);

	/** @param 字典(t_dict) 多条查询 */
	List<Dict> getListDict(Dict dict);
	
	/**
	 * 删除字典（多个）
	 * @param lDicts 需要被删除的字典
	 */
	void removeDicts(List<Dict> lDicts);
	
	/**
	 * 置顶
	 * @param dict 需要被置顶的字典，必须属性字典代码和字典序号
	 */
	void top(Dict dict);
	
	/**
	 * 置底
	 * @param dict 需要被置底的字典，必须属性字典代码和字典序号
	 */
	void bottom(Dict dict);
	
	/**
	 * 上移
	 * @param dict 需要上移的字典
	 */
	void up(Dict dict);
	
	/**
	 * 下移
	 * @param dict 需要下移的字典
	 */
	void down(Dict dict);
}
