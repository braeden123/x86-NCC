function lpPutUserPref(a,b){"undefined"==typeof g_userprefs&&(g_userprefs=getBG().g_userprefs);if("undefined"==typeof g_userprefs[a]||g_userprefs[a]!=b)g_userprefs_changed[a]=!0;g_userprefs[a]=b}function lpPutGblPref(a,b){"undefined"==typeof g_gblprefs&&(g_gblprefs=getBG().g_gblprefs);if("undefined"==typeof g_gblprefs[a]||g_gblprefs[a]!=b)g_gblprefs_changed[a]=!0;g_gblprefs[a]=b}
function lpGetPref(a,b){"undefined"==typeof g_userprefs&&(g_userprefs=getBG().g_userprefs);if("undefined"!=typeof g_userprefs&&"undefined"!=typeof g_userprefs[a])return g_userprefs[a];"undefined"==typeof g_gblprefs&&(g_gblprefs=getBG().g_gblprefs);return"undefined"!=typeof g_gblprefs&&"undefined"!=typeof g_gblprefs[a]?g_gblprefs[a]:b}
function dodefault(){var a=get_innertext(document.getElementById("default"));if(0<=a.indexOf("General"))document.getElementById("logoffWhenCloseBrowserVal").value=0,document.getElementById("logoffWhenCloseBrowser").checked=!1,document.getElementById("idleLogoffVal").value="",document.getElementById("idleLogoffEnabled").checked=!1,document.getElementById("openpref").value="tabs",document.getElementById("highlightFields").checked=!0,document.getElementById("automaticallyFill").checked=!0,document.getElementById("showvault").checked=
!1,document.getElementById("showAcctsInGroups").checked=!0,document.getElementById("hideContextMenus").checked=!1,document.getElementById("defaultffid").value=0,document.getElementById("donotoverwritefilledfields").checked=!1;else if(0<=a.indexOf("Notifications"))document.getElementById("showNotifications").checked=!0,document.getElementById("showGenerateNotifications").checked=!1,document.getElementById("showFormFillNotifications").checked=!1,document.getElementById("showNotificationsAfterClick").checked=
!1,document.getElementById("showFillNotificationBar").checked=!1,document.getElementById("showSaveNotificationBar").checked=!0,document.getElementById("showSaveSiteNotifications").checked=!1,document.getElementById("notificationsBottom").checked=!1,document.getElementById("showChangeNotificationBar").checked=!0,document.getElementById("showmatchingbadge").checked=!0,document.getElementById("usepopupfill").checked=!0;else if(0<=a.indexOf("Hotkeys")){getBG().g_is_mac?(optionsData.HotKeys.generateHkKeyCode=
0,optionsData.HotKeys.generateHkMods="",optionsData.HotKeys.recheckHkKeyCode=0,optionsData.HotKeys.recheckHkMods="",optionsData.HotKeys.searchHkKeyCode=0,optionsData.HotKeys.searchHkMods="",optionsData.HotKeys.nextHkKeyCode=33,optionsData.HotKeys.nextHkMods="meta",optionsData.HotKeys.prevHkKeyCode=34,optionsData.HotKeys.prevHkMods="meta",optionsData.HotKeys.homeHkKeyCode=0,optionsData.HotKeys.homeHkMods="",optionsData.HotKeys.openpopoverHkKeyCode=220,optionsData.HotKeys.openpopoverHkMods="meta"):
(optionsData.HotKeys.generateHkKeyCode=71,optionsData.HotKeys.generateHkMods="alt",optionsData.HotKeys.recheckHkKeyCode=73,optionsData.HotKeys.recheckHkMods="alt",optionsData.HotKeys.searchHkKeyCode=87,optionsData.HotKeys.searchHkMods="alt",optionsData.HotKeys.nextHkKeyCode=33,optionsData.HotKeys.nextHkMods="alt",optionsData.HotKeys.prevHkKeyCode=34,optionsData.HotKeys.prevHkMods="alt",optionsData.HotKeys.homeHkKeyCode=72,optionsData.HotKeys.homeHkMods="control alt",optionsData.HotKeys.openpopoverHkKeyCode=
220,optionsData.HotKeys.openpopoverHkMods="alt");optionsData.HotKeys.submitHkKeyCode=0;optionsData.HotKeys.submitHkMods="";optionsData.HotKeys.saveallHkKeyCode=0;optionsData.HotKeys.saveallHkMods="";optionsData.HotKeys.logoffHkKeyCode=0;optionsData.HotKeys.logoffHkMods="";optionsData.HotKeys.defaultffidHkKeyCode=0;optionsData.HotKeys.defaultffidHkMods="";for(var a="generateHk recheckHk searchHk nextHk prevHk homeHk submitHk saveallHk logoffHk defaultffidHk openpopoverHk".split(" "),b=0;b<a.length;b++)writeHotKeyValue(a[b])}else 0<=
a.indexOf("Advanced")?(document.getElementById("autoautoEnabled").checked=!0,document.getElementById("autoautoVal").value="25",document.getElementById("warninsecureforms").checked=!1,document.getElementById("dontfillautocompleteoff").checked=!1,document.getElementById("pollServerEnabled").checked=!1,document.getElementById("pollServerVal").value="15",document.getElementById("recentUsed").checked=!0,document.getElementById("recentUsedCount").value="10",document.getElementById("searchNotes").checked=
!0,document.getElementById("openloginstart").checked=!1,document.getElementById("storeLostOTP").checked=!0,document.getElementById("enablenewlogin").checked=!0,document.getElementById("clearfilledfieldsonlogoff").checked=!1,document.getElementById("toplevelmatchingsites").checked=!1,document.getElementById("htmlindialog").checked=!1):0<=a.indexOf("Icons")&&(document.getElementById("icons1").checked=!0)}
function lpReadAllPrefs(a){var b=g_username_hash&&""!=g_username_hash?g_username_hash:"";g_userprefs=[];g_identity="";var d=opendb();createPrefsTable(d);if(d){var c=function(c,b){g_gblprefs=[];for(var d=0;d<b.rows.length;d++){var e=b.rows.item(d).username_hash,h=b.rows.item(d).prefname,k=b.rows.item(d).prefvalue;""!=e?"language"!=h&&(g_userprefs[h]=k,"identity"==h&&(g_identity=k)):g_gblprefs[h]=k}if(g_issafari||g_isopera||g_ismaxthon||g_isfirefoxsdk)d=lpGetPref("language",""),include_language(d);
start_idle_checker();"undefined"==typeof g_gblprefs.generateHkKeyCode&&setup_default_hotkeys();setup_hotkeys();if("undefined"!=typeof g_gblprefs.server&&(d=g_gblprefs.server,""!=d&&("lastpass.com"==d||"lastpass.eu"==d)))(0==base_url.indexOf("https://rodan.lastpass.com")||0==base_url.indexOf("https://dev.lastpass.com"))&&"lastpass.com"==d||(base_url="https://"+d+"/");g_prefs_read=!0;console_log("read: "+b.rows.length+" preferences");a&&a(b.rows.length)};if(g_indexeddb){var e={rows:{item:function(a){return this[a]},
length:0}},h=d.transaction("LastPassPreferences","readonly").objectStore("LastPassPreferences").index("username_hash");h.openCursor(IDBKeyRange.only(b)).onsuccess=function(a){(a=a.target.result)?(e.rows[e.rows.length]=a.value,e.rows.length++,a["continue"]()):""!=b?h.openCursor(IDBKeyRange.only("")).onsuccess=function(a){(a=a.target.result)?(e.rows[e.rows.length]=a.value,e.rows.length++,a["continue"]()):c(null,e)}:c(null,e)}}else d.transaction(function(a){a.executeSql("SELECT * FROM LastPassPreferences where username_hash=? or username_hash=?",
[b,""],c,function(a,c){console_log(c)})})}else a&&a()}
function setup_default_hotkeys(){g_is_mac?(lpPutGblPref("generateHkKeyCode",0),lpPutGblPref("generateHkMods",""),lpPutGblPref("recheckHkKeyCode",0),lpPutGblPref("recheckHkMods",""),lpPutGblPref("searchHkKeyCode",0),lpPutGblPref("searchHkMods",""),lpPutGblPref("nextHkKeyCode",33),lpPutGblPref("nextHkMods","meta"),lpPutGblPref("prevHkKeyCode",34),lpPutGblPref("prevHkMods","meta"),lpPutGblPref("homeHkKeyCode",0),lpPutGblPref("homeHkMods",""),lpPutGblPref("openpopoverHkKeyCode",220),lpPutGblPref("openpopoverHkMods",
"meta")):(lpPutGblPref("generateHkKeyCode",71),lpPutGblPref("generateHkMods","alt"),lpPutGblPref("recheckHkKeyCode",73),lpPutGblPref("recheckHkMods","alt"),lpPutGblPref("searchHkKeyCode",87),lpPutGblPref("searchHkMods","alt"),lpPutGblPref("nextHkKeyCode",33),lpPutGblPref("nextHkMods","alt"),lpPutGblPref("prevHkKeyCode",34),lpPutGblPref("prevHkMods","alt"),lpPutGblPref("homeHkKeyCode",72),lpPutGblPref("homeHkMods","control alt"),lpPutGblPref("openpopoverHkKeyCode",220),lpPutGblPref("openpopoverHkMods",
"alt"));lpPutGblPref("submitHkKeyCode",0);lpPutGblPref("submitHkMods","");lpPutGblPref("saveallHkKeyCode",0);lpPutGblPref("saveallHkMods","");lpPutGblPref("logoffHkKeyCode",0);lpPutGblPref("logoffHkMods","");lpPutGblPref("defaultffidHkKeyCode",0);lpPutGblPref("defaultffidHkMods","");lpWriteAllPrefs()}
function lpWriteAllPrefs(){var a=g_isfirefoxsdk,b=opendb();createPrefsTable(b);if(b)if(g_indexeddb){b=b.transaction("LastPassPreferences","readwrite").objectStore("LastPassPreferences");if(null!=g_username_hash&&""!=g_username_hash)for(var d in g_userprefs_changed)b.put({username_hash:g_username_hash,prefname:d,prefvalue:g_userprefs[d],userkey:g_username_hash+"_"+d});g_userprefs_changed=[];for(d in g_gblprefs_changed)b.put({username_hash:"",prefname:d,prefvalue:g_gblprefs[d],userkey:"_"+d});g_gblprefs_changed=
[]}else b.transaction(function(c){var b="",d="",f=[],j=0;a&&(b="REPLACE INTO LastPassPreferences (username_hash, prefname, prefvalue) VALUES ");if(null!=g_username_hash&&""!=g_username_hash)for(var g in g_userprefs_changed)a?(b+=d+"(?, ?, ?)",d=", ",f.push(g_username_hash),f.push(g),f.push(g_userprefs[g]),j++):c.executeSql("REPLACE INTO LastPassPreferences (username_hash, prefname, prefvalue) VALUES (?, ?, ?)",[g_username_hash,g,g_userprefs[g]],function(){},function(a,b){console_log(b)});g_userprefs_changed=
[];for(g in g_gblprefs_changed)a?(b+=d+"(?, ?, ?)",d=", ",f.push(""),f.push(g),f.push(g_gblprefs[g]),j++):c.executeSql("REPLACE INTO LastPassPreferences (username_hash, prefname, prefvalue) VALUES (?, ?, ?)",["",g,g_gblprefs[g]],function(){},function(a,b){console_log(b)});g_gblprefs_changed=[];a&&0<j&&c.executeSql(b,f,function(){},function(a,b){console_log(b)})})}optionsData=[];optionsData.HotKeys=[];
function capturehk(a,b){var d;d=""+(b.ctrlKey?"control":"");d+=b.metaKey?(""!=d?" ":"")+"meta":"";d+=b.altKey?(""!=d?" ":"")+"alt":"";d+=b.shiftKey?(""!=d?" ":"")+"shift":"";if(""==d||"shift"==d)d=getBG().g_is_mac?"meta":"alt";if(8==b.keyCode||127==b.keyCode||46==b.keyCode)optionsData.HotKeys[a+"KeyCode"]=0;else{if(32>=b.keyCode||91==b.keyCode)return;optionsData.HotKeys[a+"KeyCode"]=0!=b.keyCode?b.keyCode:b.charCode}optionsData.HotKeys[a+"Mods"]=d;writeHotKeyValue(a)}
function writeHotKeyValue(a){var b=optionsData.HotKeys[a+"KeyCode"],d=document.getElementById(a),c="";if(0!=b){a=optionsData.HotKeys[a+"Mods"];"string"!=typeof a&&(a="");a=a.split(" ");for(var e in a)"control"==a[e]&&(c+=gs("Ctrl")+"+"),"meta"==a[e]&&(c+=gs("Meta")+"+"),"alt"==a[e]&&(c+=gs("Alt")+"+"),"shift"==a[e]&&(c+=gs("Shift")+"+")}if(0!=b){b=parseInt(b);switch(b){case 33:c+=gs("Page Up");break;case 34:c+=gs("Page Down");break;case 35:c+=gs("End");break;case 36:c+=gs("Home");break;case 37:c+=
gs("Left");break;case 38:c+=gs("Up");break;case 39:c+=gs("Right");break;case 40:c+=gs("Down");break;case 189:c+="-";break;case 219:c+="[";break;case 220:c+="\\";break;case 221:c+="]";break;case 186:c+=";";break;case 222:c+="'";break;case 188:c+=",";break;case 187:c+="+";break;case 190:c+=".";break;case 191:c+="/";break;case 106:c+="*";break;case 192:c+="~";break;case 124:c+=gs("Print Screen");break;default:c+=String.fromCharCode(b).toUpperCase()}d.value=c}else d.value=""}
function fixhk(a,b){32>optionsData.HotKeys[a+"KeyCode"]&&(optionsData.HotKeys[a+"Mods"]="",writeHotKeyValue(a));b.cancelBubble=!0;b.stopPropagation()}var last_idle_check=0,idle_checker_started=!1;
function start_idle_checker(){if(0==last_idle_check&&!idle_checker_started){var a=parseInt(lpGetPref("idleLogoffVal",0));lpdbg("idle","starting idle checker, idleLogoffVal is "+lpGetPref("idleLogoffVal",0));0<a&&(last_idle_check=lp_get_gmt_timestamp(),idle_checker_started=!0,setTimeout(function(){idle_checker()},1E4))}}var last_active_time=0,enable_native_idle=!0;
function idle_checker(){var a=parseInt(lpGetPref("idleLogoffVal",0));lpdbg("idle","checking idle, idleLogoffVal is "+lpGetPref("idleLogoffVal",0));if(0<a){var b=60*a,d=function(c){var d=!1,f=lp_get_gmt_timestamp();"active"==c?last_active_time=lp_get_gmt_timestamp():"locked"==c?d=b<f-last_active_time:"idle"==c&&(d=!0);var j=!0;if(0!=last_idle_check&&0!=b&&(d||b<f-last_idle_check))console_log("IDLE CHECKER ISSUING LOGOFF: idleLogoffVal="+a+" isidle="+d+" limit="+b+" currtime="+f+" last_idle_check="+
last_idle_check+" state="+c+" last_active_time="+last_active_time),lplogoff_if(),j=!1;j&&(last_idle_check=f)},c=function(a){a?call_binary_function("get_idle_ms",function(a){a=parseInt(a/1E3);d(b<a?"idle":"active")}):enable_native_idle&&("undefined"!=typeof chrome&&"undefined"!=typeof chrome.idle)&&chrome.idle.queryState(b,d)};have_binary_function("get_idle_ms")?can_check_idle(c):c(!1)}setTimeout(function(){idle_checker()},1E4)}var g_can_check_idle=-1;
function can_check_idle(a){-1!=g_can_check_idle?a(g_can_check_idle?!0:!1):!g_is_linux||!have_binary_function("can_check_idle")?(g_can_check_idle=1,a(!0)):call_binary_function("can_check_idle",function(b){g_can_check_idle=b?1:0;a(g_can_check_idle?!0:!1)})};