/*
 * bootstrap-filestyle
 * http://markusslima.github.com/bootstrap-filestyle/
 *
 * Copyright (c) 2013 Markus Vinicius da Silva Lima
 * Version 1.0.0
 * Licensed under the MIT license.
 */


/*

methods {
    destroy: string,
    clear: string,
    getFile: string,
    setFile: string,

    classButton: string,
    classInput: string,
    classIcon: string,
    icon: bool,
    button: bool,
    bootstrap: bool
}

*/
(function ($) {
    "use strict";

    $.fn.filestyle = function (options) {
        if (typeof options === 'object' || typeof options === 'undefined'){

            var defaults = {
                buttonText: 'Choose file',
                input:  true,
                icon: true,
                button: true,
                bootstrap: false,
                classButton: '',
                classInput: '',
                classIcon: ''
            };

            var options = $.extend(defaults, options);

            return this.each(function () {

                var $this = $(this),
                    html = '',
                    filestyle = ''
                    time = new Date().getTime();

                if (!$this.data('filestyle')) {

                    //var parent = $this.parents(".control-group");

                    /*if (!parent.length) {
                        parent = $('<div></div>');
                        $this.before(parent);
                        parent.append($this);
                    }*/

                    //parent.addClass("input-append");

                    if (options.input) {
                        html = '<input type="text" '
                                    + ' class="' + options.classInput + '" '
                                    + (options.button ? ' disabled>': '>');
                    }

                    if (options.button) {
                        html += '<a href="#" class="'+options.classButton+'">'
                                    + (options.icon ? '<i class="'+options.classIcon+'"></i> ' : '')
                                    + options.buttonText
                              + '</a>'
                    }

                    $this.css({'position':'fixed','top':'-500px','left':'-500px'}).after('<div id="filestyle-'+time+'">' + html + '</div>');

                    filestyle = $('#filestyle-'+time+);

                    $this.change(function () {
                        if (options.input) {
                            alert($(this).val());
                            filestyle.find(':text').val($(this).val().split("\\").pop());
                        }
                    });

                    filestyle.find('a').click(function () {
                        $this.click();
                        return false;
                    });
                }
            });
        } else if (typeof options === 'string'){
            return this.each(function () {
                var $this = $(this);
                if ($this.data('filestyle') === true && options === 'clear') {
                    $this.parent().children(':text').val('');
                    $this.val('');
                } else {
                    window.console.error('Method filestyle not defined!');
                }
            });
        }
    };
}(jQuery));
