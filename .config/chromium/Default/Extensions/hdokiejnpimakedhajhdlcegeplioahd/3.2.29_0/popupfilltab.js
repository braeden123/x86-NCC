var g_reference_url=null,g_rowtypes=null,g_rowtypes_initial=null,g_inputtype=null,g_switchedtabs=!1,g_lastinput=null,g_lastactive=null,g_lastchoose=null,g_lastinputid=null,g_lastmoreopen=null,g_lastshownavbar=null,g_initial_searchtext=null;if("undefined"==typeof verbose)var verbose=!1;
var g_MAXPWLENID="maxpwlen",g_ctr_dofilter=0,g_ctr_poll=0,g_ctr_pollresponse=0,g_icon_number_hint=!0,g_creditcard_profile_annotate=!0,g_nomatches_triggers_save=!0,g_selected_never_row=null,g_selected_more_row=null,g_more_submenu_aid=null,g_more_submenu_ffid=null,g_clickable_input_on_password=!0;document.addEventListener("DOMContentLoaded",function(){loadit()});var dotrans=!0;
function loadit(){document&&(document.location&&document.location.href)&&-1==document.location.href.indexOf("popupfilltab.html")||(g_ischrome?(L("IF -> BG : cmd=getpopupfilldata"),chrome_runtime_sendMessage({cmd:"getpopupfilldata"},function(a){L("BG -> IF : response to getpopupfilldata");if(null==a)"function"==typeof closePopups&&closePopups();else{translationInit(a.reg_obj);var b={};-1!==a[g_MAXPWLENID]&&(b[g_MAXPWLENID]=a[g_MAXPWLENID]);doInit(a.url,a.rowtype,a.ask_generate,a.popuphtml,a.can_copy_clipboard,
a.ask_save,a.lastpass_username,a.inputtype,a.has_view_pw_challenge,a.start_type,a.has_view_site_challenge,a.formfills,a.favicons,a.sites,a.site_pwlen,b,a.ftd)}})):"undefined"!=typeof safari?(safari.self.removeEventListener("message",handleMessage,!1),safari.self.addEventListener("message",handleMessage,!1),safari.self.tab?safari.self.tab.dispatchMessage("getpopupfilldata",{}):safari.extension.globalPage.contentWindow&&safari.extension.globalPage.contentWindow.message_handler({name:"getpopupfilldata",
message:{},target:window})):g_isfirefoxsdk&&(window.addEventListener("message",handleMessage,!1),window.parent.postMessage({messagetype:"getpopupfilldata"},"*")),g_pollid=setInterval(function(){getInputPoll()},100),notifybg_create_ack())}var KEY_UP=38,KEY_DOWN=40,KEY_ENTER=13,ELEMENT_NODE=1,KEY_ESCAPE=27;function LP_keypress_handler(a){var b=a.keyCode;b==KEY_ESCAPE?closePopups():b==KEY_TAB&&LP_stopEventPropagation(a);return!1}
function neverdomain_handler(){sendRequest({cmd:"neverdomain",url:g_reference_url,neverforall:1,frompopupiframe:1});closePopups()}function neverpage_handler(){sendRequest({cmd:"neverpage",url:g_reference_url,neverforall:1,frompopupiframe:1});closePopups()}function savesite_popupaction(){sendRequest({cmd:"savesiteicon"});closePopups()}function cr_autofill(a){sendRequest({cmd:"autofillaid",aid:a,from_iframe:!0,no_manualfill_on_saveall:!0,fromiframe:1});closePopups()}
function autologin(a){sendRequest({cmd:"autologinaid",aid:a,no_manualfill_on_saveall:!0,fromiframe:1});closePopups()}function cr_fillform(a){sendRequest({cmd:"fillformffid",ffid:a,fromiframe:1});closePopups()}function cr_copytoclipboard(a){sendRequest({cmd:"copytoclipboard",g_data:a})}function notifybg_create_ack(){sendRequest({cmd:"popupfillscreateack"})}
function sendRequest(a){if(null!=a)if(a.cmd&&"popupfillinputget"!=a.cmd&&"popupfilliconnumber"!=a.cmd&&L("IF -> BG : cmd="+a.cmd),g_ischrome)try{chrome_runtime_sendMessage(a,function(){})}catch(b){}else g_issafari?safari.self.tab?safari.self.tab.dispatchMessage(a.cmd,a):safari.extension&&(safari.extension.globalPage&&safari.extension.globalPage.contentWindow)&&safari.extension.globalPage.contentWindow.message_handler({name:a.cmd,message:a,target:window}):g_isfirefoxsdk&&(a.messagetype=a.cmd,window.parent.postMessage(a,
"*"))}
function handleMessage(a){g_isfirefoxsdk&&(a.message=a.data,a.name=a.data.messagetype);"message"==a.name&&"gotpopupfillinput"!=a.message.cmd&&L("BG -> IF : cmd="+a.message.cmd);if("gotpopupfilldata"==a.name||"gotpopupfilldata"==a.message.cmd)translationInit(a.message.reg_obj),doInit(a.message.url,a.message.rowtype,a.message.ask_generate,a.message.popuphtml,a.message.can_copy_clipboard,a.message.asksave,a.message.lastpass_username,a.message.inputtype,a.message.has_view_pw_challenge,a.message.start_type,a.message.has_view_site_challenge,
a.message.formfills,a.message.favicons,a.message.sites,a.message.site_pwlen,a.message.ftd);else if("gotpopupfillinput"==a.name||"gotpopupfillinput"==a.message.cmd)null==g_initial_searchtext&&(g_initial_searchtext=a.message.inputstr),g_ctr_pollresponse++,(g_switchedtabs||a.message.inputstr!=g_lastinput||g_lastactive!=a.message.active||a.message.inputid!=g_lastinputid||a.message.moreopen!=g_lastmoreopen||a.message.shownavbar!=g_lastshownavbar||a.message.choose!=g_lastchoose)&&dofilter(a.message.inputstr,
a.message.inputid,a.message.active,a.message.choose,a.message.moreopen,SEARCH_SITE_AND_USER,a.message.issaveall,a.message.inputtype,a.message.shownavbar),g_lastinput=a.message.inputstr,g_lastinputid=a.message.inputid,g_lastactive=a.message.active,g_lastchoose=a.message.choose,g_lastmoreopen=a.message.moreopen,g_lastshownavbar=a.message.shownavbar,g_switchedtabs=!1;else if("gotpopupfillgenerateprefs"==a.name||"gotpopupfillgenerateprefs"==a.message.cmd)null==a.message.prefstr||0>=a.message.prefstr.length?
verbose_log("unable to get prefs from BG"):handleGotGeneratePrefs(a.message.prefstr,a.message.genpwstr,a.message.genpwpattern);else if("gotpopupfillsave"==a.name||"gotpopupfillsave"==a.message.cmd)null!=a.message.formdata2?populateSave(a.message):null!=a.message.close?closePopups():(null!=a.message.prompting&&(g_pollSave_max_retry=600),pollSaveSafari());else if(("didpwchallenge"==a.name||"didpwchallenge"==a.message.cmd)&&null!=typeof a.message)master_challenge_response_handler(a.message.result,g_safari_master_challenge_success_callback_fn,
g_safari_master_challenge_failure_callback_fn),g_safari_master_challenge_failure_callback_fn=g_safari_master_challenge_success_callback_fn=null}function pollSaveSafari(){g_pollSaveSafari_ctr<g_pollSave_max_retry?(g_pollSaveSafari_ctr++,setTimeout(function(){sendRequest({cmd:"popupfillsaveget",url:g_reference_url})},g_pollSave_retry_timeout)):verbose_log("failed to get form information from CS")}var g_text_created_popup=!1;
function dofilter(a,b,c,h,m,n,r,d,p){function f(a){q&&verbose_log(a)}g_ctr_dofilter++;var q=!1;f("dofilter called with SEARCH string "+a);null==a&&(a="");if("savesite"==g_currenttab&&!r)d&&("text"==d||"email"==d||"tel"==d)?document.getElementById("u")&&g_did_populate_save&&(document.getElementById("u").value=a):d&&("password"==d&&g_did_populate_save)&&document.getElementById("p")&&(document.getElementById("p").value=a);else{var j=document.getElementsByTagName("td"),k=[];d=[];g_switchedtabs&&(g_selected_row=
-1,a="");if(0>g_selected_row&&0!=c)if(g_initial_searchtext!=a?(g_inputstr_initial_from_kbdnav="",f("F4")):g_text_created_popup?(g_inputstr_initial_from_kbdnav=a,a="",f("F1")):0!=c?(g_inputstr_initial_from_kbdnav=a,a="",f("F3")):f("F2"),"none"==document.getElementById("lptabpopupformfills").style.display)c=g_selected_row=0,f("F5");else{if("none"==document.getElementById("lptabpopup").style.display){c=g_selected_row=0;a="";for(b=0;b<j.length;b++)0==j[b].id.indexOf("tdpopuprow")&&g_selected_row++;ROW_START=
g_selected_row;f("F6")}}else 0>g_selected_row&&0==c?g_initial_searchtext!=a?(g_inputstr_initial_from_kbdnav="",f("F7")):(g_inputstr_initial_from_kbdnav=a,g_text_created_popup=!0,a="",f("F8")):g_inputstr_freeze?(a="",f("F9")):""!==g_inputstr_initial_from_kbdnav&&(f("F10"),a!==g_inputstr_initial_from_kbdnav?(g_inputstr_initial_from_kbdnav="",f("SEARCH TEXT CHANGED, FILTER initial")):(a="",f("F11")));f("SEARCH string is now "+a);for(var e=b=0;e<j.length;e++)if(j[e].id&&(0==j[e].id.indexOf("tdpopuprow")||
0==j[e].id.indexOf("tdpopupffrow"))){var l="tr"+j[e].id.substr(2),l=document.getElementById(l),t=l.getAttribute("sitename"),s=l.getAttribute("username"),u=l.getAttribute("profilename");null==t&&(t="");null==s&&(s="");null==u&&(u="");0>=a.length?"none"==document.getElementById("lptabpopupformfills").style.display&&0==j[e].id.indexOf("tdpopuprow")||"none"==document.getElementById("lptabpopup").style.display&&0==j[e].id.indexOf("tdpopupffrow")?(d.push(l),unhighlight_row(l),b++):k.push(l):!n&&0==get_innertext(j[e]).trim().toLowerCase().indexOf(a.toLowerCase())||
n&&0<=t.trim().toLowerCase().indexOf(a.toLowerCase())&&"none"==document.getElementById("lptabpopupformfills").style.display||n&&0<=s.trim().toLowerCase().indexOf(a.toLowerCase())&&"none"==document.getElementById("lptabpopupformfills").style.display||n&&0<=get_innertext(j[e]).trim().toLowerCase().indexOf(a.toLowerCase())&&"none"==document.getElementById("lptabpopup").style.display?"none"==document.getElementById("lptabpopupformfills").style.display&&0==j[e].id.indexOf("tdpopuprow")||"none"==document.getElementById("lptabpopup").style.display&&
0==j[e].id.indexOf("tdpopupffrow")?(highlight_row(l,a),d.push(l),b++):k.push(l):k.push(l)}for(var g in k)k[g].style.display="none",g_outline_hover?(a=k[g].children[0],a.className=a.className.replace(/ ?\bshowfocus\b/,"")):k[g].className=k[g].className.replace(/ ?\bshowfocus\b/,""),unhighlight_row(k[g]),g_visual_cue_on_hover&&(0==k[g].id.indexOf("trpopuprow")?(a="expand",a=k[g].id.replace("trpopuprow",a),a=document.getElementById(a),null!=a&&(a.style.display="none")):0==k[g].id.indexOf("trpopupffrow")&&
(a="expandff",a=k[g].id.replace("trpopupffrow",a),a=document.getElementById(a),null!=a&&(a.style.display="none")));for(g in d)d[g].style.display="",g_outline_hover?(a=d[g].children[0],a.className=a.className.replace(/ ?\bshowfocus\b/,"")):d[g].className=d[g].className.replace(/ ?\bshowfocus\b/,"");if(0<=g_selected_row){g_selected_row+=c;g_selected_row>=ROW_START+b?g_selected_row=ROW_START+b-1:g_selected_row<ROW_START&&(g_selected_row=ROW_START);c=ROW_START;for(e=0;e<d.length;e++)if(d[e].id&&"none"!=
d[e].style.display){if(g_selected_row==c){if(h)g=d[e],0==g.id.indexOf("trpopuprow")&&null!=g.getAttribute("aid")?autologin(g.getAttribute("aid")):g.click();else{if(m){g=d[e];g_currenttab="more";doTitleBar(document,g_currenttab);more_popupaction(document,g);return}p?togglenavbar(document):(g_outline_hover?(a=d[e].children[0],a.className+=" showfocus"):d[e].className+=" showfocus",d[e].scrollIntoView(!1),g_visual_cue_on_hover&&(0==d[e].id.indexOf("trpopuprow")?(a="expand",a=d[e].id.replace("trpopuprow",
a),a=document.getElementById(a),null!=a&&(a.style.display="")):0==d[e].id.indexOf("trpopupffrow")&&(a="expandff",a=d[e].id.replace("trpopupffrow",a),a=document.getElementById(a),null!=a&&(a.style.display=""))))}if(!g_visual_cue_on_hover)break}else g_visual_cue_on_hover&&(0==d[e].id.indexOf("trpopuprow")?(a="expand",a=d[e].id.replace("trpopuprow",a),a=document.getElementById(a),null!=a&&(a.style.display="none")):0==d[e].id.indexOf("trpopupffrow")&&(a="expandff",a=d[e].id.replace("trpopupffrow",a),
a=document.getElementById(a),null!=a&&(a.style.display="none")));c++}}g_icon_number_hint&&("sites"==g_currenttab?(h=document.getElementById("lptabpopupformfills"),(m=document.getElementById("lptabpopup"))&&(h&&"none"==h.style.display&&"none"==m.style.display)&&(b=0),sendRequest({cmd:"popupfilliconnumber",sitenumber:b,formfillsnumber:-1})):"formfill"==g_currenttab?sendRequest({cmd:"popupfilliconnumber",formfillsnumber:b,sitenumber:-1}):sendRequest({cmd:"popupfilliconnumber",sitenumber:-1,formfillsnumbers:-1}));
g_nomatches_triggers_save&&"sites"==g_currenttab&&("sites"==g_rowtypes&&0==b&&0<countInputRows(document).sites)&&(r||savesite_popupaction_iframe(document,null,null))}}
function getInputPoll(){g_ctr_poll++;g_ischrome?chrome_runtime_sendMessage({cmd:"popupfillinputget"},function(a){g_ctr_pollresponse++;null==a||null==a.inputstr||(null==g_initial_searchtext&&(g_initial_searchtext=a.inputstr),(g_switchedtabs||a.inputstr!=g_lastinput||g_lastactive!=a.active||g_lastmoreopen!=a.moreopen||g_lastshownavbar!=a.shownavbar||a.inputid!=g_lastinputid||a.choose!=g_lastchoose)&&dofilter(a.inputstr,a.inputid,a.active,a.choose,a.moreopen,SEARCH_SITE_AND_USER,a.issaveall,a.inputtype,
a.shownavbar),g_lastinput=a.inputstr,g_lastinputid=a.inputid,g_lastactive=a.active,g_lastchoose=a.choose,g_lastmoreopen=a.moreopen,g_lastshownavbar=a.shownavbar,g_switchedtabs=!1)}):(g_issafari||g_isfirefoxsdk)&&sendRequest({cmd:"popupfillinputget"});return!1}
function getWindowWidth(a){a=a.innerWidth;var b=document.getElementById("_lpinvis");null==b&&(b=document.createElement("div"),b.id="_lpinvis",b.style.left="0px",b.style.right="0px",b.style.top="0px",b.style.height="0px",b.style.visibility="hidden",document.body.appendChild(b));0<b.offsetWidth&&(a=b.offsetWidth);document.body.removeChild(b);return a}function defaultFrameResize(){sendRequest({cmd:"popupfillresize",width:0,height:0})}function verbose_log(a){verbose&&console_log(a)}
function LP_getAbsolutePos(a,b){if(!a||!b||"function"!=typeof b.getBoundingClientRect)return null;try{var c=b.getBoundingClientRect(),h,m;h="undefined"==typeof c.width?c.right-c.left:c.width;m="undefined"==typeof c.height?c.bottom-c.top:c.height;var n=a.body.getBoundingClientRect();return{left:c.left+a.body.scrollLeft-n.left,top:c.top+a.body.scrollTop-n.top,width:h,height:m}}catch(r){return null}}
function handleGotGeneratePrefs(a,b,c){LPIFRAMEVARS.g_myprefs=LPJSON.parse(a);a=LPJSON.parse(b);if(null!=a&&!isEmptyObject(a)){LPIFRAMEVARS.g_genpws=[];for(var h in a)a.hasOwnProperty(h)&&LPIFRAMEVARS.g_genpws.push(a[h])}c=LPJSON.parse(c);LPIFRAMEVARS.g_genpwpattern=c}
function doInit(a,b,c,h,m,n,r,d,p,f,q,j,k,e,l,t,s){if(dotrans){document.body.innerHTML="<DIV id='masterdiv'><DIV id='contentdiv'></DIV><DIV id='transdiv'></DIV></DIV>";h=document.getElementById("contentdiv");var u="",g;for(g in t)u+="<input id='"+ofa(g)+"' type='hidden' value='"+ofa(t[g])+"'/>";h.innerHTML+=u;LPIFRAMEVARS.g_formfills=LPJSON.parse(j);LPIFRAMEVARS.g_favicons=LPJSON.parse(k);LPIFRAMEVARS.g_sites=LPJSON.parse(e);j=LPpop.create_popup_obj(document,{sites:e,favicons:k,formfills:j,url:a});
h.appendChild(j)}else document.body.innerHTML=h;getGeneratePrefs();sizeTables(window);g_reference_url=a;g_can_copy_clipboard=m;"undefined"!=typeof c&&(g_ask_generate=0==g_ask_generate.length?0:c);"undefined"!=typeof n&&(g_ask_save=0==g_ask_save.length?0:n);"undefined"!=typeof r&&(g_username=r);"undefined"!=typeof d&&(g_inputtype=d);"undefined"!=typeof p&&(g_has_view_pw_challenge=p);"undefined"!=typeof q&&(g_has_view_site_challenge=q);"undefined"!=typeof l&&0<l&&(g_sitepwlen_override=l);"undefined"!=
typeof s&&s&&(g_ftd_match=s);g_rowtypes=b;if(a="undefined"!=typeof f)a:{if(null!=f){a=["sites","formfills","generate","save"];for(c=0;c<a.length;c++)if(a[c]==f){a=!0;break a}}a=!1}a&&(g_rowtypes=g_start_type_state=f);g_rowtypes_initial=b;if(null==g_rowtypes||0>=g_rowtypes.length)g_rowtypes="sites";g_initial_searchtext=null;setTimeout(function(){setup_event_handlers(document,window)},0);"ask_generate"==g_rowtypes||1==g_ask_generate?(setTimeout(function(){askGenerate()},0),g_currenttab="generate",doSuperBox(document),
doTitleBar(document,g_currenttab)):1==g_ask_save?(g_currenttab="savesite",doSuperBox(document),savesite_popupaction_iframe(document),doTitleBar(document,g_currenttab)):"formfills"==g_rowtypes?(g_currenttab="formfill",doSuperBox(document),doTitleBar(document,g_currenttab),formfillprofile_popupaction()):"sites"==g_rowtypes&&(g_currenttab="sites",hideElement(document,"popupcontainerff"),doSuperBox(document),0===countInputRows(document).sites?(null!=d&&"password"==d?(g_empty_in_super||doTitleBar(document,
gs("")),emptyAskSave(document)):(g_empty_in_super||doTitleBar(document,gs("")),emptyAskFill(document)),siteResize(document,EMPTY_RESIZE)):(doTitleBar(document,g_currenttab),siteResize(document)));popup_show_menu_expand_visual_cue&&do_inject_visual_cues(document);setActiveTab(document);g_switchedtabs=!1;document.addEventListener("keydown",function(a){LP_keypress_handler(a)},!1)}
function pollSaveChrome(a){chrome_runtime_sendMessage({cmd:"popupfillsaveget",url:g_reference_url},function(b){null!=b&&(null!=b.formdata2&&""!=b.formdata2?populateSave(b):null!=b.close?closePopups():null!=b.prompting?g_pollSave_max_retry=600:a<g_pollSave_max_retry&&(a++,setTimeout(function(){pollSaveChrome(a)},g_pollSave_retry_timeout)))})}
function do_never_kbd_event(a,b,c,h,m){if(null==b||""===b)b=0;0<b&&0===g_selected_never_row&&(g_selected_never_row=1);0>b&&1===g_selected_never_row&&(g_selected_never_row=0);m&&g_hide_navbar&&togglenavbar(a);0===g_selected_never_row&&c&&neverpage_handler();1===g_selected_never_row&&c&&neverdomain_handler()}
function do_more_kbd_event(a,b,c,h,m){var n=1,r=2,d=3,p=4,f=-99,q=-98;g_more_close_on_cancel&&g_more_enable_return?(f=5,p=q=6):g_more_close_on_cancel&&!g_more_enable_return?p=f=5:!g_more_close_on_cancel&&g_more_enable_return&&(p=q=5);if(null!=g_more_submenu_ffid||null!=g_more_submenu_aid&&!g_can_copy_clipboard)n=-97,r=-96,d=-95,p-=3,f-=3,q-=3;if(null==b||""===b)b=0;-1==g_selected_more_row&&h&&(g_selected_more_row=0);m&&g_hide_navbar&&togglenavbar(a);g_selected_more_row+=b;0>g_selected_more_row?g_selected_more_row=
0:g_selected_more_row>p&&(g_selected_more_row=p);if(c)switch(g_selected_more_row){case 0:edit_popupaction(g_more_submenu_aid,g_more_submenu_ffid);break;case n:copyusername_popupaction(g_more_submenu_aid);break;case r:copypassword_popupaction(g_more_submenu_aid);break;case d:copyurl_popupaction(g_more_submenu_aid);break;case 4:delete_popupaction(g_more_submenu_aid,g_more_submenu_ffid);break;case q:g_more_enable_return&&(null!=g_more_submenu_aid?sites_popupaction():null!=g_more_submenu_ffid?formfillprofile_popupaction():
closePopups());break;case f:g_more_close_on_cancel&&closePopups()}}
function translationInit(a){try{null!=a&&!isEmptyObject(a)&&("undefined"==typeof translations&&(translations={}),"undefined"==typeof translations["en-US"]&&(translations["en-US"]={}),translations["en-US"].ff_username_regexp=a.ff_username_regexp,translations["en-US"].ff_firstname_regexp=a.ff_firstname_regexp,translations["en-US"].ff_middlename_regexp=a.ff_middlename_regexp,translations["en-US"].ff_lastname_regexp=a.ff_lastname_regexp,translations["en-US"].ff_email_regexp=a.ff_email_regexp,translations["en-US"].ff_zip_regexp=
a.ff_zip_regexp,translations["en-US"].ff_country_regexp=a.ff_country_regexp,translations["en-US"].ff_city_regexp=a.ff_city_regexp,translations["en-US"].ff_currpass_regexp=a.ff_currpass_regexp,translations["en-US"].ff_search_regexp=a.ff_search_regexp,translations["en-US"].ff_bankacctnum_regexp=a.ff_bankacctnum_regexp,translations["en-US"].ff_captcha_regexp=a.ff_captcha_regexp,translations["en-US"].ff_company_regexp=a.ff_company_regexp,translations["en-US"].ff_password_regexp=a.ff_password_regexp,translations["en-US"].ff_question_answer_regexp=
a.ff_question_answer_regexp,translations["en-US"].ff_address1_regexp=a.ff_address1_regexp,translations["en-US"].ff_forgot_regexp=a.ff_forgot_regexp)}catch(b){verbose_log("translationInit: "+b.message)}}
function lpgs(a,b){var c="undefined"==typeof b||null==b?"":b;if("undefined"!=typeof lpgscache[c+a]||"undefined"==typeof lpgslocales[c]&&0==a.indexOf("ff_")&&(ApplyOverrides(c),"undefined"!=typeof lpgscache[c+a]))return lpgscache[c+a];if("undefined"!=typeof translations){if("undefined"!=typeof b&&b&&"undefined"!=typeof translations[b]&&"undefined"!=typeof translations[b][a])return translations[b][a];if("undefined"!=typeof translations["en-US"]&&"undefined"!=typeof translations["en-US"][a])return a=
translations["en-US"][a]}return"undefined"!=typeof lpgscache["en-US"+a]?lpgscache["en-US"+a]:a}function master_challenge_response_handler(a,b,c){if(a){if(g_did_pw_challenge=!0,b)return b()}else if(c)return c()}var g_ctr_master_challenge=0,MASTER_CHALLENGE_DISABLE=999999999999;
function pollChallenge(a,b,c){c||(c=600);g_ctr_master_challenge++;if(g_ctr_master_challenge<c){try{chrome_runtime_sendMessage({cmd:"getpwchallengeresult"},function(c){null!==c&&(master_challenge_response_handler(c,a,b),sendRequest({cmd:"getpwchallengeresult",reset:1}),g_ctr_master_challenge=MASTER_CHALLENGE_DISABLE)})}catch(h){b&&b();sendRequest({cmd:"getpwchallengeresult",reset:1});g_ctr_master_challenge=MASTER_CHALLENGE_DISABLE;return}setTimeout(function(){pollChallenge(a,b,c)},500)}else b&&b(),
sendRequest({cmd:"getpwchallengeresult",reset:1}),g_ctr_master_challenge=MASTER_CHALLENGE_DISABLE}var g_safari_master_challenge_success_callback_fn=null,g_safari_master_challenge_failure_callback_fn=null;
function do_master_pw_challenge(a,b,c){if(g_ischrome){g_ctr_master_challenge=0;try{chrome_runtime_sendMessage({cmd:"dopwchallenge"},function(){})}catch(h){return b?b():!1}pollChallenge(a,b,c)}else if(g_issafari||g_isfirefoxsdk)try{g_safari_master_challenge_success_callback_fn=a,g_safari_master_challenge_failure_callback_fn=b,g_issafari?safari.self.tab?safari.self.tab.dispatchMessage("dopwchallenge",{}):safari.extension.globalPage.contentWindow&&safari.extension.globalPage.contentWindow.message_handler({name:"dopwchallenge",
message:{},target:window}):g_isfirefoxsdk&&window.parent.postMessage({messagetype:"dopwchallenge"},"*")}catch(m){return b()}else return!1}function cr_add_profile(){return sendRequest({cmd:"addprofile",fromiframe:1})}function cr_add_cc(){return sendRequest({cmd:"addcreditcard",fromiframe:1})}function cr_clearforms(){return sendRequest({cmd:"clearforms",fromiframe:1})}function cr_closepopups(){return sendRequest({cmd:"closepopupfills",fromiframe:1})}
function cr_iframe_resize(a,b){return sendRequest({cmd:"popupfillresize",width:a,height:b,fromiframe:1})}function cr_generate(){return sendRequest({cmd:"generate",fromiframe:1})}function cr_delete_formfill_popupaction(a,b){sendRequest({cmd:"deleteformfill",ffid:b,fromiframe:1})}function cr_delete_site_popupaction(a,b){sendRequest({cmd:"deleteaid",aid:b,fromiframe:1})}function cr_save_password(a){sendRequest({cmd:"savePassword",pass:a,url:g_reference_url,fromiframe:1})}
function cr_copyusername(a){sendRequest({cmd:"copyusername",aid:a,fromiframe:1})}function cr_copypassword(a){sendRequest({cmd:"copypassword",aid:a,fromiframe:1})}function cr_copyurl(a){sendRequest({cmd:"copyurl",aid:a,fromiframe:1})}function cr_edit_site_popupaction(a){sendRequest({cmd:"editaid",aid:a,fromiframe:1})}function cr_edit_formfill_popupaction(a){sendRequest({cmd:"editprofile",ffid:a,fromiframe:1})}function cr_choose_profilecc(){sendRequest({cmd:"openchooseprofilecc",fromiframe:1})}
function cr_replacepasswordchooser(a,b,c){c||lp_gettld_url(g_reference_url);c=lp_gettld_url(c);a=LPJSON.stringify({sitecount:a,newpw:b,tld:c,fromiframe:1});sendRequest({cmd:"changepw",notificationdata:a})}function cr_replacepassword(a,b){var c=lp_gettld_url(g_reference_url),c=LPJSON.stringify({sitecount:1,newpw:a,singleaid:b,tld:c,fromiframe:1});sendRequest({cmd:"changepw",notificationdata:c})}
function cr_set_generate_prefs(a,b){"undefined"!=typeof g_ischrome&&g_ischrome?chrome_runtime_sendMessage({cmd:"popupfillsetgenerateprefs",prefstr:a,genpwstr:b,fromiframe:1},function(){}):sendRequest({cmd:"popupfillsetgenerateprefs",prefstr:a,genpwstr:b,fromiframe:1})}function lpConfirmYesNo(a){return confirm(a)};
