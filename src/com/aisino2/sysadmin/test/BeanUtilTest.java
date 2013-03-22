package com.aisino2.sysadmin.test;


import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.domain.User;

public class BeanUtilTest {
	public static void main(String[] args){
		User needModifyUser = new User();
		needModifyUser.setUserid(1);
		needModifyUser.setEmail("test@test.com,");
		needModifyUser.setMobilephone("19702311988");
		needModifyUser.setUsername("jack");
		
		User afterUser  = new User();
		afterUser.setEmail("ff@fox.com");
		afterUser.setUsername("");
		afterUser.setUserid(1);
		
		Util.copyProperties(needModifyUser,afterUser);
		
		System.out.println("needModifyUser.getEmail() = "+needModifyUser.getEmail());
		System.out.println("needModifyUser.getMobilephone() = "+needModifyUser.getMobilephone());
		System.out.println("needModifyUser.getUsername() = "+needModifyUser.getUsername());
		
	}
}
