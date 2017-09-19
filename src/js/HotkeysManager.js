/**
 * 
 */
function HotkeysManager(scope) {
    var keyMap, hotkeyMode = false;
    this.hotkeys_arr = [];
    this.rootScope = scope;
    this.scope = scope;
    this.$flagList = new $();
    this.flagList = [];
    this.document = $(document);
    this.setScope = function (scope) {
        // 考虑到有些元素可能动态产生，所以就不用缓存了每次都刷新数据源
        if (hotkeyMode) {
            this.$flagList.toggleClass('active', false);
            this.$flagList = $('[data-scope=' + scope + ']').toggleClass('active', true);
            this.flagList = this.$flagList.toArray().map(function (value) {
                var obj = $.extend({ element: value }, value.dataset);
                return compile.call(obj)(value);
            });
            this.flagList = $.extend.apply(null, this.flagList);
            this.scope = scope;
            return true;
        } else {
            return false;
        }


    };
    this.setRootScope = function (scope) {
        this.rootScope = scope;
    };
    /**
     * hotkeyMode 读写器
     */
    this.hotkeyMode = function (state) {
        if (state !== undefined) {
            hotkeyMode = state;
        } else {
            return hotkeyMode;
        }
    };
    this._initEvent = function () {

        this.document.on('keydown', keydown.bind(this))
            .on('keyup', keyup.bind(this))
            .on('click', clickDocment.bind(this))
            .on("click", '[data-flag]', clickFlag.bind(this));
        function keydown(e) {
            if (this.hotkeyMode()) {
                this.hotkeys_arr.indexOf(e.key) > -1 ?
                    null :
                    this.hotkeys_arr.push(e.key);
            }
            //开启hotkeyMode 经测试感觉keydown的时候开学hotkeyMode 比较好
            else if (e.keyCode === 90 && e.altKey && e.ctrlKey) {
                this.hotkeyMode(true);
                this.setScope(this.rootScope);
            }
        }
        function keyup(e) {

            if (this.hotkeyMode()) {
                var keyCombination = this.hotkeys_arr.join('').toUpperCase();
                try {
                    this.hotkeyMode() ?
                        this.flagList[keyCombination].element.click() :
                        null;
                } catch (error) {
                    this.hotkeys_arr.length = 0;
                }
                this.hotkeys_arr.length = 0;
            }
            //开启hotkeyMode
            // else if (e.keyCode === 90 && e.altKey && e.ctrlKey) {
                
            //     this.hotkeyMode(true);
            //     this.setScope(this.rootScope);
            // }
            //阻止document click 触发
            return false;
        }
        //当点击页面任何位置移除$flagList激活状态
        function clickDocment(e) {
            this.$flagList.toggleClass('active', false);
            this.hotkeyMode(false);
        }
        /**
         * data-flag 元素click触发如果不阻止事件冒泡，那么 docment的click 就会触发hotMode就会变为false
         * 所以只能让大家在自己事件上阻止冒泡，我要是直接阻止冒泡我担心这个元素并不是触发事件的元素
         * 根据属性配置是否阻止事件冒泡
         */
        function clickFlag(e) {
            if (this.hotkeyMode() && e.target.dataset.next) {
                this.setScope(e.target.dataset.next);
            } else {
                this.$flagList.toggleClass('active', false);
                this.hotkeyMode(false);
            }

            return e.target.dataset.bubble === "true" ? true : false;
        }
    };
    this._init = function () {
        keyMap = {
            A: 65, J: 74, S: 83, 1: 49,
            B: 66, K: 75, T: 84, 2: 50,
            C: 67, L: 76, U: 85, 3: 51,
            D: 68, M: 77, V: 86, 4: 52,
            E: 69, N: 78, W: 87, 5: 53,
            F: 70, O: 79, X: 88, 6: 54,
            G: 71, P: 80, Y: 89, 7: 55,
            H: 72, Q: 81, Z: 90, 8: 56,
            I: 73, R: 82, 0: 48, 9: 57
        };
        this._initEvent();
        this._initEvent = null;
    };
    this._init();
    /**
     * 为了构建出 key 值为 flag 的对象
     */
    function compile() {
        var arr = [];
        arr.push("var obj= {");
        arr.push(this.flag + ':');
        arr.push(JSON.stringify(this));
        arr.push("};");
        arr.push("obj." + this.flag + ".element=element;");
        arr.push("return obj;");
        return new Function('element', arr.join('\n'));
    }

}
var hotkeysManager = new HotkeysManager('ScopeA');

 $(document).on("click", '[data-flag]',function(e){
   console.log(e.target.dataset.flag);
 });

/**
 * 1 ctrl+alt+z when keyup 展示当前 RootScope
 * 2 键盘输入一个Key 触发对应DOM 元素的click事件 根据next 切换到对应的ChildScope
 */