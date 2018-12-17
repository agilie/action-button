(function () {
    'use strict';

    var addButton = document.getElementById('js-addbutton');
    var links = document.body.querySelectorAll('.link');

    var options = {
        size: {
            width: 100,
            height: 100
        } || '',
        fillColor: '#ccc',
        classesName: '',
        numberOfSubItems: 3,
        typeOfExpand: 'radial'
    }

    function Button(element) {
        this.elem = element;
        function setTypeOfExpand(type) {
            return;
        }
    }

    // на клике по кнопке - раскрыть выпадающее меню
    addButton.addEventListener('click', function () {

        // var test = new AddButton(this);
        // test.buttonColor('#000');

        // var testLink = new AddButton(links[0]);
        // testLink.setLink('#2');

        for (var i = 0; i < links.length; i++) {
            links[i].classList.toggle('show-radial');
        }
    });

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });
    
    function AddButton(elem) {
        // получаем наш элемент
        this.elem = elem;
        var self = this;
        // задаем элементу начальные настройки: цвет, размер, классы...
        this.options = {
            color: '#ccc',
            size: '80',
            classes: '',
            numberOfSubBtn: 3,
            typeOfDiscovery: 'horizontal'
        };
        // Метод задает элементу цвет заливки
        this.buttonColor = function (color) {
            this.elem.style.backgroundColor = color ;
        };
        // Метод устанавливает количество выпадающих кнопок
        this.numberOfLinks = function (quantity = 3, tag, className, url) {
            for (var i = 0; i < quantity; i++) {
                var subbutton = createElem(tag, className, url);
                this.elem.parentElement.appendChild(subbutton);
            }
        };
        // Метод устанавливающий Тип раскрытия выпадающих кнопок
        this.discoveryType = function (type = 'radial') {
            if (type === 'radial') {
                return 'show-radial';
            } else if (type === 'horizontal') {
                return 'show-horizontal';
            } else if (type === 'vertical') {
                return 'show-vertical';
            } else {
                return '';
            }
        }
        // по клику показываем выпадающие кнопки
        this.elem.addEventListener('click', function () {
            var links = document.body.querySelectorAll('.link2');
            var toggleClass = self.discoveryType(self.options.typeOfDiscovery);
            console.log(toggleClass);
            for (var i = 0; i < links.length; i++) {
                links[i].classList.toggle(toggleClass);
            }
        });
        // метод который инициализирует Элемент с первоначальными настройками
        this.addButton = function (options = self.options) {
            this.elem.classList.add(options.classes);
            this.elem.style.width = options.size + 'px';
            this.elem.style.height = options.size + 'px';
            this.elem.style.backgroundColor = options.color;
            this.elem.id = 'js-addbutton';
            self.numberOfLinks(options.numberOfSubBtn, 'a', 'link2', '#2');
        }
        // this.setLink = function (url) {
        //     this.elem.setAttribute('href', url);
        // };
    }

    function createElem(tag = 'a', className = 'addbutton__link',url = '#') {
        var elem = document.createElement(tag);

        elem.classList.add(className);
        elem.setAttribute('href', url);

        return elem;
    }

//    ----------------test work

    // берем нашу кнопку
    var button = document.body.getElementsByTagName('button')[1];
    // делаем из нее Специальную кнопку с методами и тд
    var testButton = new AddButton(button);
    //запускаем нашу Спец кнопку
    setTimeout(function () {
        testButton.addButton(
            {
                color: '#b2f2b2',
                size: '100',
                classes: 'test-class',
                numberOfSubBtn: 3
            }
        );
    }, 2000);

    // setTimeout(function () {
    //     testButton.buttonColor('#ccc');
    // }, 4000);





})();
/*
Methods:
- change Main button background-color
    - change links background-color
- change number of links
- change opening type of links [vertical, horizontal, radial]
- change time of animation
- change delay of each links
- change the size of Main button / each links
- change the size of plus icon

 */
// конструктор и интерфейсы, 