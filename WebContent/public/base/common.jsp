<%@page import="com.aisino2.sysadmin.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String context_path = request.getContextPath();
	String javascript_home = context_path + "/public/javascript";
%>

<script type="text/javascript">
	/** 上下文路径 */
	context_path = '<%=context_path%>';
	
	/** 常量列表 */	
	/**
	 * 用户类别字典代码
	 */
	USER_TYPE_DICT_CODE = "<%=Constants.USER_TYPE_DICT_CODE%>";
	/**
	 * 技术支持单状态字典代码 
	 */
	ST_DM_TS_STATUS_DICT_CODE = "<%=Constants.ST_DM_TS_STATUS_DICT_CODE%>";
	/**
	 * 技术支持单地区角色字典代码
	 */
	ST_DM_TS_RM_MAP_DICT_CODE = "<%=Constants.ST_DM_TS_RM_MAP_DICT_CODE%>";
	/**
	 * 技术支持单地区字典代码
	 */
	ST_DM_TS_REGIN_DICT_CODE = "<%=Constants.ST_DM_TS_REGIN_DICT_CODE%>";
	/**
	 * 技术支持单流程环节字典代码
	 */
	ST_DM_TS_PROC_DICT_CODE = "<%=Constants.ST_DM_TS_PROC_DICT_CODE%>";
</script>