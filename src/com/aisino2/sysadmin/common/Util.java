package com.aisino2.sysadmin.common;

/*
 * 简单工具类
 */
public class Util {
	/**
	 * 判断对象是否不为空
	 * @param object 需要判断的对象
	 * @return true为不为空，false为空
	 */
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
