package com.aisino2.sysadmin.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.json.annotations.JSON;

import com.opensymphony.xwork2.ActionSupport;

public class PageAction extends ActionSupport implements ServletRequestAware,ServletResponseAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 442165876833019790L;
	public String dir;
	public String sort;
	public int start;
	public int limit;
	public int total;
	
	public HttpServletRequest request;
	public HttpServletResponse response;
	public Map<String, Object> returnMap = new HashMap<String, Object>();
	public String returnMessage;
	public Integer returnNo = 0;
	public String returnMessageDebug;
	public Map<String, Object> queryExtraCond = new HashMap<String, Object>();
	public String mode;
//	日志
	public static final Logger log = Logger.getLogger(PageAction.class);

	
	
	/**
	 * 返回是否成功
	 * 当returnNo == 0 的时候表示正确,非0的时候表示错误
	 * @return
	 */
	public boolean isSuccess() {
		return returnNo == 0? true : false;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public Map<String, Object> getQueryExtraCond() {
		return queryExtraCond;
	}
	public void setQueryExtraCond(Map<String, Object> queryExtraCond) {
		this.queryExtraCond = queryExtraCond;
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
	public void setServletRequest(HttpServletRequest arg0) {
		this.request = arg0;
		
	}
	public void setServletResponse(HttpServletResponse arg0) {
		this.response = arg0;
	}
	public String getReturnMessage() {
		return returnMessage;
	}
	public void setReturnMessage(String returnMessage) {
		this.returnMessage = returnMessage;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public int getReturnNo() {
		return returnNo;
	}
	public void setReturnNo(Integer returnNo) {
		this.returnNo = returnNo;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getReturnMessageDebug() {
		return returnMessageDebug;
	}
	public void setReturnMessageDebug(String returnMessageDebug) {
		this.returnMessageDebug = returnMessageDebug;
	}
	public Map<String, Object> getReturnMap() {
		returnMap.put("returnNo", this.returnNo);
		returnMap.put("returnMessage",this.returnMessage);
		returnMap.put("returnMessageDebug", this.returnMessageDebug);
		
		return returnMap;
	}
	public void setReturnMap(Map<String, Object> returnMap) {
		this.returnMap = returnMap;
	}
	
	
	
}
