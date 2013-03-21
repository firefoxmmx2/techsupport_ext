package com.aisino2.sysadmin.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.aisino2.sysadmin.dao.IDictDao;
import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Dict_item;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.service.IDictService;

@Component
public class DictServiceImpl implements IDictService {
	private IDictDao dict_dao;
	
	@Transactional
	public void insertDict(Dict dict) {
		dict_dao.insertDict(dict);
	}

	@Transactional
	public void deleteDict(Dict dict) {
		dict_dao.deleteDict(dict);
	}

	@Transactional
	public void updateDict(Dict dict) {
		dict_dao.updateDict(dict);
	}

	public Dict getDict(Dict dict) {
		return dict_dao.getDict(dict);
	}


	public List<Dict> getListDict(Dict dict) {
		return dict_dao.getListDict(dict);
	}


	@Resource(name="dictDaoImpl")
	public void setDict_dao(IDictDao dict_dao) {
		this.dict_dao = dict_dao;
	}

	@Override
	public Pager getListForPage(Dict dict, Map<String, Object> extraParams,
			int pageNo, int pageSize, String sort, String desc) {
		return dict_dao.getListForPage(dict, extraParams, pageNo, pageSize, sort, desc);
	}

	@Transactional
	@Override
	public void removeDicts(List<Dict> lDicts) {
		if(lDicts == null || lDicts.isEmpty())
			throw new RuntimeException("需要被删除的字典为空");
		for (Dict dict : lDicts) {
			this.deleteDict(dict);
		}
	}

	@Transactional
	@Override
	public void top(Dict dict) {
		this.dict_dao.top(dict);
	}

	@Transactional
	@Override
	public void bottom(Dict dict) {
		this.dict_dao.bottom(dict);
	}

	@Transactional
	@Override
	public void up(Dict dict) {
		dict = this.getDict(dict);
		dict.setSib_order(dict.getSib_order() - 1);

		List<Dict> list = this.getListDict(dict);
		for (Dict item : list) {
			item.setSib_order(item.getSib_order() + 1);
			this.updateDict(item);
		}

		this.updateDict(dict);
	}

	@Transactional
	@Override
	public void down(Dict dict) {
		dict = this.getDict(dict);
		dict.setSib_order(dict.getSib_order() + 1);

		List<Dict> list = this.getListDict(dict);
		for (Dict item : list) {
			item.setSib_order(item.getSib_order() - 1);
			this.updateDict(item);
		}

		this.updateDict(dict);
	}

}
