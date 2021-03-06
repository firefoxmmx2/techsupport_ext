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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
@Table(name = "t_user")
public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8417307436448716076L;

	public User() {
		super();
	}


	/**
	 * @param 用户
	 *            (t_user)
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_GEN_USERID")
	@SequenceGenerator(name = "SEQ_GEN_USERID", sequenceName = "userid")
	/** @ --用户ID--userid--Integer--9-- */
	private Integer userid;
	
	/** @ --机构ID--departid--Integer--9-- */
	@Column
	private Integer departid;

	@Column
	/** @ --用户帐号名--useraccount--String--20-- */
	private String useraccount;

	@Column
	/** @ --用户姓名--username--String--20-- */
	private String username;

	@Column
	/** @ --用户口令--password--String--100-- */
	private String password;

	@Column
	/** @ --用户顺序--userorder--Integer--9-- */
	private Integer userorder;

	@Column
	/** @ --是否有效--isvalid--String--1-- */
	private String isvalid;

	@Column
	/** @ --用户类别--usertype--String--2-- */
	private String usertype;

	@Column
	/** @ --用户身份证号--usertype--String--2-- */
	private String idnum;

	@Column
	/** @ --用户移动电话--usertype--String--2-- */
	private String mobilephone;
	/**
	 * 电子邮件
	 */
	@Column
	private String email;


	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "departid", insertable = false, updatable = false)
	private Department department;

	@ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST }, targetEntity = Role.class)
	@JoinTable(name = "t_user_role", joinColumns = @JoinColumn(name = "userid"), inverseJoinColumns = @JoinColumn(name = "roleid"))
	private List<Role> roles;
	

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	/** @ 用户ID(userid) */
	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	/** @ 机构ID(departid) */
	public Integer getDepartid() {
		return departid;
	}

	public void setDepartid(Integer departid) {
		this.departid = departid;
	}

	/** @ 用户姓名(username) */
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	/** @ 用户口令(password) */
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	/** @ 用户顺序(userorder) */
	public Integer getUserorder() {
		return userorder;
	}

	public void setUserorder(Integer userorder) {
		this.userorder = userorder;
	}

	/** @ 是否有效(isvalid) */
	public String getIsvalid() {
		return isvalid;
	}

	public void setIsvalid(String isvalid) {
		this.isvalid = isvalid;
	}

	/** @ 用户类别(usertype) */
	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}


	public String getIdnum() {
		return idnum;
	}

	public void setIdnum(String idnum) {
		this.idnum = idnum;
	}

	public String getMobilephone() {
		return mobilephone;
	}

	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public String getUseraccount() {
		return useraccount;
	}

	public void setUseraccount(String useraccount) {
		this.useraccount = useraccount;
	}

}
