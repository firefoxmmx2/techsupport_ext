package com.aisino2.sysadmin.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

class User_rolePk implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2583508784722631958L;
	private Integer userid;
	private Integer roleid;

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public Integer getRoleid() {
		return roleid;
	}

	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}

	public User_rolePk(Integer userid, Integer roleid) {
		super();
		this.userid = userid;
		this.roleid = roleid;
	}

	public User_rolePk() {
		super();
	}

	@Override
	public int hashCode() {
		final int PRIME = 31;

		int result = 1;

		result = PRIME * result + ((userid == null) ? 0 : userid.hashCode());

		result = PRIME * result + ((roleid == null) ? 0 : roleid.hashCode());

		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		final User_rolePk other = (User_rolePk) obj;
		if (other.getRoleid().equals(this.getRoleid())
				&& other.getUserid().equals(this.getUserid()))
			return true;
		return false;
	}

}

@Entity
@Table(name = "t_user_role")
@IdClass(User_rolePk.class)
public class User_role implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2054228654798657726L;
	/**
	 * @param 用户角色
	 *            (t_user_role)
	 */

	@Id
	/** @ --角色ID--roleid--Integer--9-- */
	private Integer roleid;

	@Id
	/** @ --用户ID--userid--Integer--9-- */
	private Integer userid;

	/** @ 角色ID(roleid) */
	public Integer getRoleid() {
		return roleid;
	}

	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}

	/** @ 用户ID(userid) */
	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

}
