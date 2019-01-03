(function($) {
	var Carousel = (function() {
		function Carousel(element, options) {
			this.settings = $.extend(true, $.fn.Carousel.defaults, options || {});
			this.element = element;
			this.init();
		}
		Carousel.prototype = {
			init: function() {
				var me = this;
				me.poster = me.element;
				me.posterItemMain = me.poster.find("ul.poster-list");
				me.nextBtn = me.poster.find("div.poster-next-btn");
				me.prevBtn = me.poster.find("div.poster-prev-btn");
				me.posterItems = me.poster.find("li.poster-item");
				if(me.posterItems.size() % 2 == 0) {
					me.posterItemMain.append(me.posterItems.ep(0).clone());
					me.posterItems = me.posterItemMain.children;
				}
				me.posterFirstItem = me.posterItems.first();
				me.posterLastItem = me.posterItems.last();
				me.rotateFlag = true;
				me.setSettingValue();
				me.setPosterPost();
				//我加的
				me.posterFirstItem.css("background","blue").siblings().css("background","gray");
				
				me.nextBtn.click(function() {
					if(me.rotateFlag) {
						me.rotateFlag = false;
						me.carouseRotate("left");
					};
				});
				me.prevBtn.click(function() {
					if(me.rotateFlag) {
						me.rotateFlag = false;
						me.carouseRotate("right");
					};
				});
				if(me.settings.autoPlay) {
					me.autoPlay();
					me.poster.hover(function() {
						window.clearInterval(me.timer);
					}, function() {
						me.autoPlay();
					});
				}
			},
			autoPlay: function() {
				var me = this;
				me.timer = window.setInterval(function() {
					me.nextBtn.click();
				}, me.settings.delay);
			},
			carouseRotate: function(dir) {
				var me = this;
				var zIndexArr = [];
				if(dir === "left") {
					me.posterItems.each(function() {
						var self = $(this),
							prev = self.prev().get(0) ? self.prev() : me.posterLastItem,
							width = prev.width(),
							height = prev.height(),
							zIndex = prev.css("zIndex"),
							opacity = prev.css("opacity"),
							left = prev.css("left"),
							top = prev.css("top");
						zIndexArr.push(zIndex);
						self.animate({
							width: width,
							height: height,
							opacity: opacity,
							left: left,
							top: top
						}, me.settings.speed, function() {
							me.rotateFlag = true;
							
							//我加的
							/*if(width==450){
								self.css("background","blue").siblings().css("background","gray");
							}*/
							
						});
					});
					me.posterItems.each(function(i) {
						$(this).css("zIndex", zIndexArr[i]);
						if(zIndexArr[i] == Math.floor(me.posterItems.length / 2)) {
							$(this).find(".poster-item-title").slideDown("slow");
							//我加的
							$(this).css("background","blue").siblings().css("background","gray");
						} else {
							$(this).find(".poster-item-title").hide();
						}
					})
				} else if(dir === "right") {
					me.posterItems.each(function() {
						var self = $(this),
							next = self.next().get(0) ? self.next() : me.posterFirstItem,
							width = next.width(),
							height = next.height(),
							zIndex = next.css("zIndex"),
							opacity = next.css("opacity"),
							left = next.css("left"),
							top = next.css("top");
						zIndexArr.push(zIndex);
						self.animate({
							width: width,
							height: height,
							opacity: opacity,
							left: left,
							top: top
						}, me.settings.speed, function() {
							me.rotateFlag = true;
							
							//我加的
							/*if(width==450){
								self.css("background","blue").siblings().css("background","gray");
							}*/
						});
					});
					me.posterItems.each(function(i) {
						$(this).css("zIndex", zIndexArr[i]);
						if(zIndexArr[i] == Math.floor(me.posterItems.length / 2)) {
							$(this).find(".poster-item-title").slideDown("slow");
							//我加的
							$(this).css("background","blue").siblings().css("background","gray");
						} else {
							$(this).find(".poster-item-title").hide();
						}
					})
				}
			},
			setPosterPost: function() {
				var me = this;
				var sliceItems = me.posterItems.slice(1),
					sliceSize = sliceItems.size() / 2,
					rightSlice = sliceItems.slice(0, sliceSize),
					level = Math.floor(me.posterItems.size() / 2),
					leftSlice = sliceItems.slice(sliceSize);
				var rw = me.settings.posterWidth,
					rh = me.settings.posterHeight,
					gap = ((me.settings.width - me.settings.posterWidth) / 2) / level;
				var firstLeft = (me.settings.width - me.settings.posterWidth) / 2;
				var fixOffsetLeft = firstLeft + rw;
				rightSlice.each(function(i) {
					$(this).find(".poster-item-title").hide();
					level--;
					rw = rw * me.settings.scale;
					rh = rh * me.settings.scale;
					var j = i;
					$(this).css({
						zIndex: level,
						width: rw,
						height: rh,
						opacity: 1 / (++j),
						left: fixOffsetLeft + (++i) * gap - rw,
						top: me.setVertucalAlign(rh)
					});
				});
				var lw = rightSlice.last().width(),
					lh = rightSlice.last().height(),
					oloop = Math.floor(me.posterItems.size() / 2);
				leftSlice.each(function(i) {
					$(this).find(".poster-item-title").hide();
					$(this).css({
						zIndex: i,
						width: lw,
						height: lh,
						opacity: 1 / oloop,
						left: i * gap,
						top: me.setVertucalAlign(lh)
					});
					lw = lw / me.settings.scale;
					lh = lh / me.settings.scale;
					oloop--;
				});
			},
			setVertucalAlign: function(height) {
				var me = this;
				var verticalType = me.settings.verticalAlign,
					top = 0;
				if(verticalType === "middle") {
					top = (me.settings.height - height) / 2;
				} else if(verticalType === "top") {
					top = 0;
				} else if(verticalType === "bottom") {
					top = me.settings.height - height;
				} else {
					top = (me.settings.height - height) / 2;
				};
				return top;
			},
			setSettingValue: function() {
				var me = this;
				me.poster.css({
					width: me.settings.width,
					height: me.settings.height
				});
				me.posterItemMain.css({
					width: me.settings.width,
					height: me.settings.height
				});
				var w = (me.settings.width - me.settings.posterWidth) / 2;
				me.nextBtn.css({
					width: w,
					height: me.settings.height,
					zIndex: Math.ceil(me.posterItems.size() / 2)
				});
				me.prevBtn.css({
					width: w,
					height: me.settings.height,
					zIndex: Math.ceil(me.posterItems.size() / 2)
				});
				me.posterFirstItem.css({
					width: me.settings.posterWidth,
					height: me.settings.posterHeight,
					top: me.setVertucalAlign(me.settings.posterHeight),
					left: w,
					zIndex: Math.floor(me.posterItems.size() / 2)
				});
			}
		};
		return Carousel;
	})();
	$.fn.Carousel = function(options) {
		return this.each(function() {
			var me = $(this),
				instance = me.data("Carousel");
			if(!instance) {
				instance = new Carousel(me, options);
				me.data("Carousel", instance);
			}
		});
	};
	$.fn.Carousel.defaults = {
		"width": 1000,
		"height": 519,
		"posterWidth": 436,
		"posterHeight": 519,
		"scale": 0.9,
		"speed": 300,
		"autoPlay": true,
		"delay": 2000,
		"verticalAlign": "middle"
	}
}(jQuery));