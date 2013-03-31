package com.aisino2.sysadmin.dao;
import java.util.List;
import java.util.Map;

import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Pager;
public interface IDictDao {
	/** @param 字典(t_dict) 增加 */
	Dict insertDict(Dict dict);
	

	/** @param 字典(t_dict) 删除 */
	int deleteDict(Dict dict);
	

	/** @param 字典(t_dict) 修改 */
	int updateDict(Dict dict);
	

	/** @param 字典(t_dict) 查询单条 */
	Dict getDict(Dict dict);

	/** @param 字典(t_dict) 分页查询 */
	Pager getListForPage(Dict dict,Map<String, Object> extraParams, int pageNo,int pageSize,String sort,String desc);

	/** @param 字典(t_dict) 多条查询 */
	List<Dict> getListDict(Dict dict);
	

	/**
	 * 置顶
	 * @param dict 需要置顶字典，必要属性字典代码和字典序号
	 */
	void top(Dict dict);
	
	/**
	 * 置于最底
	 * @param dict 需要置底字典，必要属性字典代码和字典序号
	 */
	void bottom(Dict dict);
	
	/**
	 * 获取下一个序列
	 * @return
	 */
	int getNextOrder();
	
	/**
	 * 获取一个新的dictId
	 * @return
	 */
	int getDictId();
}
