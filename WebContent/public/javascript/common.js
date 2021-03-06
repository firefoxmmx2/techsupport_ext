/*
 * filename: common.js 一些共有的JS组件或者属性
 * 
 */

/** 文档区域高度 */
document_height = Ext.getDoc().getHeight();
/**
 * 通过结构化的JSON对象返回，FORM提交用的对象
 */
function buildSubmitParam(subpa, para, prefix) {

	for (key in para) {
		if (para[key] && typeof para[key] == "object") {
			if (prefix)
				prefix = prefix + key + '.';
			else
				prefix = key + '.';
			subpa = buildSubmitParam(subpa, para[key], prefix);
			prefix = null;
		} else {
			if (prefix == null) {
				if (para[key])
					subpa[key] = para[key];
			}

			else {
				if (para[key])
					subpa[prefix + key] = para[key];
			}

		}
	}
	return subpa;
}

/**
 * 扩充EXT，通用提交方法
 * 
 */
Ext.Ajax.simpleSubmit = function(config) {
	var para = {};
	if (config.actionPrefix) {
		if (/\[[A-z]*\]/.exec(config.actionPrefix)) {
			var tmpPara = {};
			for (var i = 0; i < config.para.length; i++) {
				var prefix = config.actionPrefix;
				prefix = prefix.replace(/\[[A-z]*\]/, "[" + i + "]");
				tmpPara[prefix] = config.para[i];
			}
			para = buildSubmitParam({}, tmpPara);
		} else

			para = buildSubmitParam({}, config.para, config.actionPrefix);
	}

	Ext.Ajax.request({
				url : config.url,
				params : para,
				success : function(response, opt) {
					var data = Ext.decode(response.responseText);

					if (!data.returnNo) {

						// 执行回调
						if (config.successCallback) {
							config.successCallback(data);
						}

						Ext.example.msg('成功', data.returnMessage);
					} else {
						// 执行错误回调
						if (config.successFailCallback) {
							config.successFailCallback(data);
						}
						Ext.example.msg('错误', data.returnMessage);
						if (data.returnMessageDebug)
							Ext.example.msg('错误', data.returnMessageDebug);
					}

				},
				failure : function(response, opt) {
					Ext.example.msg('未成功错误', response.responseText);
				}
			});
};
/**
 * 中文翻页条封装
 */
Ext.ux.AsinoPagingToolBar = Ext.AsinoPagingToolBar = Ext.extend(
		Ext.PagingToolbar, {
			constructor : function(config) {
				this.afterPageText = config.afterPageText || '共{0}页';
				this.beforePageText = config.beforePageText || '当前页';
				this.lastText = config.lastText || "尾页";
				this.nextText = config.nextText || "下一页";
				this.prevText = config.prevText || "上一页";
				this.firstText = config.firstText || "首页";
				this.refreshText = config.refreshText || "刷新";
				this.emptyMsg = config.emptyMsg || '没有数据显示';
				this.displayMsg = config.displayMsg || '{0}-{1}条,总条数{2}';

				Ext.AsinoPagingToolBar.superclass.constructor.apply(this,
						arguments);

			}
		});
/**
 * 注册Ext.ux.AsinoPagingToolBar别名
 */
Ext.reg("aisinopagebar", Ext.ux.AsinoPagingToolBar);

/*******************************************************************************
 * 扩展验证方法类型
 */
Ext.apply(Ext.form.VTypes, {
			/**
			 * 数字验证
			 * 
			 * @param value
			 */
			"number" : function(value) {
				if (/^\d*$/.exec(value))
					return true;
				else
					return false;
			}
		});
/**
 * 重写BasicForm组件
 */
Ext.override(Ext.form.BasicForm, {
	getValues : function(asString) {
		function buildValues(values) {
			for (var key in values) {
				var keyArr = key.split(".");
				if (keyArr.length >= 2) {
					var parent = null;
					for (var i = 0; i < keyArr.length - 1; i++) {
						if (Ext.isEmpty(values[keyArr[i]])) {
							values[keyArr[i]] = {};
						}

						parent = values[keyArr[i]];

					}
					if (parent)
						parent[keyArr[keyArr.length - 1]] = values[key];
					delete values[key];
				}

			}

			return values;
		}
		var fs = Ext.lib.Ajax.serializeForm(this.el.dom);
		if (asString === true) {
			return fs;
		}
		fs = Ext.urlDecode(fs);
		if (Ext.isObject(fs)) {
			fs = buildValues(fs);
		}

		return fs;
	},
	setValues : function(values) {
		function buildValues(values) {
			for (var key in values) {
				if (Ext.isObject(values[key]) && !Ext.isFunction(values[key])) {
					var subvalues = buildValues(values[key]);
					for (var subkey in subvalues) {
						values[key + '.' + subkey] = subvalues[subkey];
					}
					delete values[key];
				}
			}
			return values;
		}
		if (Ext.isArray(values)) {
			for (var i = 0, len = values.length; i < len; i++) {
				var v = values[i];
				var f = this.findField(v.id);
				if (f) {
					f.setValue(v.value);
					if (this.trackResetOnLoad) {
						f.originalValue = f.getValue();
					}
				}
			}
		} else {
			values = buildValues(values);
			var field, id;
			for (id in values) {
				if (!Ext.isFunction(values[id]) && (field = this.findField(id))) {
					field.setValue(values[id]);
					if (this.trackResetOnLoad) {
						field.originalValue = field.getValue();
					}
				}
			}
		}
		return this;
	}
});

/**
 * 重写combo组件
 */
Ext.override(Ext.form.ComboBox, {
	setValue : function(v) {
		// 这个重写函数主要是为了AJAX加载的JSONSTROE的数据在使用setValue的时候也能够正确的设置.
		var text = v;
		// 代表自身
		var cb = this;
		if (this.valueField) {

			var record = null;
			// 当数据集里面有记录的时候
			if (this.store.getCount() > 0) {
				this.store.each(function(r) {
							if (r.data[cb.valueField] == v) {
								record = r;
								return false;
							}
						});
				if (record) {
					text = record.data[this.displayField];
				} else if (Ext.isDefined(this.valueNotFoundText)) {
					text = this.valueNotFoundText;
				}

				this.lastSelectionText = text;
				if (this.hiddenField) {
					this.hiddenField.value = Ext.value(v, '');
				}
				Ext.form.ComboBox.superclass.setValue.call(this, text);
				this.value = v;
				this.clearInvalid();
			} else {
				// 当处于加载中状态的时候,因为load回调不能在创建combo组件的时候绑定,所以只好重新加载一次,
				// 然后在这里设置回调,使他设置想要的结果.
				cb.store.load({
							callback : function() {
								cb.store.each(function(r) {
											if (r.data[cb.valueField] == v) {
												record = r;
												return false;
											}
										});

								if (record) {
									text = record.data[cb.displayField];
								} else if (Ext.isDefined(cb.valueNotFoundText)) {
									text = cb.valueNotFoundText;
								}

								cb.lastSelectionText = text;
								if (cb.hiddenField) {
									cb.hiddenField.value = Ext.value(v, '');
								}
								Ext.form.ComboBox.superclass.setValue.call(cb,
										text);
								cb.value = v;
								cb.clearInvalid();
							}
						});
			}

		}

		return this;
	}
});