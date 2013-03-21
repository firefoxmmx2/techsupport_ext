package com.aisino2.sysadmin.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.dao.IDict_itemDao;
import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Dict_item;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.service.IDict_itemService;

@Component
public class Dict_itemServiceImpl implements IDict_itemService {
	private IDict_itemDao dict_item_dao;

	@Resource(name = "dict_itemDaoImpl")
	public void setDict_item_dao(IDict_itemDao dict_item_dao) {
		this.dict_item_dao = dict_item_dao;
	}

	@Transactional
	public void insertDict_item(Dict_item dict_item) {
		if (dict_item == null)
			throw new RuntimeException("添加的字典项为空");
		if (!Util.isNotEmpty(dict_item.getFact_value()))
			throw new RuntimeException("添加的字典项的实际值为空");
		if (!Util.isNotEmpty(dict_item.getDict_code()))
			throw new RuntimeException("添加的字典项的字典代码为空");
		if (!Util.isNotEmpty(dict_item.getDisplay_name()))
			throw new RuntimeException("添加的字典项的显示值为空");

		dict_item_dao.insertDict_item(dict_item);
	}

	@Transactional
	public void deleteDict_item(Dict_item dict_item) {
		if (dict_item == null || !Util.isNotEmpty(dict_item.getItem_id())) {
			throw new RuntimeException("删除字典项的字典项ID为空");
		}
		dict_item_dao.deleteDict_item(dict_item);
	}

	@Transactional
	public void updateDict_item(Dict_item dict_item) {
		if (dict_item == null || !Util.isNotEmpty(dict_item.getItem_id())) {
			throw new RuntimeException("修改字典项的字典项ID为空");
		}
		dict_item_dao.updateDict_item(dict_item);
	}

	public Dict_item getDict_item(Dict_item dict_item) {
		if (dict_item == null
				|| dict_item.getItem_id() == null
				|| !(Util.isNotEmpty(dict_item.getDict_code()) && Util
						.isNotEmpty(dict_item.getFact_value())))
			throw new RuntimeException("查询单个字典项ITEMID或者FACTVALUE和DICTCODE为空");
		if (dict_item.getItem_id() != null && dict_item.getItem_id() != 0)
			return this.dict_item_dao.getDict_item(dict_item);
		else
			return this.dict_item_dao.getDict_item(dict_item.getDict_code(),
					dict_item.getFact_value());
	}

	public Pager getListForPage(Dict_item dictItem, int pageNo, int pageSize,
			String sort, String desc) {
		return dict_item_dao.getListForPage(dictItem, pageNo, pageSize, sort,
				desc);
	}

	public Integer getNextNodeorder(Dict_item dict_item) {
		return this.dict_item_dao.getNextNodeorder(dict_item);
	}

	@Override
	public List<Dict_item> getListDict_item(Dict_item dict_item) {
		return this.dict_item_dao.getListDict_item(dict_item);
	}

	@Transactional
	@Override
	public void down(Dict_item dictItem) {
		dictItem = this.getDict_item(dictItem);
		dictItem.setSib_order(dictItem.getSib_order() + 1);

		List<Dict_item> list = this.getListDict_item(dictItem);
		for (Dict_item item : list) {
			item.setSib_order(item.getSib_order() - 1);
			this.updateDict_item(item);
		}

		this.updateDict_item(dictItem);
	}

	@Transactional
	@Override
	public void up(Dict_item dictItem) {
		dictItem = this.getDict_item(dictItem);
		dictItem.setSib_order(dictItem.getSib_order() - 1);

		List<Dict_item> list = this.getListDict_item(dictItem);
		for (Dict_item item : list) {
			item.setSib_order(item.getSib_order() + 1);
			this.updateDict_item(item);
		}

		this.updateDict_item(dictItem);
	}

	@Transactional
	@Override
	public void top(Dict_item dictItem) {
		this.dict_item_dao.top(dictItem);
	}

	@Transactional
	@Override
	public void bottom(Dict_item dictItem) {
		this.dict_item_dao.bottom(dictItem);
	}

	@Transactional
	@Override
	public void removeDictItems(List<Dict_item> lDictItems) {
		if (lDictItems == null || lDictItems.isEmpty()) {
			throw new RuntimeException("需要被删除的字典项为空");
		}
		for (Dict_item item : lDictItems) {
			this.deleteDict_item(item);
		}
	}

}
