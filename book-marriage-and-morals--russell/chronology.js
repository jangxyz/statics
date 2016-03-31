
function sortByTime($timeButton, $subjectButton) {
    //
    $('article.content > .chronology > h2').hide();
    $('article.content > .chronology > p').hide();
    $('article.content > .chronology')
        .removeClass().addClass('chronology')
        .addClass('sort-by-time');


    // extract $li to list-by-time
    var $lis = $('.chronology ul li');

    // hide non-dates
    $lis.each(function(i, el) {
        var dateStr = $(el).find('.spanner-dates-date').text();
        if (!dateStr) {
            $(el).hide();
        }
    });

    // sort
    var liEls = _.sortBy($lis, function(el) {
        var dateStr = $(el).find('.spanner-dates-date').text();

        return dateStr;
    });

    $('.chronology ul.list-by-time').append(liEls);
}
function sortBySubject($timeButton, $subjectButton) {
    //
    $('article.content > .chronology > h2').show();
    $('article.content > .chronology > p').show();
    $('article.content > .chronology')
        .removeClass().addClass('chronology')
        .addClass('sort-by-subject');

    // restore $li from list-by-time
    var listMap = {};
    $('.chronology ul').each(function(i, ul) {
        var subject = extractClassname(ul.getAttribute('class'), /subject-index-[0-9]*/);
        listMap[subject] = ul;
    });
    
    // extract
    $('.chronology ul.list-by-time li').each(function(i,li) {
        var $li = $(li);

        // reshow non-dates
        var dateStr = $li.find('.spanner-dates-date').text();
        if (!dateStr) {
            $li.show();
        }

        //
        var subject = extractClassname(li.getAttribute('class'), /subject-index-[0-9]*/);
        var ulEl = listMap[subject];

        console.log($li.text(), ulEl);

        $li.appendTo(ulEl);
    });

    // re-sort
    _.forEach(listMap, function(ul) {
        var $ul = $(ul);
        var liEls = $ul.find('li').toArray()
        liEls = _.sortBy(liEls, function(el) {
            //var index = el.getAttribute('class').replace(/.*(subject-listitem-index-[0-9]*).*/, '');
            var index = extractClassname(el.getAttribute('class'), /subject-listitem-index-[0-9]*/);
            index = parseInt(index.replace(/subject-listitem-index-([0-9]*)/, '$1'));
            return index;
        });

        $ul.append(liEls);
    });
}

function extractClassname(classAttr, target) {
    if (_.isRegExp(target)) {
        target = target.source;
    }

    var pattern = new RegExp(".*(" + target + ").*");
    return classAttr.replace(pattern, '$1');
}

function addSubjectOrderIndex() {
    $('.chronology ul:not(.list-by-time)').each(function(i, ul) {
        var $ul = $(ul);

        $ul.addClass('subject-index-' + i);

        $ul.find('li').each(function(j, li) {
            var $li = $(li);
            $li
                .addClass(['subject-listitem-index-' + j, 'subject-index-' + i].join(' '))
            ;
        });
    });
}

function bindSortOrderButton() {
    var $buttons = $('.sort-order.buttons');

    addSubjectOrderIndex();

    var $timeButton = $buttons.find('.time.button').on('click', function(evt) {
        sortByTime($timeButton, $subjectButton);
        //
        $subjectButton.removeClass('positive');
        $timeButton.addClass('positive');
    });
    var $subjectButton = $buttons.find('.subject.button').on('click', function(evt) {
        sortBySubject($timeButton, $subjectButton);
        //
        $timeButton.removeClass('positive');
        $subjectButton.addClass('positive');
    });
}

$(function() {
    //bindCheckbox();
    bindSortOrderButton();
});


