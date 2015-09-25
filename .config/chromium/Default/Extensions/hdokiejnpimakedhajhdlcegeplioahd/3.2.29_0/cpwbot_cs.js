var CPWbot_cs;CPWbot_cs||(CPWbot_cs=new CPWbot_cs_lib);
function CPWbot_cs_lib(){var b=this;this.JSON=JSON;JSON||(this.JSON=LPJSON);this.alert=alert;this.fill_field=function(a,c){a||(a=LP_derive_doc());if(!c||!a)return!1;var d=0,b=this.getElementByType(a,c);b?(verbose_log(sprintf("filling element ty=%s val=%s should_click=%d should_fill_via_keys=%d",c.id_type,c.id_value,c.should_click,c.should_fill_via_keys)),b.focus(),c.should_click&&(CPWbot_cs.do_click(a,b,c.flavor),"function"==typeof sendKey&&sendKey("Z",b),fire_onchange(b,!0,!0)),c.should_fill_via_keys&&
g_isfirefox?fill_field_via_keys(b,c.field_value):b.value=c.field_value,fire_onchange(b),d=1):verbose_log("unable to find element ty="+c.id_type+" val="+c.id_value);sendBG({cmd:"cpwbot_fill_ack",url:get_doc_location_href(a),docstate:a.readyState,req_id:c.req_id,id_type:c.id_type,id_value:c.id_value,found:d?1:0,should_click:c.should_click,should_fill_via_keys:c.should_fill_via_keys},a);return!0};this.click_field=function(a,c){a||(a=LP_derive_doc());if(!c||!a)return!1;var d=b.CLICK_NOMINAL,f=b.CLICK_NO_FOCUS,
g=b.CLICK_MOUSEDOWN,h=b.CLICK_STRANGE,j=this.getElementByType(a,c),k=0,e=d;c.flavor&&(lp_in_array(c.flavor,[d,f,g,h])?e=c.flavor:console.warn("unexpected click flav"));j?(verbose_log("[docnum:"+getmydocnum(a)+"][state:"+c.pwchangestate+"] clicking element ty="+c.id_type+" val="+c.id_value),this.do_click(a,j,e),k=1):verbose_log("[docnum:"+getmydocnum(a)+"][state:"+c.pwchangestate+"] unable to find element in this frame to click : ty="+c.id_type+" val="+c.id_value);sendBG({cmd:"cpwbot_click_ack",url:get_doc_location_href(a),
docstate:a.readyState,pwchangestate:c.pwchangestate,msgid:c.msgid,id_type:c.id_type,id_value:c.id_value,found:k?1:0,flavor:e},a);return!0};this.execute_script=function(a,c){a||(a=LP_derive_doc());if(!c||!a||!Math)return!1;if(!g_isfirefox||!a||a.defaultView){var d=c.js,b=c.hash,g=null;if(d){var h=d,j;j="function"==typeof fasthash?fasthash:"function"==typeof crc32?crc32:"function(j) { if (j) { return j.length; } return 0; }";verbose_log(sprintf("comparing %s with %s",b,j(h)));if(b!=j(h))return console_error("failed javascript consistency check"),
!1;b="__lpresult"+Math.floor(Math.random()*Math.pow(2,31));verbose_log("["+getmydocnum(a)+"] executing JS: "+d);d=null===a.body?"try{"+d+"}catch(e) { }":"try {"+sprintf("var _res = document.getElementById('%s');  if (!_res) { _res = document.createElement('div');  _res.id='%s'; _res.style.display='none'; _res.style.left='-1000px'; document.body.appendChild(_res); } { ",b,b)+d+"} if (_res) { if (typeof(_res.innerText) != 'undefined') { _res.innerText = document._g_result; } else { _res.textContent = document._g_result; } document._g_result = null; }} catch(e) { }";
run_custom_js(a,d);if(d=a.getElementById(b))g=LP_elt_get_text(d),"undefined"==typeof g&&(g=null),d.parentElement.removeChild(d)}sendBG({cmd:"cpwbot_js_ack",url:get_doc_location_href(a),docstate:a.readyState,req_id:c.req_id,result:CPWbot_cs.JSON.stringify(g)},a);return!0}};this.getElementByType=function(a,c){a||(a=LP_derive_doc());if(!c||!a||g_isfirefox&&a&&!a.defaultView)return null;var b=null,f=null,f=c.id_type,g=c.id_value,h=666;if(f&&g)switch(f){case "id":b=a.getElementById(g);break;case "name":(f=
a.getElementsByName(g))&&0<f.length&&(b=f[0]);break;case "xpath":g_isie&&"undefined"!=typeof init_LPfn&&(init_LPfn()&&LPfn)&&(h=LPfn.getDocumentMode(a));8>h?alert("old IE - does not bundle in XPATH support. TODO "):b=LP_getElementByXPath(a,g);break;default:!0}return b};this.getElementsByType=function(a,c){a||(a=LP_derive_doc());if(!c||!a)return null;var b=null,f=[],b=c.id_type,g=c.id_value,h=666;if(b&&g)switch(b){case "id":(b=a.getElementById(g))&&f.push(b);break;case "name":f=a.getElementsByName(g);
break;case "xpath":g_isie&&"undefined"!=typeof init_LPfn&&(init_LPfn()&&LPfn)&&(h=LPfn.getDocumentMode(a));8>h?this.alert("old IE - does not bundle in XPATH support. TODO "):f=LP_getElementsByXPath(a,g);break;default:!0}return f};this.field_is_displayed=function(a,c){a||(a=LP_derive_doc());return!c||!a?!1:lpIsVisible(c)?!0:!1};this.CLICK_NOMINAL=0;this.CLICK_NO_FOCUS=1;this.CLICK_MOUSEDOWN=2;this.CLICK_STRANGE=3;this.do_click=function(a,c,d){a||(a=LP_derive_doc());if(!c||!a)return!1;var f=b.CLICK_NOMINAL,
g=b.CLICK_NO_FOCUS,h=b.CLICK_MOUSEDOWN,j=b.CLICK_STRANGE;if("undefined"==typeof d||!d)d=f;"undefined"!=typeof c.disabled&&c.disabled&&(c.disabled=!1);d!==g&&c.focus();switch(d){case j:break;case h:if((a=LP_getAbsolutePos(a,c))&&c)d=document.createEvent("MouseEvent"),d.target=c,d.initMouseEvent("mouseenter",!0,!1,window,0,a.left,a.top,a.left,a.top,!1,!1,!1,!1,0,document.documentElement),c.dispatchEvent(d),d=document.createEvent("MouseEvent"),d.target=c,d.initMouseEvent("mousemove",!0,!1,window,0,a.left+
2,a.top+2,a.left+2,a.top+2,!1,!1,!1,!1,0,null),c.dispatchEvent(d),d=document.createEvent("MouseEvent"),d.target=c,d.initMouseEvent("mousedown",!0,!1,window,0,a.left+2,a.top+2,a.left+2,a.top+2,!1,!1,!1,!1,0,null),c.dispatchEvent(d),d=document.createEvent("MouseEvent"),d.target=c,d.initMouseEvent("mouseup",!0,!1,window,0,a.left+2,a.top+2,a.left+2,a.top+2,!1,!1,!1,!1,0,null),c.dispatchEvent(d),d=document.createEvent("MouseEvent"),d.target=c,d.initMouseEvent("click",!0,!1,window,0,a.left+2,a.top+2,a.left+
2,a.top+2,!1,!1,!1,!1,0,null),c.dispatchEvent(d);break;default:a&&c&&(g_isfirefox?fireEvent(a,c,"click","MouseEvents"):LP_fireEvent(c,"click","MouseEvents"))}return!0};this.decode_fields_metainfo=function(a){var c="";a&&(c=this.JSON.parse(a));return c};this.validate_page_fields=function(a,c,d,f,g,h,j,k){if(!a)return null;g=!0;var e={};verbose_log("running validate_page_fields in frame "+getmydocnum(a)+" for "+c);d||(d=[]);f||(f=[]);k||(k=[]);c=!1;var p=0,l=0,q=0,r=0,m;if(h){m=RegExp(h,"i");var n=
punycode.URLToASCII(a.location.href);if(m.exec(n))return e.num_ok_matches=null,e.num_okfields=null,e.found_bad_match=null,e.num_badfields=null,e.url_success_match=!0,e.url_failure_match=!1,e.do_retry=!1,e.retval=!0,e.found_interactive=!1,verbose_log("["+getmydocnum(a)+"] returning true, matched success url "+h),g_isdebug&&(set_innertext(e,LP_elt_get_text(a.body)),e.innerHTML=a.body.innerHTML),e}if(j&&(m=RegExp(j,"i"),n=punycode.URLToASCII(a.location.href),m.exec(n)))return e.num_ok_matches=null,e.num_okfields=
null,e.found_bad_match=null,e.num_badfields=null,e.url_failure_match=!0,e.url_success_match=!1,e.do_retry=!1,e.retval=!1,e.found_interactive=!1,verbose_log("["+getmydocnum(a)+"] returning false, matched failure url "+j),g_isdebug&&(set_innertext(e,LP_elt_get_text(a.body)),e.innerHTML=a.body.innerHTML),e;for(h=0;h<d.length;h++)if(j=d[h].id_type,m=d[h].id_value,n=b.getElementByType(a,{id_type:j,id_value:m}))p++,l++;else{verbose_log("["+getmydocnum(a)+"] DID NOT FIND REQUIRED FIELD ty="+j+" val="+m);
break}l<d.length&&(c=!0,g=null);if(g)for(h=0;h<f.length;h++)if(j=f[h].id_type,m=f[h].id_value,n=this.getElementByType(a,{id_type:j,id_value:m})){p++;q=1;verbose_log("["+getmydocnum(a)+"] FOUND REJECT FIELD "+m);c=g=!1;break}else c=!0;for(h=0;h<k.length;h++)if(j=k[h].id_type,m=k[h].id_value,n=this.getElementByType(a,{id_type:j,id_value:m})){p++;r=1;verbose_log("["+getmydocnum(a)+"] FOUND INTERACTIVE FIELD "+m);c=!1;break}if(0===p&&(0<d.length||0<f.length))g=null;e&&(e.num_ok_matches=l,e.num_okfields=
d.length,e.found_bad_match=q,e.num_badfields=f.length,e.do_retry=c,e.retval=g,e.url_success_match=!1,e.url_failure_match=!1,e.found_interactive=r,g_isdebug&&(set_innertext(e,LP_elt_get_text(a.body)),e.innerHTML=a.body.innerHTML));return e};this.interrogate=function(a,c,b){if(c&&!(10<b)){var f=c.desc,g=c.proceed_on_interactive;"undefined"==typeof b&&(b=1);var h=a.readyState;(g?"complete"==h||"interactive"==h:"complete"==h)?g_cpwbot&&CPWbot_cs&&CPWbot_cs.interrogate_validate(a,c):(verbose_log("["+getmydocnum(a)+
"] retry "+f+" in 500ms doc state is "+a.readyState),setTimeout(function(){CPWbot_cs.interrogate(a,c,b+1)},500))}};this.interrogate_validate=function(a,b,d){if(!b||10<d)return!1;if("undefined"==typeof d||null===d)d=1;var f=b.desc,g=b.required_fields,h=b.rejected_fields,j=b.required_url,k=b.rejected_url,e=b.interactive_fields,p=b.id,l=b.validate_timeout,q=b.timestamp,q=((new Date).getTime()-q)/1E3;if("undefined"==typeof l||null===l)l=0;if(0<l&&d>=l/2E3)return verbose_log("terminate loop  ["+getmydocnum(a)+
"] VT:"+l+" T:1000 ctr"+d+" elapsed time is "+q+" sec"),!1;verbose_log("WTF??  ["+getmydocnum(a)+"] VT:"+l+" T:1000 ctr"+d+" elapsed time is "+q+" sec");var r=CPWbot_cs.decode_fields_metainfo(g),m=CPWbot_cs.decode_fields_metainfo(h),e=CPWbot_cs.decode_fields_metainfo(e);if(0===r.length&&0===m.length&&!k&&!j)return 0<e.length&&!0,verbose_log("["+getmydocnum(a)+"] warning: interrogate rcvd no inputs or urls to check against"),l=!0,sendBG({cmd:"cpwbot_validate_state_result",state:"STATE"+d,url:get_doc_location_href(a),
docstate:a.readyState,desc:f,id:p,required_fields:g,rejected_fields:h,required_url:j,rejected_url:k,result_obj:CPWbot_cs.JSON.stringify(n),result:CPWbot_cs.JSON.stringify(l)},a),!0;var n=CPWbot_cs.validate_page_fields(a,f,r,m,l,j,k,e);if(null===n)return null;l=n.retval;n.do_retry&&null===l?(verbose_log("["+getmydocnum(a)+"] ctr="+d+" elapsed="+q+" sec, validate_page_fields "+f+" retry in 1 second"),setTimeout(function(){var e=CPWbot_cs.interrogate_validate(a,b,d+1);e||(e=0===r.length&&0<m.length||
0<r.length&&0<m.length&&0<n.num_ok_matches?!0:!1,sendBG({cmd:"cpwbot_validate_state_result",state:"STATE_TIMEDOUT",url:get_doc_location_href(a),docstate:a.readyState,desc:f,id:p,required_fields:g,rejected_fields:h,required_url:j,rejected_url:k,result_obj:CPWbot_cs.JSON.stringify(n),result:CPWbot_cs.JSON.stringify(e)},a))},1E3)):(null===l&&(verbose_log("["+getmydocnum(a)+"] cpwbot_validate_state_result retval===null FIXME"),l=!1),sendBG({cmd:"cpwbot_validate_state_result",state:"STATE"+d,url:get_doc_location_href(a),
docstate:a.readyState,desc:f,id:p,required_fields:g,rejected_fields:h,required_url:j,rejected_url:k,result_obj:CPWbot_cs.JSON.stringify(n),result:CPWbot_cs.JSON.stringify(l)},a));return!0};this.do_result_div=function(a,b){if(!a||!g_isdebug)return!1;g_isdebug&&check_for_selenium_bits(a);var d=a.getElementById("__lpresultdiv");if(!d&&a.body&&(d=a.createElement("div")))d.id="__lpresultdiv",d.style.left="-999px",d.style.position="absolute",a.body.appendChild(d);return LP_elt_set_text(d,b)};this.hide_result_div=
function(a){if(!a)return!1;(a=a.getElementById("__lpresultdiv"))&&a.parentElement.removeChild(a);return!0};return!0}
function display_cpw_message_loop(b,a,c){if(b){if(null===a){if(null===b.getElementById("cpwmsg"))return;g_ischrome?chrome_runtime_sendMessage({cmd:"getcpwmsg"},function(a){a&&a.msg&&display_cpw_message(b,a.msg);1===a.minimize_state&&minimize_cpw_dialog(b)}):"undefined"!=typeof safari?(safari.self.removeEventListener("message",handleMessage,!1),safari.self.addEventListener("message",handleMessage,!1),safari.self.tab.dispatchMessage("getcpwmsg",{})):"undefined"!=typeof g_isfirefoxsdk&&g_isfirefoxsdk&&
window.parent.postMessage({messagetype:"getcpwmsg"},"*")}else display_cpw_message(b,a,c);g_isdebug&&check_for_selenium_bits(b);setTimeout(function(){display_cpw_message_loop(b,null,null)},51)}}
function update_msgdiv_css(b,a,c,d,f){if(!b)return!1;a="position:absolute !important; visibility:visible !important;  border-style:transparent!important; border-width:1px !important; border-color:#4c4c4c !important; font-size:14px; font-family: Arial,Helvetica,sans-serif; height: "+a+" !important ; width: "+c+" !important; top:"+f+" !important; left:"+d+" !important; background-color: #e6e6e6; margin: 4px !important; border-radius: 4px; padding: 1px !important; overflow:auto;";if(b=b.getElementById("cpwmsg"))b.style.cssText=
a;else return!1;return!0}var OVERLAY_MESSAGE_WIDTH="500px",OVERLAY_MESSAGE_HEIGHT="200px",OVERLAY_MESSAGE_HEIGHT_MINIMIZED="70px",OVERLAY_MESSAGE_TOP="50px",OVERLAY_MESSAGE_LEFT="50px";
function display_cpw_message(b,a,c){if(b){var d=b.getElementById("cpwmsg");if(d)pass;else{d=b.createElement("div");d.style.width="100%";d.style.height=window.innerHeight+"px";d.style.opacity="0.7";d.style.backgroundColor="#666666";d.id="cpwbg";d.style.position="absolute";d.style.top="0px";d.style.left="0px";b.body.appendChild(d);var f;if(d=b.createElement("div")){d.id="cpwmsg";b.body.appendChild(d);update_msgdiv_css(b,OVERLAY_MESSAGE_HEIGHT,OVERLAY_MESSAGE_WIDTH,OVERLAY_MESSAGE_TOP,OVERLAY_MESSAGE_LEFT);
d.setAttribute("role","status");var g=b.createElement("div");g.style.cssText="height: 20px !important; padding: 2px 0px 0px 20px; background-color: #ffffff !important; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGQjdGMTE3NDA3MjA2ODExQkVEQ0Y4NkVBMzlCNDIwRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRjA2MTdBMTU2REYxMURGQUNGOUQ1RDAwQTc4OEQzOSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRjA2MTdBMDU2REYxMURGQUNGOUQ1RDAwQTc4OEQzOSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA3ODAxMTc0MDcyMDY4MTFBQjA4RDY4QTAyQUEzMTc1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZCN0YxMTc0MDcyMDY4MTFCRURDRjg2RUEzOUI0MjBEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1Gef5AAAA69JREFUeNpUVF1oXEUU/mbm7t67m82mdtsGUgXbB6tWC1WhoKh5UST0RapQ2kLJgxVSqsEfBCNaH8yLLyr1IbHFoLYPVmkfCv7giz+tVlRsrQRkC01MzDZm02Zzd+//Hb+ZpKiznJ17z8z55nzfOXeEXlJi5sv7X758pGcommtVlcohhBYS2swQnFeGQG7eNGcttJkDv+Pn/VPvPzy68JpofLHjwIWDG8aieh2KgQZA0aTO7TMR7dB6xXKhkK2CQks0uRbsmXnF+euztbuD+hSU5DLXDIjKQm7L4DgFOCaa/jzXSAhu0IQqI+ExGfeuzRXOnqnslVknVFrYpO2SQgxvcx9u+/Bt9L7+DHTWhJcuYv3uAWw5MwHv3q3MMsGNvDRNCu04BkSbk4xDp5AesOWT91Dbfjci34c/dgzu7J/oGxlG5c7b0fPQDpzd1g99pQEpS0iplZSaJCksLOOc9HIUgmtYePcoDLRbqaB3+GmU9+9BF0HMaEycQD71BxwpLH2sZCScVCcis2F0Zi0UECE+9g6aj/Wj9sTjqD01iCxObO1aF3/D/HMvoFu3mQmQosfAICUrJ80zBNSl4Eps3DeILreAov834slJxMlOyFIZqsQgiuxfuIja3l1Q1Q2Iix7qx0+h3WgSiBlpaGbEn+di3ciz8G7ZiDxJoaMYrcVF/HcUdg5gzZO7KDZLwwR+/+prxI0Gs9VwjNQMQ0Z2c1PTEMstwACFIbRS/wMSaQrhuuwRxRaQSEh5RSXAySxXiagTYOb5w3C5VOksoPTAg5CHhqgbt9oGI+inpxAf/wh+uYZ2wUN7epa7C6QdEYhli6l/aE77+ScDCe24KIwOAKSLuQbAQ8SmW4FHH8HS+ATS+nmq2sUolp9ACbmxnykHqZlejkQJgSjCfelFePdth1cuI/zgBPzRN1EseXBv7kPljcO4XlyDUHiI+blEpLUCxL/QfC80n5Vped3AXXegq1qFnp3D9MnTmP/uW8Q//oJKrcau34Sldb24pjN0GGNiY200yqWIzUdpO0khDRJ8v38Imwf3IWk2Mb98HRX6L781jtlfL2HyyDiiVpsSuLarU5MRs3HiJEn/BTLCKzpZ2rExew94qFr/4rnz8M99Y3URBDG6pqsVC/kg12+98nGHrwkXjBmtAgIk6KaXmvHsZVobRYZUrbhmT7x68FXuuume8HMRXIUcH668+sPJ0kE3Q7e5foS9l+ztYQ2rGd8wXmx27mgdO9uC0yNH24f+EWAAmnbJJ+zxvWgAAAAASUVORK5CYII=); background-repeat:no-repeat; background-position: left top;background-attachment: scroll;";
g.style.fontWeight="bold";g.id="cpwtitle";g.addEventListener("click",function(){toggle_cpw_dialog(b);return!1},!1);f=b.createElement("div");f.id="msgbody";f.style.fontSize="18px";f.style.padding="4px";var h=b.createElement("div");h.style.padding="4px";var j=b.createElement("span"),k=b.createElement("span");k.style.display="inline-block";k.style.marginLeft="3px";k.style.marginRight="3px";var e=b.createElement("span");c?g_isfirefox?(e.textContent=c,k.textContent="|"):(set_innertext(e,c),set_innertext(k,
"|")):(k.style.display="none",e.style.display="none");c=gs("LastPass Automatic Password Change");g_isfirefox?j.textContent=c:set_innertext(j,c);g.appendChild(j);g.appendChild(k);g.appendChild(e);d.appendChild(g);h.style.marginTop="5px";h.style.marginBottom="5px";h.style.fontSize="12px";h.style.fontStyle="italic";c=gs("Please do not close this window, while LastPass changes your password.");g_isfirefox?h.textContent=c:set_innertext(h,c);d.appendChild(h);d.appendChild(f)}}f||(f=b.getElementById("msgbody"));
f&&(g_isfirefox?f.textContent=a:set_innertext(f,a))}}function cpw_hide_overlay(b){if(!b)return!1;g_isfirefox||(b=b.getElementById("lpiframeoverlaycpwmsg"))&&b.parentNode.removeChild(b);return!0}function toggle_cpw_dialog(b){if(!b)return!1;var a=b.getElementById("msgbody");if(b.getElementById("cpwmsg")&&a)"none"==a.style.display?(maximize_cpw_dialog(b),maximize_cpw_bg()):(minimize_cpw_dialog(b),minimize_cpw_bg());else return!1;return!0}
function maximize_cpw_dialog(b){if(!b)return!1;var a=OVERLAY_MESSAGE_TOP,c=OVERLAY_MESSAGE_LEFT,d=OVERLAY_MESSAGE_WIDTH,f=OVERLAY_MESSAGE_HEIGHT,g=b.getElementById("msgbody");return b.getElementById("cpwmsg")&&g?("block"!=g.style.display&&(update_msgdiv_css(b,f,d,a,c),g.style.display="block"),!0):!1}
function minimize_cpw_dialog(b){if(!b)return!1;var a=OVERLAY_MESSAGE_TOP,c=OVERLAY_MESSAGE_LEFT,d=OVERLAY_MESSAGE_WIDTH,f=OVERLAY_MESSAGE_HEIGHT,g=b.getElementById("msgbody");return b.getElementById("cpwmsg")&&g?("none"!=g.style.display&&(f=OVERLAY_MESSAGE_HEIGHT_MINIMIZED,update_msgdiv_css(b,f,d,a,c),g.style.display="none"),!0):!1}
function do_cpw_overlay_handler(b,a){if(CPWbot_cs&&CPWbot_cs.JSON&&b&&b.msg){var c=CPWbot_cs.JSON.parse(b.msg);if(c){var d=encodeURIComponent(c.symbolic);g_isfirefox?(lpShowOverlay(a,0,c.msg),lpSetOverlayStatus(a,""),lpisadmin&&do_cpw_debug(a)):(c=encodeURIComponent(c.msg),verbose_log("show overlay msg="+c),showoverlay(b,"&cpwbot="+c+"&symbolic="+d))}else verbose_log("failure, !msg")}}
function ping_req_handler(b,a){var c=(new Date).getTime(),d=0;"undefined"!=typeof a.timestamp&&a.timestamp&&(d=c-a.timestamp);var f="";try{f=punycode.URLToASCII(b.location.href)}catch(g){}sendBG({cmd:"ping_ack",timestamp:c,delta:d,id:a.id,url:f,docstate:get_docstate(b),flags:assemble_docflags_object(b)},b)}function get_docstate(b){return!b?null:"undefined"!=typeof b.readyState&&b.readyState?b.readyState:"undef"}
function assemble_docflags_object(b){return!b?null:{is_special_site:g_is_specialsite,in_cpwbot:g_in_cpwbot,tutorial_flags:g_tutorial_flags,need_dynamic_delay:g_need_dynamic_delay,has_frameset:0<b.getElementsByTagName("FRAMESET").length}}
function run_custom_js(b,a){if(b)try{if(""!=a)if(!b.g_content_check_result||is_page_JSON(b))b.g_content_check_result=!1;else{var c=lp_gettld_url(b.location.href);if(!(("facebook.com"==c||"live.com"==c||"outlook.com"==c)&&0==b.getElementsByTagName("form").length)){a=a.replace(/lpcurrpage./g,"");a="try{"+a+"}catch(e){}";var d=b.createElement("script"),f=b.createTextNode(a);d.appendChild(f);b.body&&b.body.appendChild(d)}}}catch(g){}}
function do_result_div_handler(b,a){g_isdebug&&CPWbot_cs&&CPWbot_cs.do_result_div(b,a.msg);return!0}function hide_result_div_handler(b){g_isdebug&&CPWbot_cs&&CPWbot_cs.hide_result_div(b);return!0}function need_dynamic_delay(b){if(!b)return!1;var a=LP_elt_get_text(b.head);return 0<=LP_elt_get_text(b.body).indexOf("\x3c!-- ko")||0<=a.indexOf("require")||0<=a.indexOf("lazyload")?!0:!1}
function minimize_cpw_bg(){g_ischrome?chrome_runtime_sendMessage({cmd:"minimize_cpw_dialog"},function(){pass}):"undefined"!=typeof safari?safari.self.tab.dispatchMessage("minimize_cpw_dialog",{}):"undefined"!=typeof g_isfirefoxsdk&&g_isfirefoxsdk&&window.parent.postMessage({messagetype:"minimize_cpw_dialog"},"*")}
function maximize_cpw_bg(){g_ischrome?chrome_runtime_sendMessage({cmd:"maximize_cpw_dialog"},function(){pass}):"undefined"!=typeof safari?safari.self.tab.dispatchMessage("maximize_cpw_dialog",{}):"undefined"!=typeof g_isfirefoxsdk&&g_isfirefoxsdk&&window.parent.postMessage({messagetype:"maximize_cpw_dialog"},"*")}function get_doc_location_href(b){try{return b.location?b.location.href:""}catch(a){return""}}
function getmydocnum(b){if(g_isfirefox){b||(b=LP_derive_doc());if(!b)return 0;if("undefined"==typeof b.g_docnum){var a=lpGetBrowserForDocument(b),c=get_tabid_from_browser(a);if(null==c)return console_error("did not found matching tab for given tabid, bail"),0;ff_setdocnum_conditional(b,c);a.contentDocument==b&&(g_CS_tops[c]=b.g_docnum)}return b.g_docnum}return g_docnum}var g_is_selenium=!1,g_selenium_bits=-1,LPSELENIUMBITSDIV="__lpseleniumbitsdiv";
function check_for_selenium_bits(b){if(!b||!g_isdebug)return-1;var a=-1,c=b.getElementById(LPSELENIUMBITSDIV);c?(c=parseInt(LP_elt_get_text(c)),isNaN(c)||(g_selenium_bits=a=c),g_is_selenium=!0,sendBG({cmd:"from_selenium",bits:a,url:get_doc_location_href(b),docstate:b.readyState})):-1!=g_selenium_bits&&(a=g_selenium_bits);return a};
