/*
 * jquery-filestyle
 * doc: http://markusslima.github.io/jquery-filestyle/
 * github: https://github.com/markusslima/jquery-filestyle
 *
 * Copyright (c) 2015 Markus Vinicius da Silva Lima
 * Version 1.4.0
 * Licensed under the MIT license.
 */
(function ($) {
    "use strict";
    
    var nextId = 0;
    
    var JFilestyle = function (element, options) {
        this.options = options;
        this.$elementjFilestyle = [];
        this.$element = $(element);
    };

    JFilestyle.prototype = {
        clear: function () {
            this.$element.val('');
            this.$elementjFilestyle.find(':text').val('');
        },

        destroy: function () {
            this.$element
                .removeAttr('style')
                .removeData('jfilestyle')
                .val('');
            this.$elementjFilestyle.remove();
        },
        
        disabled : function(value) {
			if (value === true) {
				if (!this.options.disabled) {
					this.$element.attr('disabled', 'true');
					this.$elementjFilestyle.find('label').attr('disabled', 'true');
					this.options.disabled = true;
				}
			} else if (value === false) {
				if (this.options.disabled) {
					this.$element.removeAttr('disabled');
					this.$elementjFilestyle.find('label').removeAttr('disabled');
					this.options.disabled = false;
				}
			} else {
				return this.options.disabled;
			}
		},
		
		buttonBefore : function(value) {
			if (value === true) {
				if (!this.options.buttonBefore) {
					this.options.buttonBefore = true;
					if (this.options.input) {
						this.$elementjFilestyle.remove();
						this.constructor();
						this.pushNameFiles();
					}
				}
			} else if (value === false) {
				if (this.options.buttonBefore) {
					this.options.buttonBefore = false;
					if (this.options.input) {
						this.$elementjFilestyle.remove();
						this.constructor();
						this.pushNameFiles();
					}
				}
			} else {
				return this.options.buttonBefore;
			}
		},

        icon: function (value) {
            if (value === true) {
                if (!this.options.icon) {
                    this.options.icon = true;
                    this.$elementjFilestyle.find('label').prepend(this.htmlIcon());
                }
            } else if (value === false) {
                if (this.options.icon) {
                    this.options.icon = false;
                    this.$elementjFilestyle.find('i').remove();
                }
            } else {
                return this.options.icon;
            }
        },

        input: function (value) {
            if (value === true) {
                if (!this.options.input) {
                    this.options.input = true;
                    this.$elementjFilestyle.prepend(this.htmlInput());

                    this.$elementjFilestyle.find('.count-jfilestyle').remove();

					this.pushNameFiles();
                }
            } else if (value === false) {
                if (this.options.input) {
                    this.options.input = false;
                    this.$elementjFilestyle.find(':text').remove();
                    var files = this.pushNameFiles();
					if (files.length > 0) {
						this.$elementjFilestyle.find('label').append(' <span class="count-jfilestyle">' + files.length + '</span>');
					}
                }
            } else {
                return this.options.input;
            }
        },

        buttonText: function (value) {
            if (value !== undefined) {
                this.options.buttonText = value;
                this.$elementjFilestyle.find('label span').html(this.options.buttonText);
            } else {
                return this.options.buttonText;
            }
        },

        iconName: function (value) {
            if (value !== undefined) {
                this.options.iconName = value;
                if (this.options.theme.search(/blue|green|red|orange|black/i) !== -1) {
                    this.$elementjFilestyle.find('label').find('i').attr({'class': 'icon-white '+this.options.iconName});
                } else {
                    this.$elementjFilestyle.find('label').find('i').attr({'class': this.options.iconName});
                }
            } else {
                return this.options.iconName;
            }
        },

        size: function (value) {
            if (value !== undefined) {
                this.options.size = value;
                this.$elementjFilestyle.find(':text').css('width', this.options.size);
            } else {
                return this.options.size;
            }
        },

        htmlIcon: function () {
            if (this.options.icon) {
                var colorIcon = '';
                if (this.options.theme.search(/blue|green|red|orange|black/i) !== -1) {
                    colorIcon = ' icon-white ';
                }

                return '<i class="'+colorIcon+this.options.iconName+'"></i> ';
            } else {
                return '';
            }
        },

        htmlInput: function () {
            if (this.options.input) {
                return '<input type="text" style="width:'+this.options.size+'" disabled> ';
            } else {
                return '';
            }
        },
        
        // puts the name of the input files
        // return files
		pushNameFiles : function() {
			var content = '', files = [];
			if (this.$element[0].files === undefined) {
				files[0] = {
					'name' : this.$element.value
				};
			} else {
				files = this.$element[0].files;
			}

			for (var i = 0; i < files.length; i++) {
				content += files[i].name.split("\\").pop() + ', ';
			}

			if (content !== '') {
				this.$elementjFilestyle.find(':text').val(content.replace(/\, $/g, ''));
			} else {
				this.$elementjFilestyle.find(':text').val('');
			}
			
			return files;
		},

        constructor: function () {
            var _self = this,
                html = '',
                id = _self.$element.attr('id'),
                $label,
                files = [];

            if (id === '' || !id) {
                id = 'jfilestyle-'+$('.jfilestyle').length;
                _self.$element.attr({'id': id});
            }
            
            html = '<span class="focus-jfilestyle">'+
                     '<label for="'+id+'" ' + (_self.options.disabled ? 'disabled="true"' : '') + '>'+
                       _self.htmlIcon()+
                      '<span>'+_self.options.buttonText+'</span>'+
                     '</label>'+
                   '</span>';
            
            if (_self.options.buttonBefore === true) {
	            html = html + _self.htmlInput();
            } else {
	            html = _self.htmlInput() + html;
            }

            _self.$elementjFilestyle = $('<div class="jfilestyle ' + (_self.options.input?'jfilestyle-corner':'')+' ' + this.options.theme + ' ' + (this.options.buttonBefore ? ' jfilestyle-buttonbefore' : '') + '">'+html+'</div>');
            _self.$elementjFilestyle.find('.focus-jfilestyle')
                .attr('tabindex', "0")
                .keypress(function (e) {
                    if (e.keyCode === 13 || e.charCode === 32) {
                        _self.$elementjFilestyle.find('label').click();
                        return false;
                    }
                });

            // hidding input file and add filestyle
            _self.$element
                .css({'position': 'absolute', 'clip': 'rect(0px 0px 0px 0px)'})
                .attr('tabindex', "-1")
                .after(_self.$elementjFilestyle);
			
			if (_self.options.disabled) {
				_self.$element.attr('disabled', 'true');
			}
			
            // Getting input file value
            _self.$element.change(function () {
            	var files = _self.pushNameFiles();
            	
            	if (_self.options.input == false) {
					if (_self.$elementjFilestyle.find('.count-jfilestyle').length == 0) {
						_self.$elementjFilestyle.find('label').append(' <span class="count-jfilestyle">' + files.length + '</span>');
					} else if (files.length == 0) {
						_self.$elementjFilestyle.find('.count-jfilestyle').remove();
					} else {
						_self.$elementjFilestyle.find('.count-jfilestyle').html(files.length);
					}
				} else {
					_self.$elementjFilestyle.find('.count-jfilestyle').remove();
				}
            });

            // Check if browser is Firefox
            if (window.navigator.userAgent.search(/firefox/i) > -1) {
                // Simulating choose file for firefox
                this.$elementjFilestyle.find('label').click(function () {
                    _self.$element.click();
                    return false;
                });
            }
        }
    };

    var old = $.fn.jfilestyle;

    $.fn.jfilestyle = function (option, value) {
        var get = '',
            element = this.each(function () {
                if ($(this).attr('type') === 'file') {
                    var $this = $(this),
                        data = $this.data('jfilestyle'),
                        options = $.extend({}, $.fn.jfilestyle.defaults, option, typeof option === 'object' && option);

                    if (!data) {
                        $this.data('jfilestyle', (data = new JFilestyle(this, options)));
                        data.constructor();
                    }

                    if (typeof option === 'string') {
                        get = data[option](value);
                    }
                }
            });

        if (typeof get !== undefined) {
            return get;
        } else {
            return element;
        }
    };

    $.fn.jfilestyle.defaults = {
        'buttonText': 'Choose file',
        'input': true,
        'icon': true,
        'disabled': false,
        'buttonBefore': false,
        'size': '200px',
        'iconName': 'icon-folder-open',
        'theme': ''
    };

    $.fn.jfilestyle.noConflict = function () {
        $.fn.jfilestyle = old;
        return this;
    };

    $(function() {
        // Data attributes register
        $('.jfilestyle').each(function () {
            var $this = $(this),
                options = {
                    'buttonText': $this.attr('data-buttonText'),
                    'input': $this.attr('data-input') === 'false' ? false : true,
                    'icon': $this.attr('data-icon') === 'false' ? false : true,
                    'disabled': $this.attr('data-disabled') === 'true' ? true : false,
                    'buttonBefore': $this.attr('data-buttonBefore') === 'true' ? true : false,
                    'size': $this.attr('data-size'),
                    'iconName': $this.attr('data-iconName'),
                    'theme': $this.attr('data-theme')
                };
    
            $this.jfilestyle(options);
        });
    });
})(window.jQuery);