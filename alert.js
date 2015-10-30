window.alert = function (message) {
    jQuery(document.createElement('div'))
        .attr({title: 'Alert', 'class': 'alert'})
        .html(message)
        .dialog({
            buttons: {OK: function () {
                jQuery(this).dialog('close');
            }},
            close: function () {
                jQuery(this).remove();
            },
            draggable: true,
            modal: true,
            resizable: false,
            width: 'auto'
        });
};
jQuery(document).ready(function () {
    //jQuery(function() {
      //  alert("It works!");
    //});
    // Handler for .ready() called.
    alert('This is a test of the <strong>new</strong> alert!');
});
