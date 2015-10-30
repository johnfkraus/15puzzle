<?php
class TartanatorEventSearch {
  const EARTH_RADIUS = 3958.76; // miles
  public  $radius;
  private $searchType;
  private $point;
  private $state;
  private $events;
  public  $matchingEvents;
  
  function __construct($all_events, $radius = 25) {
    $this->radius = $radius;
    $this->determineType($_GET);
    $this->events = $all_events;
    $this->matchingEvents = array();
    if ($this->isSearch()) {
      $this->search();
    }
  }
  
  private function determineType($criteria) {
    if (array_key_exists('usegeo', $criteria) && $criteria['usegeo'] == 'on') {
      $this->searchType = 'radius';
      $this->point = array(
        'latitude'  => (float) $criteria['latitude'],
        'longitude' => (float) $criteria['longitude']
      );
    }
    else if (array_key_exists('state_filter', $criteria)) {
      $this->searchType = 'state';
      $this->state = $criteria['state_filter'];
    } else {
      $this->searchType = NULL;
    }
  }
  
  private static function get_distance ($from_pt, $to_pt) {
    $from_pt_lat_rads   = self::to_rads($from_pt['latitude']);
    $to_pt_lat_rads     = self::to_rads($to_pt['latitude']);
    $distance =  self::EARTH_RADIUS * 
           sqrt(pow($from_pt_lat_rads - $to_pt_lat_rads, 2) + pow((self::to_rads($from_pt['longitude']) - self::to_rads($to_pt['longitude'])) * 
           cos(($to_pt_lat_rads + $from_pt_lat_rads) / 2), 2));
    return $distance;
  }
  
  private static function to_rads ($degrees) {
    return $degrees * pi() / 180;
  }
  
  private static function pretty ($number) {
    $pretty =  ($number > 100) ? ">100" : round($number, (int)($number <= 10));
    return $pretty;
  }
  
  public function search() {
    if ($this->isSearch()) {
      foreach($this->events as &$event) {
        $event['distance_formatted'] = '';
        $event['distance'] = 0;
        if ($this->searchType == 'state') {
          if ($event['state'] == $this->state) {
            $this->matchingEvents[] = $event;
          }
        } else if ($this->searchType == 'radius') {
          $event_point = array('latitude' => (float) $event['latitude'], 'longitude' => (float) $event['longitude']);
          $distance = $this->get_distance($this->point, $event_point);
          $event['distance_formatted'] = sprintf('%d miles', self::pretty($distance));
          $event['distance'] = $distance;
          if ($distance <= $this->radius) {
            $this->matchingEvents[] = $event;
          }
        }
      }
    }
  }
  
  public function hasMatchingEvents() {
    if (is_array($this->matchingEvents) && sizeof($this->matchingEvents)) {
      return TRUE;
    }
    return FALSE;
  }
  
  public function getMatchingEvents() {
    if ($this->hasMatchingEvents()) {
      return $this->matchingEvents;
    }
    else {
      return array();
    }
  }
  
  public function isSearch() {
    if ($this->searchType) {
      return TRUE;
    }
    return FALSE;
  }
}