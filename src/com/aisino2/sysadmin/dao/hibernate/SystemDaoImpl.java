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
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.dao.ISystemDao;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.System;
@Component
public class SystemDaoImpl extends TechSupportBaseDaoImpl implements ISystemDao {

	public void insertSystem(System system) {
		this.getHibernateTemplate().save(system);
	}

	public void deleteSystem(System system) {
		this.getHibernateTemplate().delete(system);
	}

	public void updateSystem(System system) {
		this.getHibernateTemplate().merge(system);
	}

	public System getSystem(System system) {
		return (System) this.getHibernateTemplate().get(System.class,
				system.getSystemcode());
	}

	private Map<String, Object> get_para_and_hql(System para_entity,Map<String, Object> queryExtraCond,
			StringBuffer hql) {
		List<Object> para_list = new ArrayList<Object>();
		if (para_entity != null) {
			hql.append(" where 1=1");

			if (para_entity.getSystemcode() != null) {
				hql.append(" and t.systemcode = ?");
				para_list.add(para_entity.getSystemcode());
			}

			if (para_entity.getSystemname() != null) {
				hql.append(" and t.systemname like ?");
				para_list.add(para_entity.getSystemname() + "%");
			}

			if (para_entity.getParent() != null) {
				hql.append(" and t.parent = ?");
				para_list.add(para_entity.getParent());
			}
			
			if(Util.isNotEmpty(queryExtraCond.get("top"))){
				hql.append(" and t.parent is null");
			}

		}

		Map<String, Object> para_map = new HashMap<String, Object>();
		para_map.put("hql", hql);
		para_map.put("para", para_list);
		return para_map;
	}

	@SuppressWarnings("unchecked")
	public Pager getListForPage(final System system, final int pageNo,
			final int pageSize, String sort, String desc) {

		return  this.getHibernateTemplate().execute(new HibernateCallback<Pager>() {

			public Pager doInHibernate(Session sess)
					throws HibernateException, SQLException {
				Pager pager = new Pager();
				pager.setPageSize(pageSize);
				pager.setPageNo(pageNo);
				

				Criteria q = sess.createCriteria(System.class,"s");
				
				//condition
				Example ex = Example.create(system)
								.excludeZeroes()
								.ignoreCase();
				q.add(ex);
				if(system.getParent()!=null && !Util.isNotEmpty(system.getParent().getSystemcode()))
					q.add(Restrictions.isNull("parent"));
				if(system.getParent()!=null && Util.isNotEmpty(system.getParent().getSystemcode()))
					q.add(Restrictions.eq("parent", system.getParent()));
				if(Util.isNotEmpty(system.getSystemcode()))
					q.add(Restrictions.eq("systemcode", system.getSystemcode()));
				if(Util.isNotEmpty(system.getSystemname()))
					q.add(Restrictions.like("systemname", system.getSystemname()));
				if(Util.isNotEmpty(system.getSystemdefine()))
					q.add(Restrictions.like("systemname", system.getSystemdefine()));
				if(Util.isNotEmpty(system.getNodeorder()))
					q.add(Restrictions.eq("nodeorder", system.getNodeorder()));
				if(Util.isNotEmpty(system.getFullcode()))
					q.add(Restrictions.like("fullcode", system.getFullcode()));
				
				//count
				q.setProjection(Projections.rowCount());
				pager.setTotalCount(((Long)q.uniqueResult()).intValue());
				
				//data
//				q.setProjection(Projections.projectionList().add(Projections.property("systemcode"))
//															.add(Projections.property("systemname"))
//															.add(Projections.property("systemdefine"))
//															.add(Projections.property("picturepath"))
//															.add(Projections.property("parent"))
//															.add(Projections.property("nodeorder"))
//															.add(Projections.property("isleaf"))
//															.add(Projections.property("fullcode")));
				
				q.setProjection(null);
				// page
				q.setFirstResult(pager.getStartRecord());
				q.setMaxResults(pageSize);
				
				q.setResultTransformer(Criteria.ROOT_ENTITY);
				pager.setDatas(q.list());
				
				return pager;
			}
		});
	}

	@SuppressWarnings("unchecked")
	public List<System> getListSystem(final System system,final Map<String, Object> queryExtraCond) {
		return this.getHibernateTemplate().executeFind(new HibernateCallback<List<System>>() {

			public List<System> doInHibernate(Session sess)
					throws HibernateException, SQLException {
				StringBuffer hql = new StringBuffer("select t from System t");
				Map<String, Object> para_map = get_para_and_hql(system, queryExtraCond, hql);
				hql = (StringBuffer) para_map.get("hql");
				List<Object> para_list = (List<Object>) para_map.get("para");

				Query q = sess.createQuery(hql.toString());
				q.setCacheable(true);

				// para
				for (int i = 0; i < para_list.size(); i++)
					q.setParameter(i, para_list.get(i));

				return q.list();
			}
		});
	}

	@SuppressWarnings("unchecked")
	public List<System> getChildSystem(System system) {
		this.getHibernateTemplate().setCacheQueries(true);
		String hql = "";
		if(system == null || !Util.isNotEmpty(system.getSystemcode())){
			hql += "select new System(t.systemcode, t.systemname, t.systemdefine,	t.picturepath,t.nodeorder,t.isleaf, t.fullcode) from System t where t.parent is null";
			return this.getHibernateTemplate().find(hql,new Object[]{});
		}
			
		else{
			hql += "select new System(t.systemcode, t.systemname, t.systemdefine,	t.picturepath, t.parent,t.nodeorder,t.isleaf, t.fullcode) from System t where t.parent = ?";
			return this.getHibernateTemplate().find(hql,new Object[]{system});
		}
		
	}

	public List getTheUserChildSystem(System system) {
		// TODO Auto-generated method stub
		return null;
	}

	public System getParentSystem(System system) {
		// TODO Auto-generated method stub
		return null;
	}

	public List getAllChildSystem(System system) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean isExit(Map condition) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean checkChild(System system) {
		// TODO Auto-generated method stub
		return false;
	}

	public List getSystemByUserID(System system) {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer getNextNodeorder(final System system) {
		return this.getHibernateTemplate().execute(
					new HibernateCallback<Integer>() {
			public Integer doInHibernate(Session session)
					throws HibernateException, SQLException {
				String hql = "select max(nvl(t.nodeorder,0))+1 from System t" +
						" where 1=1";
				List<Object> paraList = new ArrayList<Object>();
				
				if(system.getParent()!=null){
					hql += " and t.parent = ?";
					paraList.add(system.getParent());
				}
				else
					hql += " and t.parent is null";
				Query q = session.createQuery(hql);
				for(int i=0;i<paraList.size();i++)
					q.setParameter(i, paraList.get(i));
				
				Integer nodeorder = (Integer) q.uniqueResult();
				
				return nodeorder;
			}
		});
	}

	public boolean checkSystemcode(final String systemcode) {
		boolean result = false;
		result = this.getHibernateTemplate().execute(new HibernateCallback<Boolean>() {

			public Boolean doInHibernate(Session sess)
					throws HibernateException, SQLException {
				long count = (Long) sess.createQuery("select count(s) from System s where s.systemcode = ?")
					.setParameter(0, systemcode)
					.uniqueResult();
				if(count==0)
					return true;
				else
					return false;
			}
			
		});
		return result;
	}

}
