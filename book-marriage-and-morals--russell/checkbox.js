
function checkCategory(name, isChecked) {
    checkedModel[name] = isChecked;
    render(checkedModel);
}

function bindCheckbox() {
    $('.list .child.checkbox').checkbox({
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

            // set parent checkbox state, but dont trigger its onChange callback
            if (allChecked)       { $parentCheckbox.checkbox('set checked'); }
            else if(allUnchecked) { $parentCheckbox.checkbox('set unchecked'); }
            else                  { $parentCheckbox.checkbox('set indeterminate'); }
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
    // master checkbox
    $('.ui.master.checkbox').checkbox({
        // check all children
        onChecked: function() {
            var $childCheckbox  = $(this).closest('.item').find('.child-checkbox.list').find('.checkbox');
                $childCheckbox.checkbox('check');
        },
        // uncheck all children
        onUnchecked: function() {
            var $childCheckbox  = $(this).closest('.item').find('.child-checkbox.list').find('.checkbox');
                $childCheckbox.checkbox('uncheck');
        }
    });
}

$(function() {
    //bindCheckbox();
});

