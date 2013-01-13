function Hacklenode(config) {
	consoleLog("Hacklenode(config)");
	$.extend(this, config);
	
	this.radar = $($("#" + this.radarId)[0]);
	this.ocean = $($("#" + this.oceanId)[0]);
};

Hacklenode.prototype = {
	name:		"Hacklenode!",
	radarId:	"board-radar",
	oceanId:	"board-ocean",
	radar:		null,
	ocean:		null,
	
	prepBangerFleet: function(){
		var _this = this;
		
		consoleLog("prepBangerFleet() of Hacklenode '" + this.name + "'.");
		
		$(".banger").draggable({
			revert:	"invalid",
			obstacle: ".banger-positioned",
			preventCollision: true
		});
		
		$(".banger").on("drop", function(evt){
			$(this).addClass("validating-banger");
			_this.validateBangerPosition(this);
		});
				
		$("#board-ocean").droppable({
			accept : ".banger",
			activeClass : "ui-state-hover",
			hoverClass : "ui-state-active",
			drop : function(event, ui) {
				consoleLog(".banger dropped!");
				var banger = ui.draggable[0];
				$(banger).trigger("drop");
			}
		});
				
		this.addMessage("Place each banger from your fleet onto your ocean.");
	},
	
	validateBangerPosition: function(bangerElem){
		consoleLog("validateBangerPosition(bangerElem)");
		
		//var top = $(bangerElem).css("top");
		consoleLog(top);
		var firstCoord = $(".real-coord", this.ocean)[0];
		$(firstCoord).css("background-color","orange");
		var lastCoord = $(".real-coord", this.ocean)[99];
		$(lastCoord).css("background-color","purple");
		this.checkTopLeft(firstCoord, $(bangerElem));
		this.checkBottomRight(lastCoord, $(bangerElem));
		
		$(bangerElem).removeClass("validating-banger");
		$(bangerElem).addClass("banger-positioned");
	},
	
	checkTopLeft: function(firstCoord, bangerElem){
		consoleLog("checkTopLeft(firstCoord)");

		var bangerTop = $(bangerElem).offset().top;
		var bangerLeft = $(bangerElem).offset().left;

		var oceanTop = $(firstCoord).offset().top;
		var oceanLeft = $(firstCoord).offset().left;
		consoleLog(oceanTop);
		if(bangerTop < oceanTop){
			$(bangerElem).offset({
				top: oceanTop + 3, 
				left: $(bangerElem).offset().left
			});
		}
		if(bangerLeft < oceanLeft){
			$(bangerElem).offset({
				top: $(bangerElem).offset().top, 
				left: oceanLeft + 4
			});
		}
	},
	
	checkBottomRight: function(lastCoord, bangerElem){
		consoleLog("checkBottomRight(lastCoord,bangerElem)");
		
		var bangerOffset = $(bangerElem).offset();
		var bangerBottom = (bangerOffset.top + bangerElem.outerHeight());
		var bangerRight = (bangerOffset.left + bangerElem.outerWidth());
		
		var offset = $(lastCoord).offset(); //cache the position
		var oceanBottom = (offset.top + $(lastCoord).outerHeight());
		var oceanRight = (offset.left + $(lastCoord).outerWidth());
		
		consoleLog(oceanBottom);
		if(bangerBottom > oceanBottom){
			$(bangerElem).offset({
				top: oceanBottom - 3 - bangerElem.outerHeight(), 
				left: bangerElem.left
			});
		}
		if(bangerRight > oceanRight){
			$(bangerElem).offset({
				top: bangerElem.top, 
				left: oceanRight - 4 - bangerElem.outerWidth()
			});
		}
	},
	
	addMessage: function(message){
		$("<span></span>").html(message).prependTo("#messages-panel");
	}
};