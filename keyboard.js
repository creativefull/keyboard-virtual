var special = ["bckspc","space","tab","shift","alt","win","capslk","enter"];
var elementKey;
$.fn.type = function() {
	if (this.attr("data-focused") != "true") {
		$("input").removeAttr("data-focused");
		this.attr("data-focused", "true");
		enableKeyboard(this);
	}
}
$.fn.keyboard = function() {
	var arraySelector = [
		'<div class="span1">`</div>',
		'<div class="span1">1</div>',
		'<div class="span1">2</div>',
		'<div class="span1">3</div>',
		'<div class="span1">4</div>',
		'<div class="span1">5</div>',
		'<div class="span1">6</div>',
		'<div class="span1">7</div>',
		'<div class="span1">8</div>',
		'<div class="span1">9</div>',
		'<div class="span1">0</div>',
		'<div class="span1">-</div>',
		'<div class="span1">=</div>',
		'<div class="span2">Bckspc</div>',
		'<div class="span2">Tab</div>',
		'<div class="span1">Q</div>',
		'<div class="span1">W</div>',
		'<div class="span1">E</div>',
		'<div class="span1">R</div>',
		'<div class="span1">T</div>',
		'<div class="span1">Y</div>',
		'<div class="span1">U</div>',
		'<div class="span1">I</div>',
		'<div class="span1">O</div>',
		'<div class="span1">P</div>',
		'<div class="span1">[</div>',
		'<div class="span1">]</div>',
		'<div class="span1">\\</div>',
		'<div class="span3">CapsLk</div>',
		'<div class="span1">A</div>',
		'<div class="span1">S</div>',
		'<div class="span1">D</div>',
		'<div class="span1">F</div>',
		'<div class="span1">G</div>',
		'<div class="span1">H</div>',
		'<div class="span1">J</div>',
		'<div class="span1">K</div>',
		'<div class="span1">L</div>',
		'<div class="span1">;</div>',
		'<div class="span4 text-center">Enter</div>',
		'<div class="span5">Shift</div>',
		'<div class="span1">Z</div>',
		'<div class="span1">X</div>',
		'<div class="span1">C</div>',
		'<div class="span1">V</div>',
		'<div class="span1">B</div>',
		'<div class="span1">N</div>',
		'<div class="span1">M</div>',
		'<div class="span1">,</div>',
		'<div class="span1">.</div>',
		'<div class="span1">/</div>',
		'<div class="span1">\'</div>',
		'<center><div class="space position-center">Space</div></center>'
		]
	var element = "";
	arraySelector.forEach(function(data) {
		element += data;
	})
	this.addClass('ckeyboard').html(element);
}
function addChar(elements, character) {
	var element = $(elements.selector + "[data-focused=\"true\"]");
	var checkSpecial = special.indexOf(character.toLowerCase());
	if (checkSpecial < 0) {
		if (element.attr("data-capslk") == "true") {
			element.val(element.val() + character.toUpperCase());
		}
		else {
			element.val(element.val() + character.toLowerCase());
		}
	}
	else {
		var s = special[checkSpecial];
		if (s == "bckspc") {
			elements.backspace();
		}
		if (s == "space") {
			elements.space();
		}
		if (s == "tab") {
			return elements.tab();
		}
		if (s == "enter") {
			return elements.enter();
		}
	}
	element.change();
	element.keypress();
	element.focus();
}

function enableKeyboard(elements) {
	// var element = $('.' + elements.attr('class'));
	elementKey = elements;
}
$(function() {
	$("input").click(function() {
		$(this).type();
	})
	$(".ckeyboard div").click(function() {
		var element = elementKey;
		if (element != undefined) {
			var value = $(this).text();
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				element.removeAttr("data-capslk");
				if ($(this).attr("data-shift") == "true") {
					replacer(false);
				}
			}
			else {
				if (value == "Shift") {
					$(this).addClass("active");
					$(this).attr("data-shift","true");
					element.shift();
				}
				if (value == "CapsLk") {
					$(this).addClass("active");
					element.capsLk();
				}
				else {
					addChar(element, value);
				}			
			}			
		}
	})	
})
function replacer(val) {
	var string = ['`','1','2','3','4','5','6','7','8','9','0','-','=','[',']','\\',';','\'',',','.','/'];
	var replacer = ['~','!','@','#','$','%','^','&','*','(',')','_','+','{','}','|',':','"','<','>','?'];
	$(".ckeyboard").find("div").each(function() {
		if (val == true) {
			var indexnya = string.indexOf($(this).text());
			if (indexnya >= 0) {
				$(this).text(replacer[indexnya])
			}
		}
		else {
			var indexnya = replacer.indexOf($(this).text());
			if (indexnya >= 0) {
				$(this).text(string[indexnya])
			}
		}
	})	
}
$.fn.backspace = function() {
	this.val(this.val().substr(0, this.val().length-1));
}
$.fn.space = function() {
	var value = " ";
	this.val(this.val() + value);
}
$.fn.shift = function() {
	this.attr("data-capslk","true");
	replacer(true)
}
$.fn.capsLk = function() {
	this.attr("data-capslk","true");
}
$.fn.tab = function() {
	this.next().focus();
}
$.fn.enter = function() {
	this.closest("form").submit();
}