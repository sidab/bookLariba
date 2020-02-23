var $$ = Dom7;

var app = new Framework7({
    root: '#app',
    name: 'LaRiba Books',
    theme: 'md',
    version: 1.0,
    routes: routes,
    init: false,
    user: localStorage.user ? localStorage.user : false,
    dialog: {
        buttonOk: 'Ок',
        buttonCancel: 'Отмена'
    },
    touch: {
        mdTouchRipple: false,
        tapHold: false,
        disableContextMenu: true,
        activeState: true,
        fastClicks: true
    },
    toast: {
        closeTimeout: 2000
    },
    smartSelect: {
        pageBackLinkText: 'Назад',
        popupCloseLinkText: 'Готово',
        sheetCloseLinkText: 'Выбрать'
    },
    view: {
        animate: true,
        iosDynamicNavbar: false,
        //mdPageLoadDelay: 100,
        stackPages: true,
        preloadPreviousPage: true,
        removeElements: false,
        iosSwipeBack: true,
        mdSwipeBack: true,
        iosSwipeBackAnimateShadow: false,
        iosSwipeBackAnimateOpacity: false,
        mdSwipeBackAnimateShadow: false,
        mdSwipeBackAnimateOpacity: false
    },
    photoBrowser: {
        backLinkText: 'Закрыть',
        navbarOfText: 'из',
        popupCloseLinkText: 'Закрыть',
        swiper: {
            lazy: {
                enabled: false
            }
        }
    },
    lazy: {
        placeholder: 'img/no_image.png',
        threshold: 1000,
        sequential: false
    },
    statusbar: {
        iosOverlaysWebView: false,
        androidOverlaysWebView: false,
        iosTextColor: '#ffffff',
        androidTextColor: '#ffffff',
        iosBackgroundColor: '#007aff',
        androidBackgroundColor: '#007aff'
    },
    sheetModal: {
        closeByOutsideClick: true,
        swipeToClose: true,
        sheetCloseLinkText: 'Выбрать',
        backdrop: true
    },
    methods: {
        barcode: function () {

            app.preloader.show();

            setTimeout(function () {

                app.preloader.hide();

            }, 2000);

            setTimeout(function () {

                cordova.plugins.barcodeScanner.scan(
                    function (result) {

                        if (!result.canceled) {

                            app.views.current.router.navigate('/catalog/items/item', {
                                context: {
                                    id: 1
                                }
                            });

                        }

                    },
                    function (error) {

                        app.dialog.alert('Ошибка скнирования: ' + error);

                    },
                    {
                        preferFrontCamera: false,
                        showFlipCameraButton: false,
                        showTorchButton: true,
                        torchOn: false,
                        saveHistory: true,
                        prompt: 'Отсканируйте штрих-код для получения подробной информации о товаре.',
                        resultDisplayDuration: 500,
                        disableAnimations: true,
                        disableSuccessBeep: true
                    }
                );

            });

        },
        backButton: function (closeApp = true) {

            if (closeApp) {

                if (app.views.current.router.url === '/main' || app.views.current.router.url === '/cart' || app.views.current.router.url === '/favorites' || app.views.current.router.url === '/profile') {

                    app.dialog.confirm('Вы уверены что хотите закрыть приложение?', function () {

                        navigator.app.exitApp();

                    });

                    return false;

                } else if (app.views.current.router.url === '/catalog/categories') {

                    $$('.views').find('.tab-active').find('.page-current').find('.navbar').find('.left').find('a').click();

                    return false;

                } else if (app.views.current.router.url === '/profile/chat') {

                    $$('.views').find('.tab-active').find('.page-current').find('.navbar').find('.left').find('a').click();

                    return false;

                }

            }

            if ($$('.popover.modal-in').length > 0) {

                var popover;

                if ($$('.popover.modal-in').length > 1) {

                    popover = app.popover.get($$('.popover.modal-in:last-child'));

                } else {

                    popover = app.popover.get($$('.popover.modal-in'));

                }

                popover.close();

                return false;

            }

            if ($$('.dialog.modal-in').length > 0) {

                var dialog;

                if ($$('.dialog.modal-in').length > 1) {

                    dialog = app.dialog.get($$('.dialog.modal-in:last-child'));

                } else {

                    dialog = app.dialog.get($$('.dialog.modal-in'));

                }

                dialog.close();

                return false;

            }

            if ($$('.popup.modal-in').length > 0) {

                var popup;

                if ($$('.popup.modal-in').length > 1) {

                    popup = app.popup.get($$('.popup.modal-in:last-child'));

                } else {

                    popup = app.popup.get($$('.popup.modal-in'));

                }

                popup.close();

                return false;

            }

            if ($$('.sheet-modal.modal-in').length > 0) {

                var popup;

                if ($$('.sheet-modal.modal-in').length > 1) {

                    sheet = app.sheet.get($$('.sheet-modal.modal-in:last-child'));

                } else {

                    sheet = app.sheet.get($$('.sheet-modal.modal-in'));

                }

                sheet.close();

                return false;

            }

            app.views.current.router.back();

        },
        onesignal: function () {

            try {

                window.plugins.OneSignal.startInit('93555334-b167-4cfd-882c-63b733a773d8').endInit();

                window.plugins.OneSignal.getIds(function(ids) {

                    var deviceId = JSON.stringify(ids.userId);

                    localStorage.deviceId = deviceId;

                    if (!app.params.user) {

                        app.request({
                            url: encodeURI(app.params.config.backend2+'/includes/remove-device.php'),
                            method: 'POST',
                            data: {
                                deviceId: localStorage.deviceId
                            }
                        });

                    }

                });

            } catch (error) {

                console.log(error);

            }

        }
    },
    data: function () {

        return {
            books: [
                {
                    id: 1,
                    title: 'Продажи переговоры',
                    author: 'Сергей Азимов',
                    price: 495,
                    image: 'img/books/16.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Alibaba. История мирового восхождения от первого лица',
                    author: 'Сарычева К.М',
                    price: 450,
                    image: 'img/books/6.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Стив Джобс',
                    author: 'Уолтер Айзексон',
                    price: 350,
                    image: 'img/books/1.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 4,
                    title: 'Не навреди. Истории о жизни, смерти и нейрохирургии',
                    author: 'Генри Марш',
                    price: 550,
                    image: 'img/books/2.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Сам себе босс. Бизнес-роман о бирюзовой компании',
                    author: 'Гафаров Р.',
                    price: 430,
                    image: 'img/books/3.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 6,
                    title: 'Управление маркетингом. Учебник и практикум',
                    author: 'Короткова Т.',
                    price: 330,
                    image: 'img/books/4.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 7,
                    title: 'Думай как чемпион Откровения магната о жизни и бизнесе',
                    author: 'Короткова Т.',
                    price: 620,
                    image: 'img/books/5.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 8,
                    title: 'Airbnb. Как три простых парня создали новую модель бизнеса',
                    author: 'Деревянко Е.',
                    price: 350,
                    image: 'img/books/7.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 9,
                    title: 'UBER. Инсайдерская история мирового господства',
                    author: 'Шмендель А.',
                    price: 350,
                    image: 'img/books/8.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                },
                {
                    id: 10,
                    title: 'Продавец обуви. История компании Nike, рассказанная ее основателем',
                    author: 'Шмендель А.',
                    price: 470,
                    image: 'img/books/9.jpg',
                    description: 'Уникальное практическое пособие от самого харизматичного бизнес-тренера России!\n' +
                        '.Минимум описательных стратегий и максимум конкретных речевых техник и заготовок, которые встречаются при продажах и переговорах.',
                    properties: [
                        {
                            name: 'Издательство',
                            value: 'Питер'
                        },
                        {
                            name: 'Год издания',
                            value: '2018'
                        },
                        {
                            name: 'ISBN',
                            value: '9785496004558'
                        },
                        {
                            name: 'Кол-во страниц',
                            value: '320'
                        },
                        {
                            name: 'Формат',
                            value: '21 x 14 x 2'
                        },
                        {
                            name: 'Тип обложки',
                            value: 'Твердая бумажная'
                        },
                        {
                            name: 'Тираж',
                            value: '2000'
                        }
                    ]
                }
            ]
        }

    },
    on: {
        init: function () {

        }
    }
});

$$(document).on('deviceready', function () {

    try {

        Keyboard.shrinkView(true);
        Keyboard.disableScrollingInShrinkView(true);

    } catch (error) {}

    setTimeout(function () {

        if (app.device.ios) {

            app.statusbar.hide();
            app.statusbar.show();

            app.statusbar.setBackgroundColor('#007aff');

        }

        navigator.splashscreen.hide();

    }, 2000);

    app.init();

    app.request.setup({
        beforeSend: function(xhr) {

        },
        complete: function(xhr) {

            console.log(xhr);

        },
        error: function () {

        }
    });

    app.methods.onesignal();

    app.views.create('#view-main', {
        url: '/main',
        //animate: app.device.ios ? true : false,
        main: true
    });

    app.views.create('#view-catalog', {
        url: '/catalog/categories',
        //animate: app.device.ios ? true : false
    });

    app.views.create('#view-cart', {
        url: '/cart',
        //animate: app.device.ios ? true : false
    });

    app.views.create('#view-favorites', {
        url: '/favorites',
        //animate: app.device.ios ? true : false
    });

    app.views.create('#view-stocks', {
        url: '/stocks',
        //animate: app.device.ios ? true : false,
    });

    if (app.device.android) {

        var attachFastClick = Origami.fastclick;

        attachFastClick(document.body);

    }

    $$(window).on('click', '.input-clear-button', function() {

        $$(this).prev().val('').focus();

    })

    $$(window).on('keyboardWillShow', function () {

        $$('.toolbar-menu').css('opacity', '0');

    });

    $$(window).on('keyboardWillHide', function () {

        $$('.toolbar-menu').css('opacity', '1');

    });

    $$(document).on('backbutton', function (event) {

        app.methods.backButton();

    });

    $$(document).on('tab:show', function () {

        var first = true;

        $$(document).off('click', '.toolbar-menu .tab-link-active').on('click', '.toolbar-menu .tab-link-active', function (event) {

            if (!first) {

                var viewId = $$(this).attr('href');
                var view = app.views.get(viewId);
                var viewUrl = view.params.url;

                if (viewId !== '#view-profile') {

                    view.router.back(viewUrl, {
                        force: true
                    });

                }

                app.methods.backButton(false);

            }

            first = false;

        });

    });

    $$(document).trigger('tab:show');

    $$(document).on('swipeback:beforechange', function () {

        $$('.toolbar-menu').css('opacity', '1');

    });

});
