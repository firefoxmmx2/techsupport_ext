package com.aisino2.sysadmin.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;


@Entity
@org.hibernate.annotations.Entity(dynamicInsert=true,dynamicUpdate=true)
@Table(name="t_menu")
public class Menu implements Serializable {

	

	/**
	 * 
	 */
	private static final long serialVersionUID = -8427544520180440919L;

	public Menu(String menucode, String menuname, String funcentry,
			Integer menulevel, String menufullcode, Integer nodeorder,
			String isleaf) {
		super();
		this.menucode = menucode;
		this.menuname = menuname;
		this.funcentry = funcentry;
		this.menulevel = menulevel;
		this.menufullcode = menufullcode;
		this.nodeorder = nodeorder;
		this.isleaf = isleaf;
	}

	public Menu(String menucode, String menuname, String funcentry,
			Integer menulevel, String menufullcode, Integer nodeorder,
			String isleaf, System system, Menu parent) {
		super();
		this.menucode = menucode;
		this.menuname = menuname;
		this.funcentry = funcentry;
		this.menulevel = menulevel;
		this.menufullcode = menufullcode;
		this.nodeorder = nodeorder;
		this.isleaf = isleaf;
		this.system = system;
		this.parent = parent;
	}

	/**
	 * @param 菜单
	 *            (t_menu)
	 */

	public Menu() {
		super();
	}

	/** @ --菜单代码--menucode--String--40-- */
	@Id
	private String menucode;

	@Column
	private String menuname;

	@Column
	private String funcentry;
	@Column
	private Integer menulevel;

	@Column
	private String menufullcode;
	@Column
	private Integer nodeorder;
	@Column
	private String isleaf;


	/** 子菜单 */
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="menucode",referencedColumnName="parentmenucode",insertable=false,updatable=false)
	private List<Menu> child_menu_list;

	@ManyToOne
	@JoinColumn(name="systemcode",nullable=false,referencedColumnName="systemcode")
	private System system;
	@ManyToOne
	@JoinColumn(name="parentmenucode",nullable=true,referencedColumnName="menucode")
	private Menu parent;


	public System getSystem() {
		return system;
	}

	public void setSystem(System system) {
		this.system = system;
	}


	/** @ 菜单代码(menucode) */
	public String getMenucode() {
		return menucode;
	}

	public void setMenucode(String menucode) {
		this.menucode = menucode;
	}

	/** @ 菜单名称(menuname) */
	public String getMenuname() {
		return menuname;
	}

	public void setMenuname(String menuname) {
		this.menuname = menuname;
	}

	/** @ 功能入口(funcentry) */
	public String getFuncentry() {
		return funcentry;
	}

	public void setFuncentry(String funcentry) {
		this.funcentry = funcentry;
	}

	/** @ 菜单层次(menulevel) */
	public Integer getMenulevel() {
		return menulevel;
	}

	public void setMenulevel(Integer menulevel) {
		this.menulevel = menulevel;
	}


	/** @ 菜单全路径代码(menufullcode) */
	public String getMenufullcode() {
		return menufullcode;
	}

	public void setMenufullcode(String menufullcode) {
		this.menufullcode = menufullcode;
	}

	/** @ 节点顺序(nodeorder) */
	public Integer getNodeorder() {
		return nodeorder;
	}

	public void setNodeorder(Integer nodeorder) {
		this.nodeorder = nodeorder;
	}

	/** @ 是否叶结点(isleaf) */
	public String getIsleaf() {
		return isleaf;
	}

	public void setIsleaf(String isleaf) {
		this.isleaf = isleaf;
	}


	public List<Menu> getChild_menu_list() {
		return child_menu_list;
	}

	public void setChild_menu_list(List<Menu> child_menu_list) {
		this.child_menu_list = child_menu_list;
	}

	public Menu getParent() {
		return parent;
	}

	public void setParent(Menu parent) {
		this.parent = parent;
	}

}
