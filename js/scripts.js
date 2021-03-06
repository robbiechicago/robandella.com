$(document).ready(function() {

    "use strict";

    // Smooth scroll to inner links

    $('.inner-link').smoothScroll({
        offset: -59,
        speed: 800
    });

    // Add scrolled class to nav

    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('nav').addClass('scrolled');
        } else {
            $('nav').removeClass('scrolled');
        }
    });

    // Set nav container height for fixed nav

    if (!$('nav').hasClass('transparent')) {
        $('.nav-container').css('min-height', $('nav').outerHeight());
    }

    // Mobile toggle

    $('.mobile-toggle').click(function() {
        $('nav').toggleClass('nav-open');
    });

    $('.menu li a').click(function() {
        if ($(this).closest('nav').hasClass('nav-open')) {
            $(this).closest('nav').removeClass('nav-open');
        }
    });

    // TweenMAX Scrolling override on Windows for a smoother experience

    if (navigator.appVersion.indexOf("Win") != -1) {
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            $(function() {

                var $window = $(window);
                var scrollTime = 0.4;
                var scrollDistance = 350;

                $window.on("mousewheel DOMMouseScroll", function(event) {

                    event.preventDefault();

                    var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
                    var scrollTop = $window.scrollTop();
                    var finalScroll = scrollTop - parseInt(delta * scrollDistance);

                    TweenMax.to($window, scrollTime, {
                        scrollTo: {
                            y: finalScroll,
                            autoKill: true
                        },
                        ease: Power1.easeOut,
                        overwrite: 5
                    });

                });
            });
        }
    }

    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', '50% 50%');
    });

    // Fade in background images

    setTimeout(function() {
        $('.background-image-holder').each(function() {
            $(this).addClass('fadeIn');
        });
        $('.header.fadeContent').each(function() {
            $(this).addClass('fadeIn');
        });
    }, 200);


    // Parallax scrolling

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        if (window.requestAnimationFrame) {
            parallaxBackground();
            $(window).scroll(function() {
                requestAnimationFrame(parallaxBackground);
            });
        }
    } else {
        $('.parallax').removeClass('parallax');
    }

    // Image fade on story 2 element

    $('.story-2 img').mouseenter(function() {
        $(this).removeClass('fade');
        $(this).siblings().addClass('fade');
    });

    $('.story-2 img').mouseleave(function() {
        $(this).closest('.row').find('img').removeClass('fade');
    });


    // Sliders

    $('.image-slider').flexslider({
        directionNav: false
    });

    // Radio box controls

    $('.radio-holder').click(function() {
        $(this).siblings().find('input').prop('checked', false);
        $(this).find('input').prop('checked', true);
        $(this).closest('.radio-group').find('.radio-holder').removeClass('checked');
        $(this).addClass('checked');
    });

    // $('form input[type="radio"]').each(function() {
    //     var valueText = $(this).closest('.radio-holder').find('span').text();
    //     $(this).attr('value', convertToSlug(valueText));
    // });
    //
    // $('form input[type="text"]').each(function() {
    //     var attrText = $(this).attr('placeholder');
    //     $(this).attr('name', convertToSlug(attrText));
    // });

    // Contact form code

    // $('form.formttttt-email').submit(function(e) {
    //
    //     console.log('hhishihish')
    //     // return false so form submits through jQuery rather than reloading page.
    //     if (e.preventDefault) e.preventDefault();
    //     else e.returnValue = false;
    //
    //     var thisForm = $(this).closest('form.form-email'),
    //         error = 0,
    //         originalError = thisForm.attr('original-error'),
    //         loadingSpinner, iFrame, userEmail, userFullName, userFirstName, userLastName;
    //
    //     // Mailchimp/Campaign Monitor Mail List Form Scripts
    //     iFrame = $(thisForm).find('iframe.mail-list-form');
    //
    //     if ((iFrame.length) && (typeof iFrame.attr('srcdoc') !== "undefined") && (iFrame.attr('srcdoc') !== "")) {
    //
    //         userEmail = $(thisForm).find('.signup-email-field').val();
    //         userFullName = $(thisForm).find('.signup-name-field').val();
    //         userFirstName = $(thisForm).find('.signup-first-name-field').val();
    //         userLastName = $(thisForm).find('.signup-last-name-field').val();
    //
    //         // validateFields returns 1 on error;
    //         if (validateFields(thisForm) !== 1) {
    //             console.log('Mail list signup form validation passed.');
    //             console.log(userEmail);
    //             console.log(userLastName);
    //             console.log(userFirstName);
    //             console.log(userFullName);
    //
    //             iFrame.contents().find('#mce-EMAIL, #fieldEmail').val(userEmail);
    //             iFrame.contents().find('#mce-LNAME, #fieldLastName').val(userLastName);
    //             iFrame.contents().find('#mce-FNAME, #fieldFirstName').val(userFirstName);
    //             iFrame.contents().find('#mce-FNAME, #fieldName').val(userFullName);
    //             iFrame.contents().find('form').attr('target', '_blank').submit();
    //         }
    //     } else {
    //
    //         if (typeof originalError !== typeof undefined && originalError !== false) {
    //             thisForm.find('.form-error').text(originalError);
    //         }
    //
    //
    //         error = validateFields(thisForm);
    //
    //
    //         if (error === 1) {
    //             $(this).closest('form').find('.form-error').fadeIn(200);
    //             setTimeout(function() {
    //                 $(thisForm).find('.form-error').fadeOut(500);
    //             }, 3000);
    //         } else {
    //             // Hide the error if one was shown
    //             $(this).closest('form').find('.form-error').fadeOut(200);
    //             // Create a new loading spinner while hiding the submit button.
    //             loadingSpinner = jQuery('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
    //             $(thisForm).find('input[type="submit"]').hide();
    //
    //             jQuery.ajax({
    //                 type: "POST",
    //                 url: "mail/mail.php",
    //                 data: thisForm.serialize(),
    //                 success: function(response) {
    //                     // Swiftmailer always sends back a number representing numner of emails sent.
    //                     // If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
    //                     $(thisForm).find('.form-loading').remove();
    //                     $(thisForm).find('input[type="submit"]').show();
    //                     if ($.isNumeric(response)) {
    //                         if (parseInt(response) > 0) {
    //                             thisForm.find('.form-success').fadeIn(1000);
    //                             thisForm.find('.form-error').fadeOut(1000);
    //                             setTimeout(function() {
    //                                 thisForm.find('.form-success').fadeOut(500);
    //                             }, 5000);
    //                         }
    //                     }
    //                     // If error text was returned, put the text in the .form-error div and show it.
    //                     else {
    //                         // Keep the current error text in a data attribute on the form
    //                         thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
    //                         // Show the error with the returned error text.
    //                         thisForm.find('.form-error').text(response).fadeIn(1000);
    //                         thisForm.find('.form-success').fadeOut(1000);
    //                     }
    //                 },
    //                 error: function(errorObject, errorText, errorHTTP) {
    //                     // Keep the current error text in a data attribute on the form
    //                     thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
    //                     // Show the error with the returned error text.
    //                     thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
    //                     thisForm.find('.form-success').fadeOut(1000);
    //                     $(thisForm).find('.form-loading').remove();
    //                     $(thisForm).find('input[type="submit"]').show();
    //                 }
    //             });
    //         }
    //     }
    //     return false;
    // });

    // $('.validate-required, .validate-email').on('blur change', function() {
    //     validateFields($(this).closest('form'));
    // });

    // $('form').each(function() {
    //     if ($(this).find('.form-error').length) {
    //         $(this).attr('original-error', $(this).find('.form-error').text());
    //     }
    // });

    // function validateFields(form) {
    //     var name, error, originalErrorMessage;
    //
    //     $(form).find('.validate-required[type="checkbox"]').each(function() {
    //         if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
    //             error = 1;
    //             name = $(this).attr('name').replace('[]', '');
    //             form.find('.form-error').text('Please tick at least one ' + name + ' box.');
    //         }
    //     });
    //
    //     $(form).find('.validate-required').each(function() {
    //         if ($(this).val() === '') {
    //             $(this).addClass('field-error');
    //             error = 1;
    //         } else {
    //             $(this).removeClass('field-error');
    //         }
    //     });
    //
    //     $(form).find('.validate-email').each(function() {
    //         if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
    //             $(this).addClass('field-error');
    //             error = 1;
    //         } else {
    //             $(this).removeClass('field-error');
    //         }
    //     });
    //
    //     if (!form.find('.field-error').length) {
    //         form.find('.form-error').fadeOut(1000);
    //     }
    //
    //     return error;
    // }

    $('#rsvp-submit').on('click' , function(e) {
        e.preventDefault();

        let email = $('#rsvp-form :input[name=email]').val();
        let guests = [];
        $('#rsvp-form :input[type=radio]:checked').each(function() {
            let obj = {
                id: $(this).data('id'),
                attending: $(this)[0].value,
            }
            guests.push(obj);
        })
        console.log(guests)
        $('#rsvp-form :input[name=dietry]').each(function() {
            let id = $(this).data('id');
            let val = $(this)[0].value;
            guests.find(el => el.id === id).dietry = val;
        })
        console.log(guests)
        let songs = $('#rsvp-form :input[name=songs]').val();

        let data = {
            hash: getUrlVars()['hash'],
            email: email,
            songs: songs,
            guests: guests,
        }

        console.log(data);

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: "POST",
            url: "home/rsvp",
            data: data,
            success: function(response) {
                console.log(response)
                $('.form-success').show();
            },
            error: function(errorObject, errorText, errorHTTP) {
                console.log('oh');
            }
        })

    })


});

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

function parallaxBackground() {
    $('.parallax').each(function() {
        var element = $(this);
        var scrollTop = $(window).scrollTop();
        var scrollBottom = scrollTop + $(window).height();
        var elemTop = element.offset().top;
        var elemBottom = elemTop + element.outerHeight();

        if ((scrollBottom > elemTop) && (scrollTop < elemBottom)) {
            if (element.is('section:first-of-type')) {
                var value = (scrollTop / 7);
                $(element).find('.background-image-holder').css({
                    transform: 'translateY(' + value + 'px)'
                });
            } else {
                var value = ((scrollBottom - elemTop) / 7);
                $(element).find('.background-image-holder').css({
                    transform: 'translateY(' + value + 'px)'
                });
            }

        }
    });
}

