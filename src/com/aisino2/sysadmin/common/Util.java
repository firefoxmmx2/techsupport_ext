package com.aisino2.sysadmin.common;

/*
 * 简单工具类
 */
public class Util {
	public static boolean isNotEmpty(Object object){
		if(object instanceof String){
			if(object != null && ((String)object).length() > 0)
				return true;
		}
		else
			if(object != null)
				return true;
		return false;  
	}
}
