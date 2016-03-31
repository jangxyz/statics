function bindMenuClick() {
    $('.ui.menu > a.item').on('click', function(ev) {
        ev.preventDefault();
        var $el = $(ev.target);

        if ($el.hasClass('disabled')) {
            return;
        }
        if ($el.hasClass('active')) {
            return;
        }

        var className = $el.attr('class').replace(/item/, '').trim();

        //
        $('.ui.menu > .item.active').removeClass('active');
        $el.addClass('active');

        //
        $('.ui.container')
            .removeClass()
            .addClass('ui container').addClass(className+'-container');
    });
}

$(function() {
    bindMenuClick();
});

