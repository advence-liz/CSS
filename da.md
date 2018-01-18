# for ....

```js
HotkeysManager //挂在window 下cp.common.js 里面



 $$.HotKey = HotKey;//H K 都大写
 /**
 * 
 * @param {String} flag 
 * @param {String} scope 
 * @param {String} next 
 * @param {Bool} bubble 
 */
 function HotKey(flag, scope, next, bubble) {
        this.flag = flag;
        this.scope = scope;
        this.next = next;
        this.bubble = bubble;
    }

//for tab

  var hotkey = new $$.HotKey('flag','scope','next');
        window.tabList = $$.Nav._init([
            { title: 'tab1', href: '#tab1' ,hotkey:hotkey},
            { title: 'tab2', href: '#tab2' ,hotkey:hotkey},
            { title: 'tab3', href: '#tab3' ,hotkey:hotkey},
            { title: 'tab4', href: '#tab4' }
        ]);

// R.Button
//加了一个 hotkey 属性  h k 都小写
// <R.RButton btnType="option" iconCss="plan-icon" text="Domain Mappings" description="This is a tooltip." hotkey ={new new $$.HotKey('flag','scope','next')} />
 render() {
        let className = '';
        if (this.props.btnType != "option") {
            className = "aui-ribbon-btn";
            className += this.props.btnSize == "large" ? " aui-ribbon-btn-lg" : " aui-ribbon-btn-xs";
            className += this.props.btnType == "splitbutton" ? " aui-ribbon-select" : "";
        }
        const hotkey = this.props.hotkey || {};
        const { flag, scope, next, bubble } = hotkey;

        return <a ref={(ref) => { this.btn = ref; }} data-flag={flag} data-next={next} data-scope={scope} data-bubble={bubble} className={className} href="javascript:void(0)"></a>;
    }        

```    