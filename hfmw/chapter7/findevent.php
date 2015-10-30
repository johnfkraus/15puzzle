<!DOCTYPE html> 
<html> 
	<head> 
	<meta charset="UTF-8" />
	<title>Find an Event</title> 
	
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0rc1/jquery.mobile-1.0rc1.min.css" />
  <script src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
  <script type="text/javascript">
    // Need to bind to mobileinit before jQ mobile library is loaded
    $(document).bind('mobileinit',function(){
      $.mobile.selectmenu.prototype.options.nativeMenu = false;
    });
  </script>
  <script src="http://code.jquery.com/mobile/1.0rc1/jquery.mobile-1.0rc1.min.js"></script>
  <link rel="stylesheet" href="css/styles.css" />
</head> 
<body> 

<div data-role="page" id="event_page">

	<div data-role="header" data-position="fixed">
		<h1>Find Event</h1>
	</div><!-- /header -->

	<div data-role="content">	
    <p></p>
  
	</div><!-- /content -->

	<div data-role="footer" data-position="fixed">
		<div data-role="navbar"> 
			<ul> 
				<li><a href="index.php" data-icon="info">About</a></li> 
				<li><a href="findevent.php" data-icon="star" class="ui-btn-active">Events</a></li> 
				<li><a href="tartans.php" data-icon="grid">Tartans</a></li> 
			</ul> 
		</div><!-- /navbar --> 
	</div><!-- /footer -->
</div><!-- /page -->

</body>
</html>