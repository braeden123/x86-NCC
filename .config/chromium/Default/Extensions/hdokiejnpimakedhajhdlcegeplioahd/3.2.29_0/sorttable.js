var stIsIE=!1;
sorttable={search_array:{},init:function(){_timer&&clearInterval(_timer);document.createElement&&document.getElementsByTagName&&(sorttable.DATE_RE=/^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/,sorttable.search_array={},forEach(document.getElementsByTagName("table"),function(a){if(-1!=a.className.search(/\bsortable\b/)){sorttable.makeSortable(a);var b;a=sorttable.tokenize_popup_rows(a);for(b in a)sorttable.search_array[b]=a[b]}}))},makeSortable:function(a){0==a.getElementsByTagName("thead").length&&(the=
document.createElement("thead"),the.appendChild(a.rows[0]),a.insertBefore(the,a.firstChild));null==a.tHead&&(a.tHead=a.getElementsByTagName("thead")[0]);if(1==a.tHead.rows.length){sortbottomrows=[];for(var b=0;b<a.rows.length;b++)-1!=a.rows[b].className.search(/\bsortbottom\b/)&&(sortbottomrows[sortbottomrows.length]=a.rows[b]);if(sortbottomrows){null==a.tFoot&&(tfo=document.createElement("tfoot"),a.appendChild(tfo));for(b=0;b<sortbottomrows.length;b++)tfo.appendChild(sortbottomrows[b]);delete sortbottomrows}for(var c=
a.tHead.rows[0].cells,b=0;b<c.length;b++)if(!c[b].className.match(/\bsorttable_nosort\b/)){var d=c[b].className.match(/\bsorttable_([a-z0-9]+)\b/),e="";d&&(e=d[1]);c[b].sorttable_sortfunction=d&&"function"==typeof sorttable["sort_"+e]?sorttable["sort_"+e]:sorttable.guessType(a,b);c[b].sorttable_columnindex=b;c[b].sorttable_tbody=a.tBodies[0];c[b].addEventListener("click",function(){if(-1!=this.className.search(/\bsorttable_sorted\b/)){sorttable.reverse(this.sorttable_tbody);this.className=this.className.replace("sorttable_sorted",
"sorttable_sorted_reverse");var a=document.getElementById("sorttable_sortfwdind");a&&a.parentNode.removeChild(a);a=document.createElement("span");a.id="sorttable_sortrevind";a.innerHTML=stIsIE?'&nbsp<font face="webdings">5</font>':"&nbsp;&#x25B4;";this.appendChild(a)}else if(-1!=this.className.search(/\bsorttable_sorted_reverse\b/))sorttable.reverse(this.sorttable_tbody),this.className=this.className.replace("sorttable_sorted_reverse","sorttable_sorted"),(a=document.getElementById("sorttable_sortrevind"))&&
a.parentNode.removeChild(a),a=document.createElement("span"),a.id="sorttable_sortfwdind",a.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':"&nbsp;&#x25BE;",this.appendChild(a);else{forEach(this.parentNode.childNodes,function(a){1==a.nodeType&&(a.className=a.className.replace("sorttable_sorted_reverse",""),a.className=a.className.replace("sorttable_sorted",""))});(a=document.getElementById("sorttable_sortfwdind"))&&a.parentNode.removeChild(a);(a=document.getElementById("sorttable_sortrevind"))&&
a.parentNode.removeChild(a);this.className+=" sorttable_sorted";a=document.createElement("span");a.id="sorttable_sortfwdind";a.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':"&nbsp;&#x25BE;";this.appendChild(a);for(var a=[],b=this.sorttable_columnindex,c=this.sorttable_tbody.rows,d=0;d<c.length;d++)a[a.length]=[sorttable.getInnerText(c[d].cells[b]),c[d]];a.sort(this.sorttable_sortfunction);b=this.sorttable_tbody;for(d=0;d<a.length;d++)b.appendChild(a[d][1]);delete a}},!1)}}},guessType:function(a,
b){var c=sorttable.sort_alpha;if(0==b||1==b)return c;if(2==b)return sorttable.sort_reverse_numeric;for(var d=0;d<a.tBodies[0].rows.length;d++){var e=sorttable.getInnerText(a.tBodies[0].rows[d].cells[b]);if(""!=e){if(e.match(/^-?[\xA3$\xA4]?[\d,.]+%?$/))return sorttable.sort_numeric;if(e=e.match(sorttable.DATE_RE)){c=parseInt(e[1]);e=parseInt(e[2]);if(12<c)return sorttable.sort_ddmm;if(12<e)return sorttable.sort_mmdd;c=sorttable.sort_ddmm}}}return c},getInnerText:function(a){if(!a)return"";hasInputs=
"function"==typeof a.getElementsByTagName&&a.getElementsByTagName("input").length;if(null!=a.getAttribute("sorttable_customkey"))return a.getAttribute("sorttable_customkey");if("undefined"!=typeof a.textContent&&!hasInputs)return a.textContent.replace(/^\s+|\s+$/g,"");if("undefined"!=typeof a.innerText&&!hasInputs)return a.innerText.replace(/^\s+|\s+$/g,"");if("undefined"!=typeof a.text&&!hasInputs)return a.text.replace(/^\s+|\s+$/g,"");switch(a.nodeType){case 3:if("input"==a.nodeName.toLowerCase())return a.value.replace(/^\s+|\s+$/g,
"");case 4:return a.nodeValue.replace(/^\s+|\s+$/g,"");case 1:case 11:for(var b="",c=0;c<a.childNodes.length;c++)b+=sorttable.getInnerText(a.childNodes[c]);return b.replace(/^\s+|\s+$/g,"");default:return""}},reverse:function(a){newrows=[];for(var b=0;b<a.rows.length;b++)newrows[newrows.length]=a.rows[b];for(b=newrows.length-1;0<=b;b--)a.appendChild(newrows[b]);delete newrows},sort_numeric:function(a,b){aa=parseFloat(a[0].replace(/[^0-9.-]/g,""));isNaN(aa)&&(aa=0);bb=parseFloat(b[0].replace(/[^0-9.-]/g,
""));isNaN(bb)&&(bb=0);return aa-bb},sort_reverse_numeric:function(a,b){aa=parseFloat(a[0].replace(/[^0-9.-]/g,""));isNaN(aa)&&(aa=0);bb=parseFloat(b[0].replace(/[^0-9.-]/g,""));isNaN(bb)&&(bb=0);return bb-aa},sort_alpha:function(a,b){var c,d;c="undefined"!=typeof a[0].toLowerCase?a[0].toLowerCase():a;d="undefined"!=typeof b[0].toLowerCase?b[0].toLowerCase():b;return c==d?0:c<d?-1:1},sort_ddmm:function(a,b){var c,d,e,f;c=a[0].match(sorttable.DATE_RE);d=c[3];e=c[2];c=c[1];1==e.length&&(e="0"+e);1==
c.length&&(c="0"+c);f=d+e+c;c=b[0].match(sorttable.DATE_RE);d=c[3];e=c[2];c=c[1];1==e.length&&(e="0"+e);1==c.length&&(c="0"+c);d=d+e+c;return f==d?0:f<d?-1:1},sort_mmdd:function(a,b){var c,d,e,f;c=a[0].match(sorttable.DATE_RE);d=c[3];e=c[2];c=c[1];1==c.length&&(c="0"+c);1==e.length&&(e="0"+e);f=d+c+e;c=b[0].match(sorttable.DATE_RE);d=c[3];e=c[2];c=c[1];1==c.length&&(c="0"+c);1==e.length&&(e="0"+e);d=d+c+e;return f==d?0:f<d?-1:1},shaker_sort:function(a,b){for(var c=0,d=a.length-1,e=!0;e;){for(var e=
!1,f=c;f<d;++f)0<b(a[f],a[f+1])&&(e=a[f],a[f]=a[f+1],a[f+1]=e,e=!0);d--;if(!e)break;for(f=d;f>c;--f)0>b(a[f],a[f-1])&&(e=a[f],a[f]=a[f-1],a[f-1]=e,e=!0);c++}},filter:function(a,b){b=b.toLowerCase();b=b.replace(/^\s+/,"");b=b.replace(/\s+$/,"");for(var c=0;c<a.rows.length;c++){var d=a.rows[c].id;if(!("autofilltabfooter"==d||"autologintabfooter"==d||"autologintabheader"==d||"autofilltabheader"==d))if(0==d.indexOf("lpautofill")||0==d.indexOf("lpautologin"))document.getElementById(d).style.display=0==
b.length?"table-row":"undefined"!=typeof sorttable.search_array[d]&&0<=sorttable.search_array[d].indexOf(b)?"table-row":"none"}},tokenize_popup_rows:function(a){for(var b={},c=0;c<a.rows.length;c++){var d=[],e=a.rows[c].id;if(!("autofilltabfooter"==e||"autologintabfooter"==e||"autologintabheader"==e||"autofilltabheader"==e))if(0==e.indexOf("lpautofill")||0==e.indexOf("lpautologin")){var f=a.rows[c];if("undefined"!=typeof f.childNodes&&"undefined"!=typeof f.childNodes.length)for(var g=0;g<f.childNodes.length;g++)d.push(get_innertext(f.childNodes[g]));
d=d.join(" ");d=d.toLowerCase();b[e]=d}}return b},initial_sort:function(a){forEach(a.parentNode.childNodes,function(a){1==a.nodeType&&(a.className=a.className.replace("sorttable_sorted_reverse",""),a.className=a.className.replace("sorttable_sorted",""))});var b=document.getElementById("sorttable_sortfwdind");b&&b.parentNode.removeChild(b);(b=document.getElementById("sorttable_sortrevind"))&&b.parentNode.removeChild(b);a.className+=" sorttable_sorted";b=document.createElement("span");b.id="sorttable_sortfwdind";
b.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':"&nbsp;&#x25BE;";a.appendChild(b);for(var b=[],c=a.sorttable_columnindex,d=a.sorttable_tbody.rows,e=0;e<d.length;e++)b[b.length]=[sorttable.getInnerText(d[e].cells[c]),d[e]];b.sort(a.sorttable_sortfunction);a=a.sorttable_tbody;for(e=0;e<b.length;e++)a.appendChild(b[e][1]);delete b}};
if("undefined"!=typeof navigator&&/WebKit/i.test(navigator.userAgent))var _timer=setInterval(function(){/loaded|complete/.test(document.readyState)&&sorttable.init()},10);Array.forEach||(Array.forEach=function(a,b,c){for(var d=0;d<a.length;d++)b.call(c,a[d],d,a)});String.forEach=function(a,b,c){Array.forEach(a.split(""),function(d,e){b.call(c,d,e,a)})};var forEach=function(a,b,c){if(a){var d=Object;"string"==typeof a?d=String:"number"==typeof a.length&&(d=Array);d.forEach(a,b,c)}};
