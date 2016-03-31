$(function() {
    // open detail description
    $('.chronology li p:not(:last-of-type)').each(function(i, el) {
        var $el = $(el);

        $el.append(
            $('<button />').addClass('detail ui icon button circular basic mini')
            .append('<i class="icon angle double down"></i>')
            .on('click', function(evt) {
                var $hiddenP = $el.nextAll('p')

                $hiddenP.addClass('sub-description');
                
                //
                if ($hiddenP.is(':visible')) {
                    $hiddenP.hide();
                } else {
                    $hiddenP.show();
                }
            })
        );

    });
});

