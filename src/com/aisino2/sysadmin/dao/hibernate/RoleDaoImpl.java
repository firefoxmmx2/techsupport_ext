package com.aisino2.sysadmin.dao.hibernate;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.dao.IRoleDao;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.Role;
import com.aisino2.sysadmin.domain.User;

@Component
public class RoleDaoImpl extends TechSupportBaseDaoImpl implements IRoleDao {

	public void insertRole(Role role) {
		this.getHibernateTemplate().save(role);
	}

	public void deleteRole(Role role) {
		this.getHibernateTemplate().delete(role);
	}

	public void updateRole(Role role) {
		this.getHibernateTemplate().update(role);
	}

	public Role getRole(Role role) {
		return this.getHibernateTemplate().get(role.getClass(),
				role.getRoleid());
	}

	@SuppressWarnings("unchecked")
	public List<Role> getListRole(final Role role) {

		return this.getHibernateTemplate().executeFind(
				new HibernateCallback<List<Role>>() {

					public List<Role> doInHibernate(Session session)
							throws HibernateException, SQLException {
						Criteria q = session.createCriteria(Role.class, "t");

						Example ex = Example.create(role);
						ex.ignoreCase();

						q.add(ex);

						return q.list();
					}

				});
	}

	@SuppressWarnings("unchecked")
	public List<Role> getRolesByUser(User user) {

		return this
				.getHibernateTemplate()
				.find("select new Role(t.roleid,t.departid,t.rolename,t.roledescription,t.roletype) from Role t,User_role ur where t.roleid = ur.roleid and ur.userid = ?",
						user.getUserid());
	}

	public List<Role> getOptionRolesForUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Role> getloginUserRoleOutDeptList(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Role> getDeptRoleList(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pager getListForPage(final Role role,final Map<String, Object> extra,
			final int pageNo, final int pageSize,final String sort,final String desc) {
		return this.getHibernateTemplate().execute(new HibernateCallback<Pager>() {

			@Override
			public Pager doInHibernate(Session session) throws HibernateException,
					SQLException {
				Pager pager = new Pager();
				pager.setPageNo(pageNo);
				pager.setPageSize(pageSize);
				
				Criteria q = session.createCriteria(Role.class, "t");

				// condition
				Example example = Example.create(role);
				example.ignoreCase();
				example.enableLike(MatchMode.START);
				q.add(example);

				//count
				q.setProjection(Projections.rowCount());
				pager.setTotalCount(((Long)q.uniqueResult()).intValue());
				// page
				q.setProjection(null);
				q.setFirstResult(pager.getStartRecord());
				q.setMaxResults(pager.getPageSize());
				
				q.setResultTransformer(Criteria.ROOT_ENTITY);
				pager.setDatas(q.list());
				
				return pager;
			}
		});
	}

	@Override
	public boolean checkRolename(String rolename) {
		String hql = "select count(t) from Role t where t.rolename = ?";
		long count = (Long) this.getHibernateTemplate().find(hql,rolename).get(0);
		if(count == 0)
			return true;
		return false;
	}

}
