package com.aisino2.sysadmin.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.dao.ISystemDao;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.System;
import com.aisino2.sysadmin.service.ISystemService;

@Component
public class SystemServiceImpl implements ISystemService {
	private ISystemDao system_dao;

	
	@Resource(name="systemDaoImpl")
	public void setSystem_dao(ISystemDao system_dao) {
		this.system_dao = system_dao;
	}

	@Transactional
	public void insertSystem(System system) {
		if(system == null)
			throw new RuntimeException("系统插入参数为空");
		system.setIsleaf("Y");
		system.setNodeorder(getNextNodeorder(system));
		if(system.getParent() != null && Util.isNotEmpty(system.getParent().getSystemcode())){
			system.setParent(this.getSystem(system.getParent()));
			system.getParent().setIsleaf("N");
			this.system_dao.updateSystem(system.getParent());
		}
		
		this.system_dao.insertSystem(system);
	}
	@Transactional
	public void deleteSystem(System system) {
		if(system == null || !Util.isNotEmpty(system.getSystemcode()))
			throw new RuntimeException("系统删除参数为空");
		this.system_dao.deleteSystem(system);
	}
	@Transactional
	public void updateSystem(System system) {
		if(system == null || !Util.isNotEmpty(system.getSystemcode()))
			throw new RuntimeException("系统修改参数为空");
		this.system_dao.updateSystem(system);
	}


	public System getSystem(System system) {
		if(system == null || !Util.isNotEmpty(system.getSystemcode()))
			throw new RuntimeException("通过系统代码获取系统信息参数为空");
		return this.system_dao.getSystem(system);
	}


	public Pager getListForPage(System system, int pageNo, int pageSize,
			String sort, String desc) {
		
		return this.system_dao.getListForPage(system, pageNo, pageSize, sort, desc);
	}


	public List<System> getListSystem(System system,Map<String, Object> queryExtraCond) {
		return this.system_dao.getListSystem(system,queryExtraCond);
	}


	public List<System> getChildSystem(System system) {
		return this.system_dao.getChildSystem(system);
	}


	public List<System> getTheUserChildSystem(System system) {
		return this.system_dao.getTheUserChildSystem(system);
	}


	public System getParentSystem(System system) {
		return this.system_dao.getParentSystem(system);
	}


	public boolean isExit(Map condition) {
		// TODO Auto-generated method stub
		return false;
	}


	public List<System> getSystemByUserID(System system) {
		return this.system_dao.getSystemByUserID(system);
	}


	public boolean updateSystemEditEdOrder(System system) {
		// TODO Auto-generated method stub
		return false;
	}


	public Integer getNextNodeorder(System system) {
		if(system==null || !Util.isNotEmpty(system.getSystemcode()))
			throw new RuntimeException("获取下一个排序用序列的参数系统编码为空");
		return this.system_dao.getNextNodeorder(system);
	}


	public boolean checkSystemcode(String systemcode) {
		if(!Util.isNotEmpty(systemcode))
			throw new RuntimeException("需要验证可用性的系统代码为空");
		return this.system_dao.checkSystemcode(systemcode);
	}

	@Transactional
	public void removeAll(List<System> systemList) {
		if(systemList == null || systemList.size()==0)
			throw new RuntimeException("批量删除系统的参数为空");
		for(System system : systemList){
			this.deleteSystem(system);
		}
		
		if(this.getChildSystem(systemList.get(0).getParent()).size()==0){
			systemList.get(0).getParent().setIsleaf("Y");
			this.updateSystem(systemList.get(0).getParent());
		}
	}
	
	

}
