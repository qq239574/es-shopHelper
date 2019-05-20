(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesIndex/pages/toper"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!I:/CurProject/ES_Mobile_Manager/MobileManager/pagesIndex/pages/toper.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;











var _getDateSection = __webpack_require__(/*! ../../components/my-components/getDateSection.js */ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\components\\my-components\\getDateSection.js");


var _formater = __webpack_require__(/*! ../../components/my-components/formater.js */ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\components\\my-components\\formater.js");var selectItem = function selectItem() {return __webpack_require__.e(/*! import() | components/my-components/editBlock-SelectItem */ "components/my-components/editBlock-SelectItem").then(__webpack_require__.bind(null, /*! ../../components/my-components/editBlock-SelectItem.vue */ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\components\\my-components\\editBlock-SelectItem.vue"));};var items = function items() {return __webpack_require__.e(/*! import() | pagesIndex/components/Toper-list */ "pagesIndex/components/Toper-list").then(__webpack_require__.bind(null, /*! ../components/Toper-list.vue */ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\components\\Toper-list.vue"));};


var searchSection = [];
var DataFrom = {}; //上级页面的数据
var DataGo = {}; //缓存下级页面的数据
var domain = '';var _default =
{
  components: {
    selectItem: selectItem,
    items: items },

  data: function data() {
    return {
      pageId: 'goods',
      pageLabel: '今天',
      list: [{
        img: '/static/img/global/product_share_download.png',
        label: '',
        value: '',
        index: '' }] };


  },
  onLoad: function onLoad(option) {
    DataFrom = this.Cacher.getData(option.from);
    uni.setNavigationBarTitle({
      title: DataFrom.show == 'vip' ? "TOP会员" : "TOP商品" });

  },
  onShow: function onShow() {
    domain = this.Cacher.getData('static_resources_domain');
    this.initPage();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.initPage();
  },
  methods: {
    clickItem: function clickItem(info) {
      if (DataFrom.show == 'vip') {
        this.Cacher.setData('toper', {
          from: 'toper',
          detail: {
            info: {
              id: info.id } } });



        uni.navigateTo({
          url: '../../pagesIndex/pages/vipDetail?from=toper' });

      } else {
        this.Cacher.setData('toper', {
          from: 'toper',
          item: {
            detail: {
              goodId: info.goods_id } } });



        uni.navigateTo({
          url: '../../pagesCommodity/pages/index?from=toper' });

      }
    },
    initPage: function initPage() {var _this = this; //初始化页面 
      var api = '';
      this.pageId = DataFrom.show;
      DataGo = this.Cacher.getData(DataGo.go);
      DataGo = DataGo.date ? DataGo : {
        from: 'filterDate',
        date: [(0, _getDateSection.getDate)(-1), (0, _getDateSection.getDate)(0), '今天'] };

      if (DataFrom.show == 'vip') {
        api = 'vipsTop10';
      } else {
        api = 'goodsTop10';
      }
      this.pageLabel = DataGo.date[2];
      this.pageLoading();
      this.Request(api, {
        type: 4, //	1:今天，2:昨天，3:7天，4:自定义
        start: DataGo.date[0], //	自定义开始时间
        end: DataGo.date[1] //	自定义结束时间
      }).then(function (res) {
        _this.closePageLoading();
        var arr = [];
        for (var k in res) {
          if (k !== 'error') {
            arr.push(res[k]);
          }
        }
        if (DataFrom.show == 'vip') {
          _this.list = arr.map(function (item) {return {
              img: item.avatar || 'https://ceshiuser.100cms.com/static/dist/shop/image/noface.png',
              label: item.nickname,
              value: item.pay_price,
              index: item.mobile,
              id: item.id,
              tiFixed: 2 //有效数字
            };});
        } else {
          _this.list = arr.map(function (item) {return {
              img: domain + item.thumb,
              label: item.title,
              value: item.pay_number_count,
              index: item.goods_id,
              goods_id: item.goods_id,
              tiFixed: 0 //有效数字
            };});
        }
      }).catch(function (res) {
        _this.closePageLoading();
        _this.Toast(res.message);
      });
    },
    filteDate: function filteDate() {
      DataGo.go = 'filterDate';
      this.Cacher.setData('toper', {
        from: 'toper' });

      uni.navigateTo({
        url: './filterDate?from=toper' });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue?vue&type=template&id=69028da4&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!I:/CurProject/ES_Mobile_Manager/MobileManager/pagesIndex/pages/toper.vue?vue&type=template&id=69028da4&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue":
/*!********************************************************************************!*\
  !*** I:/CurProject/ES_Mobile_Manager/MobileManager/pagesIndex/pages/toper.vue ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toper_vue_vue_type_template_id_69028da4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toper.vue?vue&type=template&id=69028da4&scoped=true& */ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue?vue&type=template&id=69028da4&scoped=true&");
/* harmony import */ var _toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toper.vue?vue&type=script&lang=js& */ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _toper_vue_vue_type_template_id_69028da4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _toper_vue_vue_type_template_id_69028da4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "69028da4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "I:/CurProject/ES_Mobile_Manager/MobileManager/pagesIndex/pages/toper.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** I:/CurProject/ES_Mobile_Manager/MobileManager/pagesIndex/pages/toper.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./toper.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue?vue&type=script&lang=js&");
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue?vue&type=template&id=69028da4&scoped=true&":
/*!***************************************************************************************************************************!*\
  !*** I:/CurProject/ES_Mobile_Manager/MobileManager/pagesIndex/pages/toper.vue?vue&type=template&id=69028da4&scoped=true& ***!
  \***************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_template_id_69028da4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./toper.vue?vue&type=template&id=69028da4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\pagesIndex\\pages\\toper.vue?vue&type=template&id=69028da4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_template_id_69028da4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_toper_vue_vue_type_template_id_69028da4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["I:\\CurProject\\ES_Mobile_Manager\\MobileManager\\main.js?{\"page\":\"pagesIndex%2Fpages%2Ftoper\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesIndex/pages/toper.js.map