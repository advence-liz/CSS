//import HotkeysManager from "./HotKeysManager";
import "./HotKeysManager";
//var hotkeysManager = new HotkeysManager('globalRoot');
var print = $("#print");
$(document).on("click", '[data-flag]', function (e) {
    print.text(e.currentTarget.outerHTML + "clickd!");
});
//HK.showGlobal(true);
HK.setRootScope("ScopeA");