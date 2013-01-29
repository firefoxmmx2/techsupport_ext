package com.aisino2.sysadmin.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
@Table(name = "t_role")
public class Role implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3524393715428189926L;

	public Role(Integer roleid, Integer departid, String rolename,
			String roledescription, Integer roletype) {
		super();
		this.roleid = roleid;
		this.departid = departid;
		this.rolename = rolename;
		this.roledescription = roledescription;
		this.roletype = roletype;
	}

	/**
	 * @param 角色
	 *            (t_role)
	 */

	public Role() {
		super();
	}

	/** @ --角色ID--roleid--Integer--9-- */
	@Id
	@GeneratedValue(generator = "SEQ_GEN_ROLEID", strategy = GenerationType.AUTO)
	@SequenceGenerator(name = "SEQ_GEN_ROLEID", sequenceName = "roleid")
	private Integer roleid;

	@Column
	/** @ --机构ID--departid--Integer--9-- */
	private Integer departid;

	@Column
	/** @ --角色名称--rolename--String--50-- */
	private String rolename;

	@Column
	/** @ --角色描述--roledescription--String--100-- */
	private String roledescription;

	@Column
	/** @ --角色类别--roletype--Integer--1-- */
	private Integer roletype;

	@ManyToOne
	@JoinColumn(name="departid",insertable=false,updatable=false)
	private Department department;
	@OneToMany(cascade={CascadeType.MERGE,CascadeType.PERSIST},targetEntity=Function.class)
	@JoinTable(name="t_role_func",joinColumns=@JoinColumn(name="roleid"),inverseJoinColumns=@JoinColumn(name="funccode"))
	private List<Function> roleFunctions;
	@ManyToMany(cascade={CascadeType.MERGE,CascadeType.PERSIST},targetEntity=User.class)
	@JoinTable(name="t_user_role",joinColumns=@JoinColumn(name="roleid"),inverseJoinColumns=@JoinColumn(name="userid"))
	private List<User> roleUsers;
	@ManyToMany(cascade={CascadeType.MERGE,CascadeType.PERSIST},targetEntity=Menu.class)
	@JoinTable(name="t_role_menu",joinColumns=@JoinColumn(name="roleid"),inverseJoinColumns=@JoinColumn(name="menucode"))
	private List<Menu> roleMenus;


	/** @ 角色ID(roleid) */
	public Integer getRoleid() {
		return roleid;
	}

	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}

	/** @ 机构ID(departid) */
	public Integer getDepartid() {
		return departid;
	}

	public void setDepartid(Integer departid) {
		this.departid = departid;
	}

	/** @ 角色名称(rolename) */
	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	/** @ 角色描述(roledescription) */
	public String getRoledescription() {
		return roledescription;
	}

	public void setRoledescription(String roledescription) {
		this.roledescription = roledescription;
	}

	/** @ 角色类别(roletype) */
	public Integer getRoletype() {
		return roletype;
	}

	public void setRoletype(Integer roletype) {
		this.roletype = roletype;
	}


	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}


	public List<Function> getRoleFunctions() {
		return roleFunctions;
	}

	public void setRoleFunctions(List<Function> roleFunctions) {
		this.roleFunctions = roleFunctions;
	}

	public List<User> getRoleUsers() {
		return roleUsers;
	}

	public void setRoleUsers(List<User> roleUsers) {
		this.roleUsers = roleUsers;
	}

	public List<Menu> getRoleMenus() {
		return roleMenus;
	}

	public void setRoleMenus(List<Menu> roleMenus) {
		this.roleMenus = roleMenus;
	}
}
