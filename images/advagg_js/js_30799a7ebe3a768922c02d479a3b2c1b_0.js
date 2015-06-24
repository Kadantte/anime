/* Source and licensing information for the line(s) below can be found at http://beta.animecenter.tv/modules/pathauto/pathauto.js. */
if (Drupal.jsEnabled) {
    $(document).ready(function () {
        if ($("#edit-pathauto-perform-alias").size() && $("#edit-pathauto-perform-alias").attr("checked")) {
            $("#edit-path").attr("disabled", "disabled");
            $("#edit-path-wrapper > div.description").hide(0)
        }
        ;
        $("#edit-pathauto-perform-alias").bind("click", function () {
            if ($("#edit-pathauto-perform-alias").attr("checked")) {
                $("#edit-path").attr("disabled", "disabled");
                $("#edit-path-wrapper > div[class=description]").slideUp('fast')
            } else {
                $("#edit-path").removeAttr("disabled");
                $("#edit-path")[0].focus();
                $("#edit-path-wrapper > div[class=description]").slideDown('fast')
            }
        })
    });
    Drupal.verticalTabs = Drupal.verticalTabs || {};
    Drupal.verticalTabs.path = function () {
        var path = $('#edit-path').val(), automatic = $('#edit-pathauto-perform-alias').attr('checked');
        if (automatic)return Drupal.t('Automatic alias');
        if (path) {
            return Drupal.t('Alias: @alias', {'@alias': path})
        } else return Drupal.t('No alias')
    }
}
;
/* Source and licensing information for the above line(s) can be found at http://beta.animecenter.tv/modules/pathauto/pathauto.js. */
/* Source and licensing information for the line(s) below can be found at http://beta.animecenter.tv/modules/book_manager/book_manager.js. */
Drupal.behaviors.bookManagerPersonalToggle = function () {
    if ($('#edit-book-bid').val() == 'new' || $('#edit-book-bid').val() == Drupal.settings.book_manager.nid) {
        $('#edit-book-ispersonal-wrapper').css('display', 'inline')
    } else $('#edit-book-ispersonal-wrapper').css('display', 'none')
};
Drupal.behaviors.bookManagerBookChange = function () {
    Drupal.behaviors.bookManagerPersonalToggle();
    $('#edit-book-bid').change(Drupal.behaviors.bookManagerPersonalToggle)
};
/* Source and licensing information for the above line(s) can be found at http://beta.animecenter.tv/modules/book_manager/book_manager.js. */
/* Source and licensing information for the line(s) below can be found at http://beta.animecenter.tv/modules/filefield/filefield.js. */
Drupal.behaviors.filefieldValidateAutoAttach = function (context) {
    $("input[type=file]", context).bind('change', Drupal.filefield.validateExtensions)
};
Drupal.behaviors.filefieldButtons = function (context) {
    $('input.form-submit', context).bind('mousedown', Drupal.filefield.disableFields);
    $('div.filefield-element input.form-submit', context).bind('mousedown', Drupal.filefield.progressBar)
};
Drupal.behaviors.filefieldPreviewLinks = function (context) {
    $('div.filefield-element div.widget-preview a', context).click(Drupal.filefield.openInNewWindow).attr('target', '_blank')
};
Drupal.behaviors.filefieldAdmin = function (context) {
    var $listField = $('div.filefield-list-field', context);
    if ($listField.size())$listField.find('input').change(function () {
        if (this.checked)if (this.value == 0) {
            $('#edit-list-default-wrapper').css('display', 'none')
        } else $('#edit-list-default-wrapper').css('display', 'block')
    }).change()
};
Drupal.filefield = {
    validateExtensions: function (event) {
        $('.file-upload-js-error').remove();
        var fieldName = this.name.replace(/^files\[([a-z0-9_]+)_\d+\]$/, '$1'), extensions = '';
        if (Drupal.settings.filefield && Drupal.settings.filefield[fieldName])extensions = Drupal.settings.filefield[fieldName].replace(/[, ]+/g, '|');
        if (extensions.length > 1 && this.value.length > 0) {
            var extensionPattern = new RegExp('\\.(' + extensions + ')$', 'gi');
            if (!extensionPattern.test(this.value)) {
                var error = Drupal.t("The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.", {
                    '%filename': this.value,
                    '%extensions': extensions.replace(/\|/g, ', ')
                });
                $(this).parent().before('<div class="messages error file-upload-js-error">' + error + '</div>');
                this.value = '';
                return false
            }
        }
    }, disableFields: function (event) {
        var clickedButton = this;
        if (!$(clickedButton).hasClass('ahah-processed'))return;
        var $enabledFields = [];
        if ($(this).parents('div.filefield-element').size() > 0) {
            $enabledFields = $(this).parents('div.filefield-element').find('input.form-file')
        } else if ($(this).parents('div.content-add-more').size() > 0)$enabledFields = $(this).parent().parent().find('input.form-file');
        var $disabledFields = $('div.filefield-element input.form-file').not($enabledFields);
        $disabledFields.attr('disabled', 'disabled');
        setTimeout(function () {
            $disabledFields.removeAttr('disabled')
        }, 1e3)
    }, progressBar: function (event) {
        var clickedButton = this, $progressId = $(clickedButton).parents('div.filefield-element').find('input.filefield-progress');
        if ($progressId.size()) {
            var originalName = $progressId.attr('name');
            $progressId.attr('name', originalName.match(/APC_UPLOAD_PROGRESS|UPLOAD_IDENTIFIER/)[0]);
            setTimeout(function () {
                $progressId.attr('name', originalName)
            }, 1e3)
        }
        ;
        setTimeout(function () {
            $(clickedButton).parents('div.filefield-element').find('div.ahah-progress-bar').slideDown()
        }, 500)
    }, openInNewWindow: function (event) {
        window.open(this.href, 'filefieldPreview', 'toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=500,height=550');
        return false
    }
};
/* Source and licensing information for the above line(s) can be found at http://beta.animecenter.tv/modules/filefield/filefield.js. */