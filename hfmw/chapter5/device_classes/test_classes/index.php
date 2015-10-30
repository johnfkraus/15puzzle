<?php require_once('device.php'); ?>
<?php require_once('device_classes.php'); ?>
<!DOCTYPE html>
<html>
<head>
  <title>Device Class Testing</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" type="text/css" href="styles.css" />
</head>
<body>
<h1>Device Class Testing</h1>
<div id="testform">
  <form method="post" action="<?php print $_SERVER['PHP_SELF']; ?>" id="useragentform">
    <p>Test this user agent string:</p>
    <input type="text" name="useragent" id="useragent_field" value="<?php print $user_agent; ?>" /><br />
    <input type="submit" name="submit" value="Test User Agent" id="submit" />
  </form>
</div>

<div id="devicedata">
  <h2>Device Class Data</h2>
  <p><strong>Device ID</strong>: '<?php print $device->id; ?>'</p>
  <p><strong>Device Class:</strong> <?php if(isset($device_class)): ?>'<?php print $device_class; ?>'<?php endif; ?></p>

</div>
</body>
</html>