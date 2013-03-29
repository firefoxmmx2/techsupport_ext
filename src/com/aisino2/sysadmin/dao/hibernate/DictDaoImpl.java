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
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.dao.IDictDao;
import com.aisino2.sysadmin.domain.Dict;
import com.aisino2.sysadmin.domain.Pager;

@Component
public class DictDaoImpl extends TechSupportBaseDaoImpl implements IDictDao {

	public Dict insertDict(Dict dict) {
		this.getHibernateTemplate().save(dict);
		return dict;
	}

	public int deleteDict(Dict dict) {
		this.getHibernateTemplate().delete(dict);
		return 0;
	}

	public int updateDict(Dict dict) {
		this.getHibernateTemplate().update(dict);
		return 0;
	}

	public Dict getDict(Dict dict) {
		return this.getHibernateTemplate().get(Dict.class, dict.getDict_id());
	}

	public List<Dict> getListDict(Dict dict) {
		Example ex = Example.create(dict).enableLike().excludeZeroes()
				.ignoreCase();
		return this.getHibernateTemplate().findByExample(ex);
	}

	public List<Dict> getChildrenDictionary(Dict dict) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Dict> getDictionaryAll(Dict dict) {
		// TODO Auto-generated method stub
		return null;
	}

	public int deleteDictionaryItemByDictionary(Dict dict) {
		this.getHibernateTemplate().bulkUpdate(
				"delete from Dict_item where dict_code=?", dict.getDict_code());
		return 0;
	}

	/*
	 * (non-Javadoc) 分页查询
	 * 
	 * @see
	 * com.aisino2.sysadmin.dao.IDictDao#getListForPage(com.aisino2.sysadmin
	 * .domain.Dict, java.util.Map, int, int, java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public Pager getListForPage(final Dict dict,
			Map<String, Object> extraParams, final int pageNo,
			final int pageSize, String sort, String desc) {
		return (Pager) this.getHibernateTemplate().execute(
				new HibernateCallback<Pager>() {

					public Pager doInHibernate(Session session)
							throws HibernateException, SQLException {
						Pager pager = new Pager();
						pager.setPageNo(pageNo);
						pager.setPageSize(pageSize);
						
						Criteria q = session.createCriteria(Dict.class, "t");
						// condition
						Example ex = Example.create(dict).enableLike(MatchMode.START)
								.ignoreCase().excludeZeroes();
						q.add(ex);
						if(Util.isNotEmpty(dict.getDict_code()))
							q.add(Restrictions.eq("dict_code", dict.getDict_code()));
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

	@Override
	public void top(Dict dict) {
		String hql = "update Dict t set t.sib_order=t.sib_order+1 where t.dict_code=? and t.sib_order<?";
		String minHql = "update Dict t set t.sib_order=min(nvl(t.sib_order,0))  where t.dict_code=? ";

		// 移动所有比自己靠前
		this.getHibernateTemplate().bulkUpdate(hql, dict.getDict_code(),
				dict.getSib_order());
		// 移动到最前端
		this.getHibernateTemplate().bulkUpdate(minHql, dict.getDict_code());
	}

	@Override
	public void bottom(Dict dict) {
		String hql="update Dict t set t.sib_order=t.sib_order-1 where t.dict_code=? and t.sib_order>?";
		String maxHql="update Dict t set t.sib_order=max(nvl(t.sib_order,0)) where t.dict_code=?";
		// 移动所有比自己靠后的
		this.getHibernateTemplate().bulkUpdate(hql,dict.getDict_code(),dict.getSib_order());
		// 移动到最前
		this.getHibernateTemplate().bulkUpdate(maxHql,dict.getDict_code());
	}

}
