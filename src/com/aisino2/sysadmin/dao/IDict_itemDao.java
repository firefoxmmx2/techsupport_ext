package com.aisino2.sysadmin.dao;

import java.util.List;

import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Dict_item;
import com.aisino2.sysadmin.domain.Pager;

public interface IDict_itemDao {
	/**
	 * @param 字典项
	 *            (t_dict_item) 增加
	 */
	Dict_item insertDict_item(Dict_item dict_item);

	/**
	 * @param 字典项
	 *            (t_dict_item) 删除
	 */
	int deleteDict_item(Dict_item dict_item);

	/**
	 * @param 字典项
	 *            (t_dict_item) 修改
	 */
	int updateDict_item(Dict_item dict_item);

	/**
	 * @param 字典项
	 *            (t_dict_item) 查询单条
	 */
	Dict_item getDict_item(Dict_item dict_item);

	/**
	 * @param 字典项
	 *            (t_dict_item) 分页查询
	 */
	Pager getListForPage(Dict_item map, int pageNo, int pageSize, String sort,
			String desc);

	/**
	 * @param 字典项
	 *            (t_dict_item) 多条查询
	 */
	List<Dict_item> getListDict_item(Dict_item dict_item);


	/** 获得下一个排序号 */
	int getNextNodeorder(Dict_item dict_item);
	
	/**
	 * 查询单个字典项
	 * @param dictcode 字典代码 
	 * @param factValue 字典实际值
	 * @return 字典项
	 */
	Dict_item getDict_item(String dictcode,String factValue);
	
	/**
	 * 放置在最前
	 * @param dictItem
	 */
	void top(Dict_item dictItem);
	/**
	 * 放置在最后
	 * @param dictItem
	 */
	void bottom(Dict_item dictItem);
}
