package com.aisino2.sysadmin.dao.hibernate;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Example.PropertySelector;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.dao.IUserDao;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.User;
import com.opensymphony.module.sitemesh.Page;

/**
 * 
 * 用户数据
 * 
 */
@Component
public class UserDaoImpl extends TechSupportBaseDaoImpl implements IUserDao {

	public void insertUser(User user) {
		this.getHibernateTemplate().save(user);
	}

	public void deleteUser(User user) {
		this.getHibernateTemplate().delete(user);
	}

	public void updateUser(User user) {
		this.getHibernateTemplate().update(user);
	}

	public void updateUkeyUser(User user) {
		// TODO Auto-generated method stub

	}

	public User getUser(User user) {
		return (User) this.getHibernateTemplate().get(User.class,
				user.getUserid());
	}

	public User getPasswordByUseraccount(final User user) {
		if (user == null || user.getUseraccount() == null
				|| user.getPassword() == null)
			throw new RuntimeException("用户名或者密码为空");
		return this.getHibernateTemplate().execute(
				new HibernateCallback<User>() {

					@Override
					public User doInHibernate(Session session)
							throws HibernateException, SQLException {
						String hql = "select t from User t where t.useraccount = ? and t.password = ?";
						Query q = session.createQuery(hql);
						q.setParameter(0, user.getUseraccount());
						q.setParameter(1, user.getPassword());
						User findUser = (User) q.uniqueResult();
						return findUser;
					}

				});
	}

	@SuppressWarnings("unchecked")
	public Pager getListForPage(final User user, final int pageNo,
			final int pageSize, String sort, String desc) {
		return this.getHibernateTemplate().execute(new HibernateCallback() {

			public Pager doInHibernate(Session sess) throws HibernateException,
					SQLException {
				Pager pager = new Pager();
				pager.setPageNo(pageNo);
				pager.setPageSize(pageSize);

				Criteria q = sess.createCriteria(User.class);

				// condition
				Example example = Example.create(user).ignoreCase()
						.excludeZeroes().enableLike(MatchMode.START);
				q.add(example);
				if (Util.isNotEmpty(user.getUseraccount())) {
					q.add(Restrictions.eq("useraccount", user.getUseraccount()));
				}
				// count
				q.setProjection(Projections.rowCount());
				pager.setTotalCount(((Long) q.uniqueResult()).intValue());
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

	public List<User> getListUser(User user) {
		this.getHibernateTemplate().setCacheQueries(true);

		StringBuffer hql = new StringBuffer(
				"select new User(t.userid,t.departid,t.useraccount,t.username,t.password,t.department,t.roles) from User t");
		Map<String, Object> para_map = get_para_and_hql(user, hql);
		hql = (StringBuffer) para_map.get("hql");
		List<Object> para_list = (List<Object>) para_map.get("para");

		return this.getHibernateTemplate().find(hql.toString(),
				para_list.toArray());
	}

	public boolean checkUser(User user) {
		String hql = "select count(t) from User t where t.useraccount=?";
		Long count = (Long) this.getHibernateTemplate()
				.find(hql, user.getUseraccount()).get(0);
		if (count > 0)
			return false;
		else
			return true;

	}

	public void updatePwd(User user) {
		String hql = "update User set password=? where userid=?";
		this.getHibernateTemplate().bulkUpdate(hql, user.getPassword(),
				user.getUserid());
	}

	public Integer getNextNodeorder(User user) {
		String hql = "select max(nvl(t.userorder,0))+1 from User t where 1=1";
		if (user.getDepartid() == null || user.getDepartid().equals(0)) {
			hql += " and t.departid is null";
			return (Integer) this.getHibernateTemplate().find(hql).get(0);
		} else {
			hql += " and t.departid = ?";
			return (Integer) this.getHibernateTemplate()
					.find(hql, user.getDepartid()).get(0);
		}
	}

	public User getQybmByCyrybh(String sqlStmt) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getQymcByQybm(String qybm) {
		// TODO Auto-generated method stub
		return null;
	}

	public Page getListForPageQyOrGa(Map map, int pageNo, int pageSize,
			String sort, String desc) {
		// TODO Auto-generated method stub
		return null;
	}

	private Map<String, Object> get_para_and_hql(User para_entity,
			StringBuffer hql) {
		List<Object> para_list = new ArrayList<Object>();
		if (para_entity != null) {
			hql.append(" where 1=1");

			if (para_entity.getUserid() != null) {
				hql.append(" and t.userid = ? ");
				para_list.add(para_entity.getUserid());
			}

			if (para_entity.getUsername() != null) {
				hql.append(" and t.username like ?");
				para_list.add(para_entity.getUsername() + "%");
			}
			if (para_entity.getUseraccount() != null) {
				hql.append(" and t.useraccount = ?");
				para_list.add(para_entity.getUseraccount());
			}
			if (para_entity.getPassword() != null) {
				hql.append(" and t.password = ?");
				para_list.add(para_entity.getPassword());
			}

			if (para_entity.getIsvalid() != null) {
				hql.append(" and t.isvalid = ?");
				para_list.add(para_entity.getIsvalid());
			}

			if (para_entity.getIdnum() != null) {
				hql.append(" and t.idnum = ?");
				para_list.add(para_entity.getIdnum());
			}

			if (para_entity.getDepartid() != null
					|| para_entity.getDepartment() != null) {
				hql.append(" and t.departid = ?");
				if (para_entity.getDepartid() != null)
					para_list.add(para_entity.getDepartid());
				else if (para_entity.getDepartment().getDepartid() != null)
					para_list.add(para_entity.getDepartment().getDepartid());
			}
		}

		Map<String, Object> para_map = new HashMap<String, Object>();
		para_map.put("hql", hql);
		para_map.put("para", para_list);
		return para_map;
	}

}
