/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

    "use strict";
    
    
    var _HotkeysManager = __webpack_require__(1);
    
    var _HotkeysManager2 = _interopRequireDefault(_HotkeysManager);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var hotkeysManager = new _HotkeysManager2.default('globalRoot');
    var print = $("#print");
    $(document).on("click", '[data-flag]', function (e) {
        print.text(e.currentTarget.outerHTML + "clickd!");
    });
    hotkeysManager.showGlobal(true);
    hotkeysManager.setRootScope("ScopeA");
    
    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * @class HotkeysManager
     * @param {String} scope 初始化 HotKeysManager 设置 RootScope
     * @desc
     */
    function HotkeysManager(scope) {
        var hotkeyMode = false,
            showGlobal = false;
        this.hotkeys_arr = [];
        this.globalScope = scope;
        this.rootScope = scope;
        this.scope = scope;
        this.$globalFlags = new $(), this.globalFlagMap = new Map(), this.$flags = new $();
        this.flagMap = new Map();
        this.document = $(document);
        this.setScope = function (scope) {
    
            if (this.hotkeyMode()) {
                this.scope = scope;
                this.refreshScope();
                this.flagMap = this.convertFlags2Map(this.$flags);
    
                return true;
            } else {
                return false;
            }
        };
        //convert Array to Map
        this.convertFlags2Map = function ($flags) {
            var flagMap = new Map();
            $flags.toArray().map(function (element) {
                var flag = element.dataset.flag.toUpperCase();
                flagMap.set(flag, element);
            });
            return flagMap;
        };
        this.refreshScope = function () {
            //取消上一次DOM
            this.$flags.toggleClass('active', false);
            //每次都重新获取DOM 元素，因为DOM元素可能动态渲染
            this.$flags = $('[data-scope=' + this.scope + ']').toggleClass('active', true);
            if (!this.$flags.length) {
                throw 'makesure ' + this.scope + ' really exist';
            }
        };
        this.setRootScope = function (scope) {
            this.rootScope = scope;
        };
        /**
         * hotkeyMode 读写器
         * @param {Bool} state  读写器
         * @return {Bool} hotKeyMode 
         */
        this.hotkeyMode = function (state) {
            if (state !== undefined) {
                hotkeyMode = state;
            } else {
                return hotkeyMode;
            }
        };
        this.showGlobal = function (state) {
            if (state !== undefined) {
                showGlobal = state;
            } else {
                return showGlobal;
            }
        };
        this._initEvent = function () {
    
            this.document.on('keydown', keydown.bind(this)).on('keyup', keyup.bind(this)).on('click', clickDocment.bind(this)).on("click", '[data-flag]', clickFlag.bind(this));
            /**
             * 开启hotkeyMode，或者记录按下的快捷键
             * @param {*} e event
             */
            function keydown(e) {
                if (this.hotkeyMode()) {
                    this.hotkeys_arr.indexOf(e.key) > -1 ? null : this.hotkeys_arr.push(e.key);
                }
                //开启hotkeyMode 经测试感觉keydown的时候开学hotkeyMode 比较好
                else if (e.keyCode === 90 && e.altKey && e.ctrlKey) {
                        this.hotkeyMode(true);
                        this.showGlobal() && this.$globalFlags.toggleClass('active', true);
                        this.setScope(this.rootScope);
                    }
            }
            /**
             * 判断键入的组合键是否匹配预先设置的组合键，如果满足则触发对应元素的 click 事件
             * @param {*} e Event
             * @return {Bool} 阻止事件冒泡 阻止document click 触发
             */
            function keyup(e) {
    
                if (this.hotkeyMode()) {
                    var keyCombination = this.hotkeys_arr.join('').toUpperCase();
                    try {
    
                        if (this.hotkeyMode()) {
                            var cur_element;
                            cur_element = this.flagMap.get(keyCombination) || this.globalFlagMap.get(keyCombination);
                            $(cur_element).hasClass("active")&& cur_element.click();
                        }
                    } catch (error) {
                        //  console.error(error);
                    } finally {
                        this.hotkeys_arr.length = 0;
                    }
                }
                return false;
            }
            //当点击页面任何位置移除$flags激活状态
            function clickDocment(e) {
                this.$flags.toggleClass('active', false);
                this.$globalFlags.toggleClass('active', false);
                this.hotkeyMode(false);
            }
            /**
             * data-flag 元素click触发如果不阻止事件冒泡，那么 docment的click 就会触发hotMode就会变为false
             * 所以只能让大家在自己事件上阻止冒泡，我要是直接阻止冒泡我担心这个元素并不是触发事件的元素
             * 根据属性配置是否阻止事件冒泡
             * @param {*} e Event
             * @return {Bool} 是否阻止事件冒泡
             */
            function clickFlag(e) {
                if (this.hotkeyMode() && e.target.dataset.next) {
                    this.setScope(e.target.dataset.next);
                } else {
                    this.$flags.toggleClass('active', false);
                    this.hotkeyMode(false);
                }
                this.$globalFlags.toggleClass('active', false);
                return e.target.dataset.bubble === "true" ? true : false;
            }
        };
        this._init = function () {
    
            this._initEvent();
            this._initEvent = null;
            this.$globalFlags = $('[data-scope=' + scope + ']');
            this.globalFlagMap = this.convertFlags2Map(this.$globalFlags);
        };
        this._init();
    }
    
    exports.default = HotkeysManager;
    //TODO
    //1 flag 大小写
    //2 add globaRootMap
    /**
     * 1 ctrl+alt+z when keyup 展示当前 RootScope
     * 2 键盘输入一个Key 触发对应DOM 元素的click事件 根据next 切换到对应的ChildScope
     */
    
    /***/ })
    /******/ ]);
    //# sourceMappingURL=index.js.map