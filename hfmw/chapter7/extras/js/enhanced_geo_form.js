(function () {
  var $page, $searchForm, $submitButton, $stateFilter;

  $page = $('#event_page');
  if (!$page.data.initialized) {
    $page.live('pagecreate', initGeo);
    $page.data.initialized = true;
  }

  function initGeo() {
    $searchForm = $('#search_form');
    $submitButton = $('#search_submit');
    $stateFilter = $('#state_filter');
    if (navigator.geolocation) {
      initGeoOptions();
    }
  }
  function initGeoOptions() {
    var $latField, $longField, $flipSwitch;
    $flipSwitch = $('<select name="usegeo" id="usegeo" data-role="slider"><option value="off">Off</off><option value="on">On</option></select>').change(toggleLocation);
    $flipSwitch.prependTo($searchForm).wrap('<div data-role="fieldcontain"></div>');
    $flipSwitch.before('<label for="usegeo">Use my Location:</label>');
    $latField = $('<input type="hidden" />').attr({ name : 'latitude', id : 'latitude'})
    $longField = $('<input type="hidden" />').attr({ name: 'longitude', id : 'longitude' })
    $latField.appendTo($searchForm);
    $longField.appendTo($searchForm);          
  }
  function toggleLocation(event) {
    var geoActivated = ($(event.target).val() == 'on') ? true : false;
    if (geoActivated) {
      $submitButton.button('disable');
      $stateFilter.selectmenu('disable');
      $.mobile.showPageLoadingMsg();
      navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    } else {
      $stateFilter.selectmenu('enable');
      $submitButton.button('enable');
    }
  }
  function onGeoSuccess(position) {
    var coordinates = position.coords;
    $('#latitude').val(coordinates.latitude);
    $('#longitude').val(coordinates.longitude);
    $.mobile.hidePageLoadingMsg();
    $submitButton.button('enable');
  }
  function onGeoError(error) {
    $('#usegeo').val('off').trigger('change');
    alert(error.message);
  }
})();