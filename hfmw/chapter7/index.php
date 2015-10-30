<!DOCTYPE html> 
<html> 
	<head> 
	<meta charset="UTF-8" />
	<title>The Tartanator</title> 

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

<div data-role="page">

	<div data-role="header"> 
		<h1>The Tartanator</h1> 
	</div><!-- /header --> 
   <div data-role="header" data-theme="b" class="forrit">Bring forrit the tartan!</div>

	<div data-role="content">	
    <p>The Tartanator is a community-built association of groups, businesses and individuals bent on keeping the Scottish heritage alive overseas by promoting the understanding and enjoyment of <strong>tartans</strong>.</p>
	</div><!-- /content -->

	<div data-role="footer" data-position="fixed">
		<div data-role="navbar"> 
			<ul> 
				<li><a href="index.php" data-icon="info" class="ui-btn-active">About</a></li> 
				<li><a href="findevent.php" data-icon="star">Events</a></li> 
				<li><a href="tartans.php" data-icon="grid">Tartans</a></li> 
			</ul> 
		</div><!-- /navbar --> 
	</div><!-- /footer -->
</div><!-- /page -->

</body>
</html>