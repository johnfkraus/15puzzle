<?php
require_once('device.php');
/**
 * Does this device's value for the capability $capability match the $value?
 * Use the $comparison operator or default to '===' for comparing the 
 * device's current value to the $value we are testing against.
 *
 * @param string $capability        Name of the capability to test
 * @param string $comparison        Comparison operator
 * @param string $value             The value we want to compare against
 */
function device_match($capability, $comparison, $value) {
  global $device;
  if (!$device) {
    return FALSE;
  }
  $device_value = $device->getCapability($capability);
  switch ($comparison) {
    case '==':
    case '===':
      return ($device_value === $value);
    case '!=':
    case '!==':
      return ($device_value !== $value);
    case '>=':
      return ($device_value >= $value);
    case '<=':
      return ($device_value <= $value);
    case '>':
      return ($device_value > $value);
    case '<':
      return ($device_value < $value);
    case 'LIKE':
      return (strpos($device_value, $value) !== FALSE);
    case 'NOT LIKE':
      return (strpos($device_value, $value) === FALSE);
    default:
      return FALSE;
  }
}

$device_class = NULL;

if (device_match('is_wireless_device', '===', 'false')) {
  $device_class = 'desktop';
}
else if (device_match('https_support', '===', 'false') ||
          device_match('cookie_support', '===', 'false') ||
          device_match('ajax_manipulate_dom', '===', 'false') ||
          device_match('resolution_width', '<', '176')) {
  $device_class = 'unsupported';
}
else if (device_match('is_tablet', '===', 'true')) {
  $device_class = 'tablet';
}
else if (device_match('is_wireless_device', '===', 'true') &&
         device_match('resolution_width', '>=', '320') &&
          ( device_match('mobile_browser', 'LIKE', 'Safari') ||
           device_match('mobile_browser', 'LIKE', 'Android') ))
{
  $device_class = 'higher_mobile';
}
else if (device_match('is_wireless_device', '===', 'true')) {
  $device_class = 'simpler_mobile';       
}
else {
  $device_class = 'desktop';
}