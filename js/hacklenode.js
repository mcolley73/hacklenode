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
			revert:	"invalid"
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
		
		var top = $(bangerElem).offset().top;
		var left = $(bangerElem).offset().left;
		//var top = $(bangerElem).css("top");
		consoleLog(top);
		var firstCoord = $(".real-coord", this.ocean)[0];
		var oceanTop = $(firstCoord).offset().top;
		var oceanLeft = $(firstCoord).offset().left;
		//var oceanTop = $(".real-coord", this.ocean)[0];
		consoleLog(oceanTop);
		/*
		if(top < oceanTop){
			$(bangerElem).position({
				my:	"top",
				at:	"top",
				of:	firstCoord,
				offset: "0 3"
			});
			$(bangerElem).css("top", $(bangerElem).css("top")+5);
		}
		*/
		if(top < oceanTop){
			$(bangerElem).offset({
				top: oceanTop + 3, 
				left: $(bangerElem).offset().left
			});
		}
		if(left < oceanLeft){
			$(bangerElem).offset({
				top: $(bangerElem).offset().top, 
				left: oceanLeft + 4
			});
		}
		
		$(this).removeClass("validating-banger");
	},
	
	addMessage: function(message){
		$("<span></span>").html(message).prependTo("#messages-panel");
	}
};