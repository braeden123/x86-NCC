document.getElementById("lp_docwrite_site2")&&(document.getElementById("lp_docwrite_site2").innerHTML=gs("Add New Site"));document.getElementById("lp_docwrite_site3")&&(document.getElementById("lp_docwrite_site3").innerHTML=gs("URL:"));document.getElementById("lp_docwrite_site4")&&(document.getElementById("lp_docwrite_site4").innerHTML=gs("Name:"));document.getElementById("lp_docwrite_site5")&&(document.getElementById("lp_docwrite_site5").innerHTML=gs("Group:"));
document.getElementById("lp_docwrite_site6")&&(document.getElementById("lp_docwrite_site6").innerHTML=gs("Username:"));document.getElementById("lp_docwrite_site7")&&(document.getElementById("lp_docwrite_site7").innerHTML=gs("History"));document.getElementById("lp_docwrite_site8")&&(document.getElementById("lp_docwrite_site8").innerHTML=gs("Password:"));
if(g_eye_show&&document.getElementById("passwordtoggle")){var img=(getBG(),"images/eye-shown.png");document.getElementById("passwordtoggle").innerHTML='<a href="#" class="tooltip eye'+(g_isopera?"":" eye2")+'"> <img src="'+img+'" id="passwordtoggleimg" alt="'+gs("[Show]")+'"/><span tabindex="-1" id="passwordtoggle_tooltip">'+gs("Show Password")+"</span></a>"}document.getElementById("lp_docwrite_site10")&&(document.getElementById("lp_docwrite_site10").innerHTML=gs("History"));
document.getElementById("lp_docwrite_site12")&&(document.getElementById("lp_docwrite_site12").innerHTML=gs("Fields:"));document.getElementById("lp_docwrite_site13")&&(document.getElementById("lp_docwrite_site13").innerHTML=gs("Note Type")+":");document.getElementById("lp_docwrite_site14")&&(document.getElementById("lp_docwrite_site14").innerHTML=gs("Notes")+":");document.getElementById("lpaddattach")&&(document.getElementById("lpaddattach").innerHTML=gs("Add File"));
document.getElementById("lp_docwrite_site14a")&&(document.getElementById("lp_docwrite_site14a").innerHTML=gs("Advanced Settings"));document.getElementById("lp_docwrite_site15")&&(document.getElementById("lp_docwrite_site15").innerHTML=gs("Favorite"));document.getElementById("lp_docwrite_site16")&&(document.getElementById("lp_docwrite_site16").innerHTML=gs("Never AutoFill"));document.getElementById("editfields")&&(document.getElementById("editfields").innerHTML=gs("Edit Form Fields"));
document.getElementById("lp_docwrite_site18")&&(document.getElementById("lp_docwrite_site18").innerHTML=gs("Require Password Reprompt"));document.getElementById("lp_docwrite_site19")&&(document.getElementById("lp_docwrite_site19").innerHTML=gs("AutoLogin"));document.getElementById("lp_docwrite_site20")&&(document.getElementById("lp_docwrite_site20").innerHTML=gs("Replace Existing Site"));document.getElementById("lp_docwrite_site30")&&(document.getElementById("lp_docwrite_site30").innerHTML=gs("Show Username History"));
document.getElementById("lp_docwrite_site31")&&(document.getElementById("lp_docwrite_site31").innerHTML=gs("Show Password History"));document.getElementById("lp_docwrite_site32")&&(document.getElementById("lp_docwrite_site32").innerHTML=gs("Share Site"));document.getElementById("lp_docwrite_site33")&&(document.getElementById("lp_docwrite_site33").innerHTML=gs("Delete Site"));document.getElementById("lp_docwrite_site34")&&(document.getElementById("lp_docwrite_site34").innerHTML=gs("Add Site to Favorites"));
document.getElementById("lp_docwrite_site35")&&(document.getElementById("lp_docwrite_site35").innerHTML=gs("Note History"));
document.addEventListener("DOMContentLoaded",function(){window.addEventListener("load",function(){onLoad()});window.addEventListener("resize",function(){onResize()});document.getElementById("lpform").submit=function(){};document.getElementById("addnewsite").addEventListener("click",function(){fix_addreplace()});document.getElementById("showusernamehistory").onclick=function(){show_history(HISTORY.USERNAME);return!1};document.getElementById("passwordtoggle").onclick=function(){toggle_password(document.getElementById("password"),
document.getElementById("passwordtoggle"));return!1};document.getElementById("showpasswordhistory").onclick=function(){show_history(HISTORY.PASSWORD);return!1};document.getElementById("password").addEventListener("keyup",function(){update_password_meter("",this.value);disable_CPWButton()});document.getElementById("notestype").onchange=function(){buildSecureNotes()};document.getElementById("notestype").addEventListener("focus",function(){this.blur()});document.getElementById("editfields").onclick=
function(){doeditfields();return!1};document.getElementById("replaceexistingsite").addEventListener("click",function(){fix_addreplace()});document.getElementById("del").addEventListener("click",function(){dodel();return!1});document.getElementById("share").addEventListener("click",function(){doshare();return!1});document.getElementById("notehistory").addEventListener("click",function(){notehist();return!1});document.getElementById("save").addEventListener("click",function(){dosave();return!1});document.getElementById("cancel").addEventListener("click",
function(){docancel();return!1});document.getElementById("lpaddattach").addEventListener("click",function(){addattach();return!1});document.getElementById("exnotehist").addEventListener("click",function(){show_history(HISTORY.EXTRA);return!1});document.getElementById("cpwbtn").addEventListener("click",function(a){docpwbtn(a);return!1});document.getElementById("cpwdebug").addEventListener("click",function(a){docpwdebug(a);return!1});window.addEventListener("keyup",function(a){update_SaveButton(ENABLE_ONLY);
g_do_keyaccel&&accelerator_key_handler(a)});window.addEventListener("mouseup",function(){update_SaveButton(ENABLE_ONLY)})});g_cpwbot&&window.addEventListener("unload",function(){var a=getBG();if(a&&"undefined"!=typeof a.cpwbot_halt){var b=g_ischrome?a.cpwbot_getpwchangestate():g_cpwbot_pwchangestate;"FAIL"!=b&&("CAPTCHA"!=b&&"DONE"!=b&&"OK"!=b&&"TIMEOUT"!=b&&0!=b&&null!==b)&&a.cpwbot_halt()}},!1);
is_in_dialog()&&(document.getElementById("sitebodymain").style.padding="0px",document.getElementById("sitebodymain").style.overflowX="hidden");
