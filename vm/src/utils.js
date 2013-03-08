/**
 * @fileOverview Utility functions.
 * @author <a href="mailto:paul.cuthbertson@gamesys.co.uk">Paul Cuthbertson</a>
 * @copyright Gamesys Limited 2013
 */

var luajs = luajs || {};


// TODO: Remove this!
luajs.debug = {};



luajs.utils = {
	
	toObject: function (table) {
		var isArr = luajs.lib.table.getn (table) > 0,
			result = isArr? [] : {},
			i;
		
		for (i in table) {
			if (table.hasOwnProperty (i) && !(i in luajs.Table.prototype) && i !== '__luajs') {
					result[isArr? i - 1 : i] = ((table[i] || {}) instanceof luajs.Table)? luajs.utils.toObject (table[i]) : table[i];
			}
		}
		
		return result;
	},
	
	
	
	
	parseJSON: function (json) {

		var convertToTable = function (obj) {
			for (var i in obj) {

				if (typeof obj[i] === 'object') {
					obj[i] = convertToTable (obj[i]);
					
				} else if (obj[i] === null) {
					obj[i] = undefined;
				}				
			}
			
			return new luajs.Table (obj);
		};

		return convertToTable (JSON.parse (json));
	},
	
	


	toFloat: function (x) {
		var FLOATING_POINT_PATTERN = /^[-+]?[0-9]*\.?([0-9]+([eE][-+]?[0-9]+)?)?$/;
		if (!('' + x).match (FLOATING_POINT_PATTERN)) return;
		return parseFloat (x);
	}
	

};

