package com.aisino2.sysadmin.domain;

import java.util.List;

import com.aisino2.core.dao.Page;

/**
 * 分页容器
 */
public class Pager {
	/**
	 * 排序列 
	 */
	private String dir;
	/**
	 * 排序方式
	 */
	private String sort;
	/**
	 * 总记录数
	 */
	private int totalCount;
	/**
	 * 数据列表
	 */
	private List datas;
	/**
	 * 页码号
	 */
	private int pageNo = 1;
	/**
	 * 每页记录数
	 */
	private int pageSize = 25;
	
	
	/**
	 * 起始记录数 
	 */
	public int getStartRecord() {
		if(pageNo > 0 && pageSize > 0)
			return (pageNo - 1) * pageSize;
		return 0;
	}
	
	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public List getDatas() {
		return datas;
	}
	public void setDatas(List datas) {
		this.datas = datas;
	}
	
	
	
}
