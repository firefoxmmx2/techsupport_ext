package com.aisino2.sysadmin.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert=true,dynamicUpdate=true)
@Table(name="t_system")
public class System implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2721863152529504755L;


	/** @param 系统(t_system) */

	
	public System() {
		super();
	}

	public System(String systemcode, String systemname, String systemdefine,
			String picturepath, System parent, Integer nodeorder,
			String isleaf, String fullcode) {
		super();
		this.systemcode = systemcode;
		this.systemname = systemname;
		this.systemdefine = systemdefine;
		this.picturepath = picturepath;
		this.parent = parent;
		this.nodeorder = nodeorder;
		this.isleaf = isleaf;
		this.fullcode = fullcode;
	}

	
	public System(String systemcode, String systemname, String systemdefine,
			String picturepath, Integer nodeorder, String isleaf,
			String fullcode) {
		super();
		this.systemcode = systemcode;
		this.systemname = systemname;
		this.systemdefine = systemdefine;
		this.picturepath = picturepath;
		this.nodeorder = nodeorder;
		this.isleaf = isleaf;
		this.fullcode = fullcode;
	}


	/** @ --系统代码--systemcode--String--20-- */
	@Id
	private String systemcode;

	/** @ --系统名称--systemname--String--50-- */
	@Column
	private String systemname;

	@Column
	/** @ --系统定义--systemdefine--String--200-- */
	private String systemdefine;

	@Column
	/** @ --图片路径--picturepath--String--200-- */
	private String picturepath;
	@ManyToOne(cascade={CascadeType.MERGE,CascadeType.PERSIST},targetEntity=System.class)
	@JoinColumn(name="parentsystemcode",nullable=true,referencedColumnName="systemcode")
	private System parent;
	@Column
	/** @ --节点顺序--nodeorder--Integer--9-- */
	private Integer nodeorder;

	@Column
	/** @ --是否叶结点--isleaf--String--1-- */
	private String isleaf;

	@Column
	/** @ --系统全路径代码--fullcode--String--50-- */
	private String fullcode;


	public String getSystemcode() {
		return systemcode;
	}

	public void setSystemcode(String systemcode) {
		this.systemcode = systemcode;
	}

	public String getSystemname() {
		return systemname;
	}

	public void setSystemname(String systemname) {
		this.systemname = systemname;
	}

	public String getSystemdefine() {
		return systemdefine;
	}

	public void setSystemdefine(String systemdefine) {
		this.systemdefine = systemdefine;
	}

	public String getPicturepath() {
		return picturepath;
	}

	public void setPicturepath(String picturepath) {
		this.picturepath = picturepath;
	}

	public System getParent() {
		return parent;
	}

	public void setParent(System parent) {
		this.parent = parent;
	}

	public Integer getNodeorder() {
		return nodeorder;
	}

	public void setNodeorder(Integer nodeorder) {
		this.nodeorder = nodeorder;
	}

	public String getIsleaf() {
		return isleaf;
	}

	public void setIsleaf(String isleaf) {
		this.isleaf = isleaf;
	}

	public String getFullcode() {
		return fullcode;
	}

	public void setFullcode(String fullcode) {
		this.fullcode = fullcode;
	}

	
}
