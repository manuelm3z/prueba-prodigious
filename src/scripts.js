$(document).ready(function () {
    new WOW().init();
    //post
    $.ajax({
        url: "data.json"
    }).done(function (data) {
        if (data.people.length) {
            var long = data.people.length -1;
            for (var i = 0; i <= long; i++) {
                var element = document.createElement('a');
                element = $(element).addClass('list-group-item').text(data.people[i].name).data('people', i).attr('href', '#');
                $('.list-group.post-list').append(element);
                $('.list-group.profile-list').append(element.clone(true));
            }
            loadPost(data.people[0]);
            loadProfile(data.people[0]);
        } else {
            $('.widget.post').removeClass('loading');
            $('.widget.profile').removeClass('loading');
        }
    });

    $('.list-group.post-list').on('click', 'a', function (event) {
        event.preventDefault();
        var num = $(this).data().people;
        var body = $('.widget.post').addClass('loading');
        $.ajax({
            url: "data.json"
        }).done(function (data) {
            if (data.people.length) {
                loadPost(data.people[num]);
            } else {
                body.removeClass('loading');
            }
        });
    });

    function loadPost(post) {
        var body = $('.widget.post'), banner = false, profile = false;
        if (post.banner.length > 0) {
            $('<img/>').attr('src', post.banner).on('load', function () {
                $(this).remove();
                body.children('.header').css('background', 'url(' + post.banner + ')');
                banner = true;
                if (profile === true) {
                    body.removeClass('loading');
                }
            });
        } else {
            body.children('.header').attr('style','');
            banner = true;
            if (profile === true) {
                body.removeClass('loading');
            }
        }
        var info = body.children('.info')
        if (post.picture.length > 0) {
            $('<img/>').attr('src', post.picture).on('load', function () {
                $(this).remove();
                info.children('.picture').children('div').children('.img').css('background', 'url(' + post.picture + ')');
                profile = true;
                if (banner === true) {
                    body.removeClass('loading');
                }
            });
        } else {
            body.children('.picture').children('div').children('.img').attr('style','');
            profile = true;
            if (banner === true) {
                body.removeClass('loading');
            }
        }
        var bio = info.children('.bio')
        if (post.name.length > 0) {
            bio.children('h3').text(post.name);
        }
        if (post.bio.length > 0) {
            bio.children('p').text(post.bio);
        } else {
            bio.children('p').text('');
        }
        var footer = body.children('.footer');
        if (post.views.length > 0) {
            footer.children('.views').children('span').text(post.views); 
        }
        if (post.comments.length > 0) {
            footer.children('.comments').children('span').text(post.comments);
        }
        if (post.likes.length > 0) {
            footer.children('.like').children('span').text(post.likes);
            footer.children('.liked').removeClass('liked').addClass('like').children('span').text(post.likes);
        }
        //body.removeClass('loading');
    }

    $('.post').on("click", '.footer button', function () {
        var button = $(this);
        var children = button.children('span');
        var num = parseInt(children.text());
        //Codigo backend
        if (button.hasClass('like')) {
            num++;
            children.text(num);
            button.removeClass('like').addClass('liked');
        } else if (button.hasClass('liked')) {
            num--;
            children.text(num);
            button.removeClass('liked').addClass('like');
        }
    });
    //Profile
    $('.list-group.profile-list').on('click', 'a', function (event) {
        event.preventDefault();
        var num = $(this).data().people;
        var body = $('.widget.profile').addClass('loading');
        $.ajax({
            url: "data.json"
        }).done(function (data) {
            if (data.people.length > 0) {
                loadProfile(data.people[num]);
            } else {
                body.removeClass('loading');
            }
        });
    });

    function loadProfile(profile) {
        var body = $('.widget.profile');
        var info = body.children('.info')
        if (profile.picture.length > 0) {
            info.children('.picture').children('img').attr('src', profile.picture);
            var img = info.children('.picture').children('img');
            img.on('load', function () {
                body.removeClass('loading');
            })
        }
        var bio = info.children('.bio')
        if (profile.name.length > 0) {
            bio.children('h3').text(profile.name);
        }
        if (profile.followers.length > 0) {
            bio.children('p').children('span.num').text(profile.followers);
        } else {
            bio.children('p').children('span.num').text('0');
        }
    }

    $('.profile').on("click", '.buttons button', function () {
        var button = $(this);
        var parent = button.parent('div');
        if (button.hasClass('active')) {
            button.removeClass('active');
        } else {
            button.addClass('active');
        }
        parent.children().each(function () {
            if ($(this).children('span').text() !== button.children('span').text()) {
                $(this).removeClass('active');
            }
        });
    });
    //menu
    $('.menu').on("click", 'button', function () {
        var button = $(this);
        var parent = button.parent('div');
        if (button.hasClass('active')) {
            button.removeClass('active');
        } else {
            if (!button.hasClass('check')) {
                button.addClass('active');
            }
        }
        parent.children().each(function () {
            if ($(this).children('span').text() !== button.children('span').text()) {
                $(this).removeClass('active');
            }
        });
        if (button.hasClass('check')) {
            var num = button.children('sup').text();
            num++;
            button.children('sup').text(num);
        }
    });





    /**
     * Language
     */
    var lang = 'en', lang_data;

    function init() {
        $('[data-translate]').bind('translate', function () {
            var element = $(this);
            var text = element.data().translate;
            element[0].innerText = lang_data[text][lang];
            element[0].lang = lang;
        });
    }
    function changeLang() {
        $('[data-translate]').trigger('translate');
    }

    $('.lang').on('click', function () {
        lang = $(this).val();
        changeLang();
    });

    init();
    
    $.ajax({
        url: "lang.json"
    }).done(function (data) {
        lang_data = data;
        changeLang();
    });
});