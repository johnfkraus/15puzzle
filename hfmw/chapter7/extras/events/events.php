<!DOCTYPE html> 
<html> 
  <head> 
  <meta charset="UTF-8" />
  <title>Events</title> 
  
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
    <div data-role="header" data-position="fixed">
      <a href="tartans.html" data-rel="back" data-icon="back" data-role="button">Back</a>
      <h1>Events</h1>
    </div><!-- /header -->
  
    <div data-role="content">
      <ul data-role="listview" data-inset="true">
        <?php

        require_once(dirname(__FILE__) . '/inc/event_list.inc');
        require_once(dirname(__FILE__) . '/inc/event_search.inc');

        $search = new TartanatorEventSearch($events);
        if ($search->isSearch()): ?>
          <li data-role="list-divider"><h3>Matching Events</h3></li>
        <?php endif; ?>
        <?php if ($search->hasMatchingEvents()): ?>
          <? foreach($search->getMatchingEvents() as $event): ?>
          <li><h3><?php print $event['title']; ?></h3>
          <p><?php print $event['address']; ?><br />
          <strong><?php print $event['city'] ?>, <?php print $event['state']; ?></strong> <?php print $event['postal_code']; ?><br />
          <?php print $event['distance_formatted']; ?></p>
          <p class="ui-li-aside"><strong><?php print $event['date']; ?></strong></p>
          </li>
          <?php endforeach; ?>
        <?php endif; ?>
        <?php if ($search->isSearch() && !$search->hasMatchingEvents()): ?>
          <li><strong>Sorry, no matching events found!</strong></li>
        <?php endif; ?>
      </ul>
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
