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
			obstacle: ".banger-positioned[id!='" + $(this).attr("id") + "']",
			preventCollision: true,
			start: function(){
//				$(this).appendTo($(this.ocean));
			}
		});
		
		$(".banger").on("drop", function(evt){
			$(this).addClass("validating-banger");
		});
				
		$("#board-ocean").droppable({
			accept : ".banger",
			activeClass : "ui-state-hover",
			hoverClass : "ui-state-active",
			drop : function(event, ui) {
				consoleLog(".banger dropped!");
				var banger = ui.draggable[0];

				//$(banger).trigger("drop");
				$(banger).addClass("validating-banger");
				
				_this.validateBangerPosition($(banger));
				if($(banger).collision(".banger-positioned").length > 0){
					ui.draggable.draggable("option","revert",true);
					$(banger).appendTo($("#banger-fleet"));
				}else{
					$(banger).appendTo($(this.ocean));
					$(banger).addClass("banger-positioned");
				}
				$(banger).removeClass("validating-banger");
			}
		});
				
		this.addMessage("Place each banger from your fleet onto your ocean.");
	},
	
	validateBangerPosition: function(bangerElem){
		consoleLog("validateBangerPosition(bangerElem)");

		var firstCoord = $(".real-coord", this.ocean)[0];
		$(firstCoord).css("background-color","orange");
		var lastCoord = $(".real-coord", this.ocean)[99];
		$(lastCoord).css("background-color","purple");
		
		this.checkTopLeft(firstCoord, $(bangerElem));
		this.checkBottomRight(lastCoord, $(bangerElem));
		
		// snap into place
		this.snapTopToPriorRow($(bangerElem));
		this.snapTopToPriorColumn($(bangerElem));
		
		// ok, it's in the ocean. in what position does it start?
		this.determineBangerPlacement($(bangerElem));
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
	
	determineBangerPlacement: function(bangerElem){
		var bangerOffset = bangerElem.offset();
		consoleLog(bangerOffset);
		var row = this.findRow(bangerOffset);
		consoleLog(row);
	},
	
	snapTopToPriorRow: function(bangerElem){
		$(bangerElem).css("float",null);
		$(bangerElem).css("clear",null);
		var row = this.findRow($(bangerElem).offset());
		consoleLog(row);
		var rowLabels = $(".row-label", this.ocean);
		var rowLabelTop = $(rowLabels[row]).offset().top;
		consoleLog(rowLabelTop);
		$(bangerElem).offset({
			top: rowLabelTop + 3, 
			left: $(bangerElem).offset().left
		});
	},
	
	snapTopToPriorColumn: function(bangerElem){
		var column = this.findColumn($(bangerElem).offset());
		consoleLog(column);
		var columnLabels = $(".coord-label", this.ocean);
		var columnLabelLeft = $(columnLabels[column]).offset().left;
		consoleLog(columnLabelLeft);
		$(bangerElem).offset({
			top: $(bangerElem).offset().top, 
			left: columnLabelLeft + 4
		});
	},
	
	findRow: function(bangerOffset){
		var row = -1;
		$(".row-label", this.ocean).each(function(index, rowLabel){
			if(index > 0){
				if($(rowLabel).offset().top < bangerOffset.top){
					row = index;
				}
			}
		});
		return row;
	},
	
	findColumn: function(bangerOffset){
		var column = -1;
		$(".coord-label", this.ocean).each(function(index, coordLabel){
			if($(coordLabel).offset().left < bangerOffset.left){
				column = index;
			}
		});
		return column;
	},
	
	addMessage: function(message){
		$("<span></span>").html(message).prependTo("#messages-panel");
	}
	
};