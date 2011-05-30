# jQuery.markmap

Enables map mark feature on images and other elements from website. This enables you to give some further details
and explanations about something in your website/app.

Forked project from [https://github.com/Rafe/jQuery.mapmark].

##Instalation 

Include jQuery and MarkMap files:
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
	<link rel="stylesheet" href="mapmark/jQuery.mapmark.css" type="text/css"/>
	<script type="text/javascript" src="mapmark/jQuery.mapmark.js"></script> 

##Usage:
Create HTML markup as below:
	<div id="{GIVE_YOUR_ID}" class="mapmark_canvas">
	
		<!-- the image -->
		<img src="image.jpg" alt="github example" />
		
		<!-- the markers (positioned by css)--> 
		<div id="mark-1" class="mark"><div class="mark_glow"></div></div>
		<div id="mark-n" class="mark"><div class="mark_glow"></div></div>

		<!-- the popouts (positioned automatically) -->
		<div id="popout-1" class="popout">
			<div class="arrow"></div>
			<div class="inner">
				... example ...
			</div>
		</div>
		<div id="popout-n"> ... <div>

	</div>

Position you markers with CSS:
	/*
	 * Markers (top, left relative to #canvas)
	 */
	#mark-1{ top:80px; left: 105px; }
	#mark-2{ top:135px; left: 715px; }
	#mark-3{ top:233px; left: 700px; }
	#mark-4{ top:170px; left: 350px; }
	
Init Javascrit controll:
	$("#canvas1").mapmark(".mark",".popout");

##Additional Features:

Change action from click, to hover:
	$("#canvas1").mapmark(".mark",".popout",{action:"hover"});

Change theme to black adding CSS class to MapMark root element:
	<div id="{GIVE_YOUR_ID}" class="mapmark_canvas mapmark_theme_black">
		...
	</div>

##TODO
+ fix hover bug
+ check original project todos