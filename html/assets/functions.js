var SITE_TITLE = "AnoChat";
var JSTORAGE_KEY = "anochat_";

if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, ''); 
	}
}

var fadeSpeed = 300;
if (navigator.appName == 'Microsoft Internet Explorer' &&
	navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/) != null &&
	parseFloat(RegExp.$1) < 9)
{
	fadeSpeed = 0;
}

var consoleSupported = (typeof console !== "undefined" && typeof console.log !== "undefined");
function trace()
{
	if (!consoleSupported) return;
	$.each(arguments,function(Index,Argument){
		console.log(Argument);
	});
}

function empty(mixed_var)
{
	var key;
	
	if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined')
	{
		return true;
	}
	
	if (typeof mixed_var == 'object')
	{
		for (key in mixed_var)
		{
			return false;
		}
		return true;
	}
	
	return false;
}

function makeElement(type,attributes,contents)
{
	var element = $("<"+type+">");
	
	attributes = (attributes !== undefined) ? attributes : null;
	contents = (contents !== undefined) ? contents : null;
	
	if (attributes !== null && typeof(attributes) == "object")
	{
		$.each(attributes,function(attribute,value){
			element.attr(attribute,value);
		});
	}
	
	if (contents !== null && $.inArray(typeof(contents),["object","string"]) >= 0)
	{
		if (typeof(contents) == "string") contents = [contents];
		
		$.each(contents,function(index,content){
			element.append(content);
		});
	}
	
	return element;
}

jQuery.fn.checkField = function(target)
{	
	return $(this).change(function(e) {
		$(this).trigger('keyup');
	}).keyup(function(e) {
		$(target).prop("disabled",$(this).val().trim() == "");
	});
}

var pushStateSupported = history.pushState !== undefined;
function redirect(URL,Title,NewState,TrackURL)
{
	Title = Title == undefined ? '' : Title;
	NewState = NewState == undefined ? '' : NewState;
	
	if (pushStateSupported)
	{
		window.history.pushState(NewState,Title,URL);
		if (_gaq != undefined)
		{
			TrackURL = TrackURL == undefined ? URL : TrackURL;
			_gaq.push(['_trackPageview',TrackURL]);
		}
	}
	else window.location.href = URL;
	
	return pushStateSupported;
}

function validEmail(email)
{
	var emailTester = /(([a-zA-Z0-9_\.\-\+]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-\.]*))/i;
	return emailTester.test(email);
}

var openModal = function(Parameters,Contents)
{
	if (Parameters == undefined || Parameters == null)
	{
		Parameters = {};
	}
	
	var width = Parameters.width !== undefined ? Parameters.width : 800;
	var height = Parameters.height !== undefined ? Parameters.height : 'auto';
	var close = Parameters.close !== undefined ? Parameters.close : true;
	
	var modalHolder = makeElement("div",{"class":"modalHolder"});
	
	var modalOverlay = makeElement("div",{"class":"modalOverlay"}).fadeTo(0,0.75);
	
	var modalContainer = makeElement("div",{"class":"modalContainer container"});
	modalContainer.css("width",width).css("margin-left",-(width/2)-10);
	
	var modalScroller = makeElement("div",{"class":"modalScroller"},Contents);
	
	var modalClose = "";
	
	modalContainer.append(modalScroller);
	
	if (close)
	{
		modalOverlay.click(closeModal).css("cursor","pointer");
		
		modalClose = makeElement("div",{"class":"modalClose"},[
			makeElement("img",{src:"/assets/images/close.png"})
		]).css("margin-left",(width/2)+10-8+1).click(closeModal)
	}
	
	modalHolder.append(modalOverlay).append(modalContainer).append(modalClose);
	
	$(document.body).append(modalHolder);
	
	height = (height == "auto") ? modalScroller.css("height").replace("px","") : height;
	modalScroller.css("height",height);
	
	modalHolder.hide().fadeIn(fadeSpeed);
}

var closeModal = function(callback)
{
	$('.modalHolder').last().fadeOut(fadeSpeed,function(){
		$(this).remove();
		if (typeof(callback) == "function")
		{
			callback();
		}
	});
}

var errorWindow = function(message, callback)
{
	openModal({width:300,close:false},makeElement('div',null,[
		makeElement("h2",null,"Error"),
		makeElement("p",null,message),
		makeElement('div',{align:"right"},[
			makeElement("input",{type:"button","class":"niceButton red",value:"Close"}).click(function(){
				closeModal(callback);
			})
		])
	]));
}


function autolink(str)
{
	// LINK DOMAINS
	var patternMatch = /\b((http(s?):\/\/)?(([a-z0-9-_]+?)((\.[a-z]{2,3}){1,2})([a-z0-9-._~:\/\#\=\?\[\]\$\(\)\*\+\@\!\&\'\,\;])*))/i;
	var parrentReplace = "<a href=\"http$3://$4\" target=\"_blank\">$1</a>";
	str = str.replace(patternMatch,parrentReplace);
	
	/*
	// LINK EMAILS
	var patternMatch = /(([a-zA-Z0-9_\.\-\+]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-\.]*))/i;
	var parrentReplace = "<a href=\"mailto:$1\">$1</a>";
	str = str.replace(patternMatch,parrentReplace);
	*/
	
	return str;
}

function htmlentities (string, quote_style, charset, double_encode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: nobbler
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // +   improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)
    // -    depends on: get_html_translation_table
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
    // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
    // *     returns 2: 'foo&#039;bar'
    var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
        symbol = "";
    string = string == null ? "" : string + "";

    if (!hash_map) {
        return false;
    }
    
    if (quote_style && quote_style === 'ENT_QUOTES') {
        hash_map["'"] = '&#039;';
    }
    
    if (!!double_encode || double_encode == null) {
        for (symbol in hash_map) {
            if (hash_map.hasOwnProperty(symbol)) {
                string = string.split(symbol).join(hash_map[symbol]);
            }
        }
    } else {
        string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
            for (symbol in hash_map) {
                if (hash_map.hasOwnProperty(symbol)) {
                    text = text.split(symbol).join(hash_map[symbol]);
                }
            }
            
            return text + entity;
        });
    }

    return string;
}

function get_html_translation_table (table, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    var entities = {},
        hash_map = {},
        decimal;
    var constMappingTable = {},
        constMappingQuoteStyle = {};
    var useTable = {},
        useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        if (entities.hasOwnProperty(decimal)) {
            hash_map[String.fromCharCode(decimal)] = entities[decimal];
        }
    }

    return hash_map;
}

function injectScript(src)
{
	var script = $('<script>').attr('src',src).attr('async',true);
	console.log(script);
	$($(document).find('head,body')[0]).append(script);
}