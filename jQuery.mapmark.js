(function($){
  
  var markers;
  var setting = {
    popoutPrefix : "#popout"
  }

  var activeHiding;

  var matchPopout = function(id){
    var popoutid = setting.popoutPrefix+"-"+id.split("-")[1];
    return $(popoutid);
  }

  var setMarkerPriority = function(self){
    markers.css("z-index",0);
    self.css("z-index",100);
  }

  var restoreMarker = function(){
    markers.css("z-index",100);
  }

  var showPopout = function(){
    var self = $(this);
    var popout = matchPopout(self.attr("id"));
    setMarkerPriority(self);

    if(activeHiding){
      clearTimeout(activeHiding);
    }

    var offset = self.offset();
    popout.css({"left":offset.left+"px",
      "top":(offset.top-60)+"px",
      "diaplay":"block",
      "visibility":"visible"});
    if(popout.hasClass("leaving")){
      popout.removeClass("leaving");
    }
    popout.addClass("popped");
  }

  var hidePopout = function(){
    var self = $(this);
    var popoutid = setting.popoutPrefix+"-"+self.attr("id").split("-")[1];
    var popout = matchPopout(self.attr("id"));
    popout.removeClass("popped").addClass("leaving");
    var hideAndRemove = function(){
      popout.removeClass("leaving");
      popout.css({
        "diaplay":"none",
        "visibility":"hidden"
      });
    }
    activeHiding = setTimeout(hideAndRemove,500);
    setTimeout(restoreMarker,500);
  }

  $.fn.mapmark = function(){
    markers = this;
    this.hover(showPopout,hidePopout);
  }
})(jQuery)
