'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _graceFullLoading = require('./graceUI/components/graceFullLoading.vue');

var _graceFullLoading2 = _interopRequireDefault(_graceFullLoading);

var _graceLoading = require('./graceUI/components/graceLoading.vue');

var _graceLoading2 = _interopRequireDefault(_graceLoading);

var _Mixins = require('./components/my-components/Mixins.vue');

var _Mixins2 = _interopRequireDefault(_Mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = false;
_vue2.default.component('pageLoading', _graceFullLoading2.default);
_vue2.default.component('loadMore', _graceLoading2.default); //底部加载
_vue2.default.mixin(_Mixins2.default);
_vue2.default.prototype.$store = _store2.default;

_App2.default.mpType = 'app';

var app = new _vue2.default(Object.assign({
	store: _store2.default
}, _App2.default));
app.$mount();
