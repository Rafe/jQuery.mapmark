(function($){
  
  //animation easing settings
  $.extend($.easing,{
    easeInQuad: function (x, t, b, c, d) {
      return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
    }
  });

  //cache objects and setting
  var markers,popouts,
      setting = {
    markerHeight : 0,
    markerWidth : 0,
    speed : 400,
    easeIn : "easeInQuad",
    easeOut : "easeOutQuad"
  }
  
  //init function, hide the popout objects and save the width and height of marker
  //@markers : the markers objects
  //@popouts : the popouts objects
  var init = function(markers,popouts){
    popouts.hide();
    setting.markerHeight = markers.first().outerHeight();
    setting.markerWidth = markers.first().outerWidth();
  }

  //animation states
  var initState = function(offset,popout){
    return {
      left:offset.left - (popout.outerWidth() / 2) + (setting.markerWidth / 2),
      top:offset.top - popout.outerHeight() + setting.markerHeight,
      diaplay:"block",
      visibility:"visible",
      opacity:0
    }
  },

  midState = function(offset,popout){
    return {
      top:offset.top - popout.outerHeight(),
      opacity:1
    }
  },

  endState = function(offset,popout){
    return {
      top:offset.top - popout.outerHeight() - setting.markerHeight,
      opacity:0
    }
  }

  //flag for clear the popout if there's other active
  var activeHiding;
  var clearActivePopout = function(){
    $(setting.popoutClass).hide();
  }

  //return the matched popout for marker by second part of id:
  //ex: mark-test will be matched with popout-test 
  var matchPopout = function(id){
    var popoutid = setting.popoutPrefix+"-"+id.split("-")[1];
    return $(popoutid);
  }

  //set other markers's z-index to 0 to avoid the popout overwrited by marker
  var setMarkerPriority = function(self){
    markers.css("z-index",0);
    self.css("z-index",100);
  }

  //restore z-index to max to avoid the hover state been interupted
  var restoreMarker = function(){
    markers.css("z-index",100);
  }

  var showPopout = function(){
    var self = $(this);
    var popout = matchPopout(self.attr("id"));

    setMarkerPriority(self);

    if(activeHiding){
      clearActivePopout();
      clearTimeout(activeHiding);
    }

    popout.show(); 

    var offset = self.offset();
    popout.css(initState(offset,popout))
      .animate(midState(offset,popout),setting.speed,setting.easeIn);
  }

  var hidePopout = function(){
    var self = $(this);
    var popout = matchPopout(self.attr("id"));
    var hideAndRemove = function(){
      popout.animate(endState(self.offset(),popout),setting.speed,setting.easeOut);
    }
    activeHiding = setTimeout(hideAndRemove,setting.speed);
    setTimeout(restoreMarker,setting.speed);
  }
  //main function: 
  //usage: $("markers").mapmark("popouts-class");
  $.fn.mapmark = function(popoutClass,options){
    $.extend(setting,options)
    markers = this;
    
    popouts = $(popoutClass)
    
    if(popouts.length <= 0){
      throw "Empty popout objects Error";
    }

    //setting the class name of popout and id format for popout
    setting.popoutClass = popoutClass;
    setting.popoutPrefix = "#"+popouts.first().attr("id").split("-")[0];

    init(markers,popouts);
    this.hover(showPopout,hidePopout);
  }
})(jQuery)
