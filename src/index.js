import HotkeysManager from "./HotkeysManager";

var hotkeysManager = new HotkeysManager('globalRoot');
var print = $("#print");
$(document).on("click", '[data-flag]', function (e) {
    print.text(e.currentTarget.outerHTML + "clickd!");
});
hotkeysManager.showGlobal(true);
hotkeysManager.setRootScope("ScopeA");