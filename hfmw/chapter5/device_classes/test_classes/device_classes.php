<?php

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