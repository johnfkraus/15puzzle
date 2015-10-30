
window.old_alert = window.alert;
window.alert = function (message, fallback) {
    if (fallback) {
        old_alert(message);
        return;
    }
    $jq(document.createElement('div'))
        .attr({title: 'Alert', 'class': 'alert'})
        .html(message)
        .dialog({
            buttons: {OK: function () {
                $jq(this).dialog('close');
            }},
            close: function () {
                $jq(this).remove();
            },
            draggable: true,
            modal: true,
            resizable: false,
            width: 'auto'
        });
};
$jq(document).ready(function () {
// Handler for .ready() called.
    var $jq = jQuery.noConflict(true);
    alert('This is a <strong>new</strong> alert!');
});
