/**
 * filename: dictManager.js description: 系统字典管理 fileEncoding: utf8
 */

Ext.ns("techsupport.systemmanage");

if (!techsupport.systemmanage.DictManager) {
	techsupport.systemmanage.DictManager = Ext.extend(Ext.Panel, {
				id : 'dictManager',
				title_base : "用户",
				layout : 'vbox',
				viewConfig : {
					forceFit : true
				},
				defaults : {
					bodyStyle : 'padding:4px;'
				},
				style : "height:100%",
				addURL : context_path + '/sysadminDefault/add_dict.action',
				modifyURL : context_path
						+ '/sysadminDefault/modify_dict.action',
				queryURL : context_path
						+ '/sysadminDefault/querylist_dict.action',
				detailURL : context_path + '/sysadminDefault/query_dict.action',
				removeURL : context_path
						+ '/sysadminDefault/remove_dict.action',
				actionPrefix : 'dict.',
				removePrefix : 'lDicts[i]',
				gridSelectionModel : new Ext.grid.CheckboxSelectionModel(),
				constructor : function(config) {
					this.width = config.width || "100%";
					this.height = config.height || "100%";
					this.renderTo = config.renderTo;
					this.pagesize = config.pagesize || 25;

					this.gridStore = new Ext.data.JsonStore({
								proxy : new Ext.data.HttpProxy({
											api : {
												read : this.queryURL,
												create : this.addURL,
												update : this.modifyURL,
												desctroy : this.removeURL
											}
										}),
								reader : new Ext.data.JsonReader({
											root : "lDicts",
											idProperty : 'dict_code',
											totalProperty : 'total',
											fields : [{
														name : 'dict_code',
														mapping : 'dict_code'
													}, {
														name : 'dict_name',
														mapping : 'dict_name'
													}, {
														name : 'super_dict_code',
														mapping : 'super_dict_code'
													}, {
														name : 'sib_order',
														mapping : 'sib_order'
													}, {
														name : 'leaf_flag',
														mapping : 'leaf_flag'
													}, {
														name : 'maint_flag',
														mapping : 'maint_flag'
													}, {
														name : 'dict_type',
														mapping : 'dict_type'
													}, {
														name : 'dict_type',
														mapping : 'dict_type'
													}, {
														name : 'dict_simplepin',
														mapping : 'dict_simplepin'
													}, {
														name : 'dict_allpin',
														mapping : 'dict_allpin'
													}, {
														name : 'dict_itemtablename',
														mapping : 'dict_itemtablename'
													}, {
														name : 'dict_versionid',
														mapping : 'dict_versionid'
													}, {
														name : 'dict_id',
														mapping : "dict_id"
													}]
										}),
								writer : new Ext.data.JsonWriter({
											encode : true
										}),
								baseParams : {
									start : 0,
									limit : this.pagesize
								}
							});
					techsupport.systemmanage.DictManager.superclass.constructor
							.apply(this, arguments);
				},
				initComponent : function(ct, position) {
					var dm = this;

					techsupport.systemmanage.DictManager.superclass.initComponent
							.apply(this, arguments);

					//
				}
			});
}