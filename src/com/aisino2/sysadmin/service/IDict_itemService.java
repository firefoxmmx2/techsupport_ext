package com.aisino2.sysadmin.service;

import java.util.List;
import java.util.Map;

import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Dict_item;
import com.aisino2.sysadmin.domain.Pager;

/**
 * 字典项
 * @author ffmmx
 *
 */
public interface IDict_itemService {
	/**
	 * @param 字典项
	 *            (t_dict_item) 增加
	 */
	void insertDict_item(Dict_item dict_item);

	/**
	 * @param 字典项
	 *            (t_dict_item) 删除
	 */
	void deleteDict_item(Dict_item dict_item);

	/**
	 * @param 字典项
	 *            (t_dict_item) 修改
	 */
	void updateDict_item(Dict_item dict_item);

	/**
	 * @param 字典项
	 *            (t_dict_item) 查询单条
	 */
	Dict_item getDict_item(Dict_item dict_item);

	/**
	 * @param 字典项
	 *            (t_dict_item) 分页查询
	 */
	Pager getListForPage(Dict_item dict_item, int pageNo, int pageSize, String sort,
			String desc);

	/**
	 * @param 字典项
	 *            (t_dict_item) 多条查询
	 */
	List<Dict_item> getListDict_item(Dict_item dict_item);


	/**
	 * 获得下一个排序号
	 * 
	 * @param dict_item
	 *            .super_item_id
	 * @return
	 */
	Integer getNextNodeorder(Dict_item dict_item);
	
	
	/**
	 * 下移
	 * @param dictItem
	 */
	void shiftDown(Dict_item dictItem);
	
	/**
	 * 上移
	 * @param dictItem
	 */
	void shiftUp(Dict_item dictItem);
	/**
	 * 置顶
	 * @param dictItem
	 */
	void top(Dict_item dictItem);
	/**
	 * 最底
	 * @param dictItem
	 */
	void bottom(Dict_item dictItem);
}
