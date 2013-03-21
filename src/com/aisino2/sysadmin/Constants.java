package com.aisino2.sysadmin;

/**
 * 系统常量
 * @author hooxin
 *
 */
public  abstract class Constants {
	//session中存放用户的key
	public static final String userKey="userKey_user";
//	session中存放用户所有菜单权限的key
	public static final String userMenuKey="userMenuKey_menu";

//	session中存放用户所有系统权限的key
	public static final String systemKey="systemKey_system";

//	session中存放用户所有系统权限的name
	public static final String systemName="systemName_system";
//	session中存放系统列表的key
	public static final String systemList="systemList_system";
	
//	session中存放功能列表的key
	public static final String functionList="functionList_function";
	
	//session中存放用户的key
	public static final String csbm_Key="csidlixian";
	
	/**
	 * 用户类别字典代码
	 */
	public static final String USER_TYPE_DICT_CODE = "dm_yhlb";
	
	/**
	 * 技术支持单状态字典代码 
	 */
	public static final String ST_DM_TS_STATUS_DICT_CODE = "dm_ts_status";
	
	/**
	 * 技术支持单地区角色字典代码
	 */
	public static final String ST_DM_TS_RM_MAP_DICT_CODE = "dm_ts_rm_map";
	
	/**
	 * 技术支持单地区字典代码
	 */
	public static final String ST_DM_TS_REGIN_DICT_CODE = "dm_ts_regin";
	
	/**
	 * 技术支持单流程环节字典代码
	 */
	public static final String ST_DM_TS_PROC_DICT_CODE = "dm_ts_proc";
	
}
