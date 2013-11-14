(function() {

    var status = (new function(){});
    status.log = function(text) {
        //var args = Array.prototype.slice.apply(arguments);

        var $li = $('<li>' + text + '</li>');

        $li.appendTo( $("ul#status") );
    };

    $(function() {

        // init
        var $status = $("ul#status");
        if ($status.length === 0) {
            $status = $("<ul id='status.folded'></ul>").appendTo($("body"));
        }
        $status.addClass('is-folded');
        $status.removeClass('is-exanded');


        $status.on('click', function() {
            var prevHeight = $status.height();
            $status.toggleClass('is-folded');
            $status.toggleClass('is-expanded');

            var height = $status.height() + 100;

            var parentMarginBottom = $status.parent()[0].style.marginBottom || "0px";
            parentMarginBottom = parseInt(parentMarginBottom.replace(/px$/, ''), 10);
            $status.parent().css('margin-bottom', (parentMarginBottom - prevHeight + height) + 'px');
            console.log(prevHeight, height, parentMarginBottom);
        });


    });


    window._status = status;
})();
