/*
 * jquery-filestyle
 * http://dev.tudosobreweb.com.br/jquery-filestyle/
 *
 * Copyright (c) 2013 Markus Vinicius da Silva Lima
 * Version 0.1.0
 * Licensed under the MIT license.
 */

(function ($) {
    "use strict";

    var jFilestyle = function (element, options) {
        this.options = options;
        this.$elementFilestyle = [];
        this.$element = $(element);
    };

    Filestyle.prototype = {
        clear: function () {
            this.$element.val('');
            this.$elementFilestyle.find(':text').val('');
        },

        destroy: function () {
            this.$element.removeAttr('style');
            this.$elementFilestyle.remove();
            this.$element.removeData('jfilestyle');
        },

        setButtonText: function (text) {
            this.$elementFilestyle.find('a').html(text);
        },

        setClassButton: function (classes) {
            this.$elementFilestyle.find('a').addClass(classes);
        },

        setClassInput: function (classes) {
            this.$elementFilestyle.find(':text').addClass(classes);
        },

        setClassIcon: function (classes) {
            this.$elementFilestyle.find('i').addClass(classes);
        },

        iconEnable: function () {
            if (!this.options.icon) {
                this.options.icon = true;

                if (this.$elementFilestyle.find('i').length == 1) {
                    this.$elementFilestyle.find('i').show();
                } else {
                    this.$elementFilestyle.find(':text').after('<i class="'+this.options.classIcon+'"></i> ');
                }
            }
        },

        iconDisabled: function () {
            if (this.options.icon) {
                this.options.icon = false;

                this.$elementFilestyle.find('i').hide();
            }
        },

        inputEnable: function () {
            if (!this.options.input) {
                this.options.input = true;

                if (this.$elementFilestyle.find(':text').length == 1) {
                    this.$elementFilestyle.find(':text').show();
                } else {
                    this.$elementFilestyle.find('a').before('<input type="text" class="'+this.options.classInput+'" disabled> ');
                }

                files = $(this)[0].files;
                for (var i = 0; i < files.length; i++)
                    content += files[i].name.split("\\").pop() + ', ';
                
                if (content != '')
                    _self.$elementFilestyle.find(':text').val(content.replace(/\, $/g, ''));
            }
        },

        inputDisabled: function () {
            if (this.options.input) {
                this.options.input = false;

                this.$elementFilestyle.find(':text').hide();
            }
        },

        constructor: function () {
            var _self = this;

            var $jfilestyle = '',
                html = '',
                files = [],
                content = '';

            if (this.options.input) {
                html = '<input type="text" class="'+this.options.classInput+'" disabled> ';
            }

            html += '<a href="#" class="'+this.options.classButton+'">'
                        +(this.options.icon?'<i class="'+this.options.classIcon+'"></i> ':'')+this.options.buttonText+'</a>';

            this.$elementFilestyle = $('<div>'+html+'</div>');

            // hidding input file and add jfilestyle
            this.$element
                .css({'position':'fixed','top':'-500px','left':'-500px'})
                .after(this.$elementFilestyle);

            // Getting input file value
            this.$element.change(function () {
                files = $(this)[0].files;
                for (var i = 0; i < files.length; i++)
                    content += files[i].name.split("\\").pop() + ', ';
                
                if (content != '')
                    _self.$elementFilestyle.find(':text').val(content.replace(/\, $/g, ''));
            });

            // Simulating choose file
            this.$elementFilestyle.find('a').click(function () {
                _self.$element.click();
                return false;
            });
        }
    };

    $.fn.jfilestyle = function (option, value) {
        return this.each(function () {
            var $this = $(this)
              , data = $this.data('jfilestyle')
              , options = $.extend({}, $.fn.jfilestyle.defaults, $this.data(), typeof option == 'object' && option);
            
            if (!data) {
                $this.data('jfilestyle', (data = new jFilestyle(this, options)));
                data.constructor();
            }

            if (typeof option == 'string') data[option](value);
        });
    };

    $.fn.jfilestyle.defaults = {
        buttonText: 'Choose file',
        input: true,
        icon: true,
        classButton: '',
        classInput: '',
        classIcon: ''
    };

})(window.jQuery);
