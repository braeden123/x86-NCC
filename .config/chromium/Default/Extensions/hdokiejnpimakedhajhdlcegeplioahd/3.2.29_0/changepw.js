function oninitchangepw(){}
function onshowchangepw(){var a=getBG();document.getElementById("changepwtld").innerHTML=g_changepwtld;var e=document.getElementById("changepwsites").contentWindow.document,d='<link rel="stylesheet" type="text/css" href="general.css"><table cellspacing="2" class="stdtext">',b=a.getsites(g_changepwtld,!0,g_changepwexcludeid),f=[],c;for(c in b)f[f.length]=a.g_sites[c];f.sort(a.lp_sort_case_insensitive_name);for(b=0;b<f.length;b++){c=f[b].aid;var h="";a.g_sites[c].group&&0==a.g_sites[c].group.indexOf("Shared-")&&
(h=" (Shared Folder)");var g=of(a.g_sites[c].name),j=of(a.getusernamefromacct(a.g_sites[c]));""!=j&&(g+=" ("+j+")");d+='<tr><td valign="middle"><input type="checkbox" id="aid'+c+'" name="aid'+c+'"></td><td><label for="aid'+c+'">'+g+h+"</label></td></tr>"}e.body.innerHTML=d+"</table>"}function onhidechangepw(){}
function dochangepw(){for(var a=getBG(),e=[],d=document.getElementById("changepwsites").contentWindow.document.getElementsByTagName("input"),b=0;b<d.length;b++)"checkbox"==d[b].type&&(d[b].checked&&0==d[b].name.indexOf("aid"))&&(e[e.length]=d[b].name.substring(3));if("function"!=typeof a.checkmultiplefolders||a.checkmultiplefolders(e))a.changePassword(g_changepwnewpw,e),closemole()};