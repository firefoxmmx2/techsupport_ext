package com.aisino2.sysadmin.dao.hibernate;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Projections;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.dao.IDict_itemDao;
import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Dict_item;
import com.aisino2.sysadmin.domain.Pager;

@Component
public class Dict_itemDaoImpl extends TechSupportBaseDaoImpl implements
		IDict_itemDao {

	public Dict_item insertDict_item(Dict_item dict_item) {
		this.getHibernateTemplate().save(dict_item);
		return dict_item;
	}

	public int deleteDict_item(Dict_item dict_item) {
		this.getHibernateTemplate().delete(dict_item);
		return 0;
	}

	public int updateDict_item(Dict_item dict_item) {
		this.getHibernateTemplate().update(dict_item);
		return 0;
	}

	public Dict_item getDict_item(Dict_item dict_item) {
		return this.getHibernateTemplate().get(Dict_item.class,
				dict_item.getItem_id());
	}

	public Pager getListForPage(final Dict_item map, final int pageNo,
			final int pageSize, final String sort, final String desc) {
		return this.getHibernateTemplate().execute(
				new HibernateCallback<Pager>() {

					public Pager doInHibernate(Session session)
							throws HibernateException, SQLException {
						Pager pager = new Pager();
						pager.setPageNo(pageNo);
						pager.setPageSize(pageSize);
						// condition
						Example ex = Example.create(map).ignoreCase()
								.excludeZeroes();
						Criteria q = session.createCriteria(Dict_item.class,
								"t");
						q.add(ex);
						// count
						q.setProjection(Projections.rowCount());
						pager.setTotalCount(((Long) q.uniqueResult())
								.intValue());
						// page
						q.setProjection(null);
						q.setFirstResult(pager.getStartRecord());
						q.setMaxResults(pager.getPageSize());

						pager.setDatas(q.list());
						return pager;
					}
				});
	}

	@SuppressWarnings("unchecked")
	public List<Dict_item> getListDict_item(final Dict_item dict_item) {
		return this.getHibernateTemplate().executeFind(
				new HibernateCallback<List<Dict_item>>() {

					public List<Dict_item> doInHibernate(Session session)
							throws HibernateException, SQLException {
						Example ex = Example.create(dict_item).ignoreCase()
								.excludeZeroes();
						Criteria q = session.createCriteria(Dict_item.class,
								"t");
						q.add(ex);
						return q.list();
					}
				});
	}

	public int getNextNodeorder(Dict_item dict_item) {
		String hql = "select max(nvl(t.sib_order,0))+1 from Dict_item t where t.dict_code=? ";
		return (Integer) this.getHibernateTemplate()
				.find(hql, dict_item.getDict_code()).get(0);
	}

	@Override
	public Dict_item getDict_item(String dictcode, String factValue) {
		try {
			return (Dict_item) this
					.getHibernateTemplate()
					.find("from Dict_item t where t.dict_code=? and t.fact_value=?",
							dictcode, factValue).get(0);
		} catch (Exception e) {
			return null;
		}

	}

	@Override
	public void top(Dict_item dictItem) {
		String hql="update Dict_item t set t.sib_order=t.sib_order+1 where t.dict_code=? and t.sib_order<?";
		String minHql="update Dict_item t set t.sib_order=min(nvl(t.sib_order,0))  where t.dict_code=? ";
		// 移动所有比自己靠前
		this.getHibernateTemplate().bulkUpdate(hql, dictItem.getDict_code(),dictItem.getSib_order());
		// 移动到最前端
		this.getHibernateTemplate().bulkUpdate(minHql,dictItem.getDict_code());
	}

	@Override
	public void bottom(Dict_item dictItem) {
		String hql="update Dict_item t set t.sib_order=t.sib_order-1 where t.dict_code=? and t.sib_order>?";
		String maxHql="update Dict_item t set t.sib_order=max(nvl(t.sib_order,0)) where t.dict_code=?";
		// 移动所有比自己靠后的
		this.getHibernateTemplate().bulkUpdate(hql,dictItem.getDict_code(),dictItem.getSib_order());
		// 移动到最前
		this.getHibernateTemplate().bulkUpdate(maxHql,dictItem.getDict_code());
	}


}
