var checkedModel = {
    Life       : true,
    Career     : true,
    Publication: true,
    Honor      : true,
    Activity   : true,
};

function checkCategory(name, isChecked) {
    checkedModel[name] = isChecked;
    render(checkedModel);
}

function bindCheckbox() {
    $('.list .checkbox').checkbox({
        // Fire on load to set parent value
        fireOnInit : true,
        // Change parent state on each child checkbox change
        onChange: function() {
            var $listGroup      = $(this).closest('.list'),
                $parentCheckbox = $listGroup.closest('.item').children('.checkbox'),
                $checkbox       = $listGroup.find('.checkbox'),
                allChecked      = true,
                allUnchecked    = true
            ;

            // check to see if all other siblings are checked or unchecked
            $checkbox.each(function() {
                if( $(this).checkbox('is checked') ) { allUnchecked = false; }
                else                                 { allChecked   = false; }
            });
        },
        onChecked: function() {
            var isChecked = true;
            var name = $(this).attr('name');
            checkCategory(name, isChecked);
        },
        onUnchecked: function() {
            var isChecked = false;
            var name = $(this).attr('name');
            checkCategory(name, isChecked);
        },
    });
}


$(function() {
    //bindCheckbox();
});

