package com.aisino2.sysadmin.common;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;

/*
 * 简单工具类
 */
public class Util {
	private static final Logger log = Logger.getLogger(Util.class);
	/**
	 * 判断对象是否不为空
	 * 
	 * @param object
	 *            需要判断的对象
	 * @return true为不为空，false为空
	 */
	public static boolean isNotEmpty(Object object) {
		if (object instanceof String) {
			if (object != null && ((String) object).length() > 0)
				return true;
		} else if (object != null)
			return true;
		return false;
	}

	/**
	 * 复制对象的所有非空的属性到目标对象
	 * 
	 * @param target
	 *            目标对象
	 * @param source
	 *            源对象
	 */
	public static void copyProperties(Object target, Object source) {
		if (target == null)
			throw new RuntimeException("目标对象为空");
		if (source == null)
			throw new RuntimeException("源对象为空");
		// 忽略的属性列表
		List<String> lIgnoreProperties = new ArrayList<String>();

		// 源对象字段
		Field[] sourceFields = source.getClass().getDeclaredFields();
		// 源对象方法映射
		Map<String, Method> sourceMethodsMap = new HashMap<String, Method>();
		for (Method method : source.getClass().getMethods()) {
			sourceMethodsMap.put(method.getName(), method);
		}

		for (Field field : sourceFields) {
			Object value = null;
			try {
				Method method = sourceMethodsMap.get(
						"get" + field.getName().substring(0, 1).toUpperCase()
						+ field.getName().substring(1));
				if(method!=null){
					value = method.invoke(source,
							null);
				}
			} catch (IllegalAccessException e) {
				log.debug(e);
			} catch (IllegalArgumentException e) {
				log.debug(e);
			} catch (InvocationTargetException e) {
				log.debug(e);
			}
			if (value == null)
				lIgnoreProperties.add(field.getName());
		}
		String[] ignoreProperties = new String[lIgnoreProperties.size()];
		BeanUtils.copyProperties(source, target,
				lIgnoreProperties.toArray(ignoreProperties));
	}
}
