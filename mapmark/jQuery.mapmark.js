(function($){
  
  //animation easing settings
  $.extend($.easing, {
    easeInQuad: function (x, t, b, c, d) {
      return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
    }
  });

  //cache objects and setting
  var markers,
      popouts,
      isInPopout = false,
      setting = {
        markerHeight: 0,
        markerWidth	: 0,
        speed 		: 400,
        easeIn 		: "easeInQuad",
        easeOut 	: "easeOutQuad",
        action		: "click"
      };
  
  //init function, hide the popout objects and save the width and height of marker
  //@markers : the markers objects
  //@popouts : the popouts objects
  var init = function(markers,popouts){
    popouts.hide();
    setting.markerHeight = markers.first().outerHeight();
    setting.markerWidth = markers.first().outerWidth();
  };

  //animation states
  var initState = function(position,popout){
    return {
      left:position.left ,
      top:position.top ,
      diaplay:"block",
      visibility:"visible",
      opacity:0
    };
  },

  midState = function(position,popout){
    return {
      top:position.top + (setting.markerHeight / 2),
      opacity:1
    };
  },

  endState = function(position,popout){
    return {
      top:position.top + setting.markerHeight,
      opacity:0
    };
  };

  //flag for clear the popout if there's other active
  var activeHiding;
  var clearActivePopout = function(){
    $(setting.popoutClass).hide();
  };

  //return the matched popout for marker by second part of id:
  //ex: mark-test will be matched with popout-test 
  var matchPopout = function(id){
    var popoutid = setting.popoutPrefix+"-"+id.split("-")[1];
    return $(popoutid);
  };
  
  //return the matched marker for corresponding popoutid
  var matchMarker = function(id){
    var markerid = setting.markerPrefix+"-"+id.split("-")[1];
    return $(markerid);
  };

  //set other markers's z-index to 0 to avoid the popout overwrited by marker
  var setMarkerPriority = function(self){
    markers.css("z-index",0);
    self.css("z-index",100);
  };

  //restore z-index to max to avoid the hover state been interupted
  var restoreMarker = function(){
    markers.css("z-index",100);
  };

  var showPopout = function(){
    var self = $(this);
    var popout = matchPopout(self.attr("id"));

    setMarkerPriority(self);

    if(activeHiding){
      clearActivePopout();
      clearTimeout(activeHiding);
    }

    popout.show(); 
    //popout.hover(keepPopout,outPopout);

    var position = self.position();
    popout.css(initState(position,popout))
      .animate(midState(position,popout),setting.speed,setting.easeIn);
  };

  var hidePopout = function(){
    if(isInPopout){ return; }
    var self = $(this);
    var popout = matchPopout(self.attr("id"));
    var hideAndRemove = function(){
      popout.animate(endState(self.position(),popout),setting.speed,setting.easeOut,self.hide);
    };
    activeHiding = setTimeout(hideAndRemove,200);
    setTimeout(restoreMarker,200 + setting.speed);
  };

  var keepPopout = function(){
    if (activeHiding){
      clearTimeout(activeHiding);
    }
    isInPopout = true;
  };
  
  var outPopout = function(){
    var self = $(this);
    var marker = matchMarker(self.attr("id"));
    if (activeHiding){
      activeHiding = false;
    }
    hidePopout.call(marker);
  };

  //main function: 
  //usage: $("markers").mapmark("popouts-class");
  $.fn.mapmark = function(markerClass,popoutClass,options) {
    //set options
    $.extend(setting,options);

    //record classes for manipulate
    canvas = $(this);
    markers = $(markerClass, canvas);
    popouts = $(popoutClass, canvas);
    
    if(popouts.length <= 0){
      throw "Empty popout objects Error";
    }

    if(markers.length <= 0){
      throw "Empty markers objects Error";
    }

    //setting the class name of popout and id format for popout
    setting.popoutClass = popoutClass;
    setting.popoutPrefix = "#"+popouts.first().attr("id").split("-")[0];
    setting.markerClass = markerClass;
    setting.markerPrefix = "#"+markers.first().attr("id").split("-")[0];

    init(markers,popouts);
    markers[setting.action === 'hover' ? 'hover' : 'toggle'](showPopout,hidePopout);
    canvas.click(function(){
      clearActivePopout();
    });
    //markers.hover(showPopout,hidePopout);
  };
  
})(jQuery);
