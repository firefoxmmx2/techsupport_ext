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
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.common.Util;
import com.aisino2.sysadmin.dao.IMenuDao;
import com.aisino2.sysadmin.domain.Department;
import com.aisino2.sysadmin.domain.Menu;
import com.aisino2.sysadmin.domain.Pager;
import com.aisino2.sysadmin.domain.User;

@Component
public class MenuDaoImpl extends TechSupportBaseDaoImpl implements IMenuDao {

	public void insertMenu(Menu menu) {
		this.getHibernateTemplate().save(menu);
	}

	public void deleteMenu(Menu menu) {
		this.getHibernateTemplate().delete(menu);
	}

	public void updateMenu(Menu menu) {
		this.getHibernateTemplate().update(menu);
	}

	public Menu getMenu(Menu menu) {
		return (Menu) this.getHibernateTemplate().get(Menu.class,
				menu.getMenucode());
	}

	public Pager getListForPage(final Menu menu, final int pageNo, final int pageSize,
			String sort, String desc) {
		return this.getHibernateTemplate().execute(new HibernateCallback<Pager>() {
			public Pager doInHibernate(Session sess)
					throws HibernateException, SQLException {
				Pager pager = new Pager();
				pager.setPageNo(pageNo);
				pager.setPageSize(pageSize);
				
				Criteria q = sess.createCriteria(Menu.class,"t");
				q.setCacheable(true);
				//condition
				Example ex = Example.create(menu);
				ex.enableLike();
				ex.excludeZeroes();
				ex.ignoreCase();
				q.add(ex);
				//count
				q.setProjection(Projections.rowCount());
				pager.setTotalCount(((Long)q.uniqueResult()).intValue());
				//pager
				q.setFirstResult(pager.getStartRecord());
				q.setMaxResults(pager.getPageSize());
				//data
				q.setProjection(null);
				pager.setDatas(q.list());
				
				return pager;
			}
		});
	}

	public List<Menu> getListMenu(Menu menu) {

		return null;
	}

	public boolean checkMenu(Menu menu) {
		return false;
	}

	public List getOwnMenu(Menu menu) {
		return null;
	}

	@SuppressWarnings("unchecked")
	public Menu getParentMenu(Menu menu) {
		String hql = "select t from Menu t where t.menucode = ?";
		List<Menu> list = this.getHibernateTemplate().find(hql,
				new Object[] { menu.getParent().getMenucode() });
		if (list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	public List getAllChildren(Menu menu) {
		
		return null;
	}

	public List getAllMenu() {
		
		return null;
	}

	public List getMenuBySystem(Menu menu) {
		
		return null;
	}

	public boolean checkChild(Menu menu) {
		
		return false;
	}

	public Menu getNextNodeorder(Menu menu) {
		
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<Menu> getTheUserChildMenu(final Menu menu, final User user) {
		final List<Object> para_list = new ArrayList();
		para_list.add(user.getUserid());
		// if(menu.getMenucode() == null){
		// hql += " and t.parent is null";
		// }
		// else{
		// hql += " and t.parent = ?";
		// para_list.add(menu);
		// }
		// List lst = this.getHibernateTemplate().find(hql,
		// para_list.toArray());
		// return lst;

		

		return this.getHibernateTemplate().executeFind(
				new HibernateCallback<List<Menu>>() {

					public List<Menu> doInHibernate(Session session)
							throws HibernateException, SQLException {
						String hql = "select distinct t from Menu t , User_role ur, Role_menu rm "
							+ "where t.menucode = rm.menucode and ur.roleid = rm.roleid and ur.userid = ?";
						String sql = "select distinct t.* from t_menu t,t_user_role ur, t_role_menu rm"
								+ " where t.menucode = rm.menucode and ur.roleid = rm.roleid and ur.userid = ?";
						
						List<Object> para_list = new ArrayList();
						para_list.add(user.getUserid());
						
						if (menu.getMenucode() == null) {
							hql += " and t.parent is null";
						} else {
							hql += " and t.parent = ?";
							para_list.add(menu);
						}
						hql += " order by t.nodeorder asc";
						
						Query q = session.createQuery(hql);
//						q.addEntity(Menu.class);
						for (int i = 0; i < para_list.size(); i++)
							q.setParameter(i, para_list.get(i));

						return q.list();
					}
				});

	}

	public List<Menu> getChildMenu(Menu menu) {
		String hql = "select t from Menu t";
		if(Util.isNotEmpty(menu.getMenucode())){
			hql += " where t.parent = ?";
			return this.getHibernateTemplate().find(hql,
					new Object[] { menu.getMenucode() });
		}
		else{
			hql += " where t.parent is null";
			return this.getHibernateTemplate().find(hql,
					new Object[] { });
		}
	}

	public List<Menu> getRoleCheckedMenuList(Menu menu) {
		
		return null;
	}

	private Map<String, Object> get_para_and_hql(Menu para_entity,
			StringBuffer hql) {
		List<Object> para_list = new ArrayList<Object>();
		if (para_entity != null) {
			hql.append(" where 1=1");

			if (para_entity.getSystem() != null) {
				hql.append(" and t.system = ?");
				para_list.add(para_entity.getSystem());
			}

			if (para_entity.getMenuname() != null) {
				hql.append(" and t.menuname like ?");
				para_list.add(para_entity.getMenuname() + "%");
			}

			if (para_entity.getParent() != null) {
				hql.append(" and t.parent = ?");
				para_list.add(para_entity.getParent());
			}

		}

		Map<String, Object> para_map = new HashMap<String, Object>();
		para_map.put("hql", hql);
		para_map.put("para", para_list);
		return para_map;
	}
}
