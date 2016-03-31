function renderForTitle(value) {
    if (value === '전체') {
        $('.summary h2,.summary p').show();
        return;
    }

    // hide all
    $('.summary h2,.summary p').hide();

    function displayParagraphsAfterH2($h2, display) {
        $h2.css('display', display);
        $h2.nextAll('p').css('display', display);
    }

    //
    var $h2 = $('h2.' + value);
    displayParagraphsAfterH2($h2, 'block');

    var $next = $h2.nextAll('h2');
    displayParagraphsAfterH2($next, 'none');
}

function bindDropDown(contents) {
    var $dropdown = $('.selection.dropdown');

    //$dropdown.find('> .menu .item').each(function(i, el) {
    //    var itemText = $(el).text().trim();
    //    for (var j = 0; j < keys.length; j++) {
    //        if ( itemText === keys[j].trim() ) {
    //            $(el).removeClass('disabled');
    //            break;
    //        }
    //    }
    //});
    
    $dropdown.dropdown({
        action: function(text, value) {
            renderForTitle(value);
            //
            $dropdown.find('.default.text').text(text);
            $dropdown.dropdown('hide');
        },
    });
}


$(function() {
	//
    var $dropdownMenu = $('.dropdown.summary .menu');
    $('.summary:not(".container") h2').each(function(i, el) {
        var $el = $(el);

        var title     = $el.text();
        var className = title.replace(/[,]/, '').replace(/.*\(/, '').replace(/\).*/, '').replace(/ /g, '-');
        $el.addClass(className);

        //
        var $menuItem = $('<div class="item" />')
            .attr('data-value', className)
            .text((i) + '. ' + title)
        ;

        //
        var hasContent = _.some(summary, function(sum) {
            return sum[title];
        });
        if (!hasContent) {
            $menuItem
                .attr('disabled', true)
                .addClass('disabled')
            ;
        }

        $menuItem.appendTo($dropdownMenu);
    });

    var contents = _.flatten(_.map(summary, function(sum) { 
        return _.keys(sum) 
    }));
    bindDropDown(contents);
});

