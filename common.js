(function() {
	// get the container of user items
	var buttonWrap = document.getElementById('js-btn-wrap');

	function AgilieBtn(wrap) {
		var self = this;
		this.wrap = wrap;
		var wrapItems = self.wrap.children;
		this.options = {
			size: 80,
			iconUrl: 'url("icons/plus_2.svg")',
			iconSize: 30,
			backgroundColor: 'rgb(249, 180, 120)',
			itemsOpenType: 'radial',
			itemsOpenDirection: 'top-left',
			itemsGap: 80,
			animation: {
				name: '',
				delay: '',
				duration: '',
				iterationCount: '',
				timingFunction: ''
			},
			itemsSize: 40,
			itemsBackgroundColor: ['rgb(117, 174, 253)', 'rgb(247, 113, 109)', 'rgb(251, 213, 112)'],
			itemsIconUrl: [ 'url("icons/close_2.svg")', 'url("icons/close_2.svg")', 'url("icons/close_2.svg")'],
			itemsIconSize: 15
		}
		this.setOpenType = function (type = 'radial') {
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
		this.setOpenDirection = function(direction = 'top-left') {
			if (direction === 'top-left') {
                return 'top-left';
            } else if (direction === 'top-right') {
                return 'top-right';
            } else if (direction === 'bottom-right') {
                return 'bottom-right';
            } else if (direction === 'bottom-left') {
                return 'bottom-left';
            } else {
                return '';
            }
		}
		this.init = function (options = self.options) {
			var obj = Object.assign({}, self.options, options);
			var btn = createBtn();

			configurateItems();
			this.wrap.insertBefore(btn, this.wrap.firstChild);
			this.wrap.classList.add('addBtn__wrap', self.setOpenDirection(obj.itemsOpenDirection));

			// var transformItem = getComputedTranslateXY(wrapItems[0]);
			// var transformItemMax = getMaxValue(transformItem);
			// this.wrap.style.height = transformItemMax + 'px';

			// console.log(transformItem);
			// console.log(transformItemMax);

			return obj;
		}

		function createBtn() {
			var btn = document.createElement('button');

			btn.classList.add('addBtn');
			btn.id = 'js-addBtn';
			btn.setAttribute('type', 'button');
			btn.style.width = self.options.size + 'px';
			btn.style.height = self.options.size + 'px';
			btn.style.backgroundImage = self.options.iconUrl;
			btn.style.backgroundSize = self.options.iconSize + 'px';
			btn.style.backgroundColor = self.options.backgroundColor;
			btn.addEventListener('click', function() {
				var btn = this;
				var items = self.wrap.children;
				var toggleClass = self.setOpenType(self.options.itemsOpenType);
				var itemsCount = items.length - 1;
				var delayTime = (500 * itemsCount);

				this.classList.add('addBtn--active');
				// this.style.animationIterationCount = String(itemsCount);
				setTimeout(function() {
					btn.classList.remove('addBtn--active');
				}, delayTime);
				for(var i = 1; i < items.length; i++) {
					items[i].classList.toggle(toggleClass);
				}
				// var itemsGapArr = getItemsGap(self.itemsGap);
				// items[1].style.transform = 'translateY(-' + itemsGapArr[0] + 'px)';
				// items[2].style.transform = 'translate(-' + itemsGapArr[1] + 'px,-' + itemsGapArr[1] + 'px)';
				// items[3].style.transform = 'translateX(-' + itemsGapArr[0] + 'px)';
			})

			return btn;
		}
		function getItemsGap(itemsGap) {
			var arr = [];
			var path = self.options.size / 2 + self.options.itemsSize / 2 + self.options.itemsGap;
			var a = path * Math.sin(45 * Math.PI / 180),
				b = path * Math.cos(45 * Math.PI / 180);
			arr.push(path);
			arr.push(a);
			arr.push(b);

			return arr;
		}
		function configurateItems() {
			var items = self.wrap.children;

			for(var i = 0; i < items.length; i++) {
				items[i].classList.add('addBtn__item');
				items[i].style.backgroundColor = self.options.itemsBackgroundColor[i];
			}
		}
		function getComputedTranslateXY(obj) {
			var transArr = [];
			
			if(!window.getComputedStyle) return;
    		var style = getComputedStyle(obj),
				transform = style.transform || style.webkitTransform || style.mozTransform,
				mat = transform.match(/^matrix3d\((.+)\)$/);    
			
			if(mat) return parseFloat(mat[1].split(', ')[13]);
    		mat = transform.match(/^matrix\((.+)\)$/);
    		mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
    		mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
			
			return transArr;
		}
		function getMaxValue(array) {
			var numbers = array;
			var absNumbers = numbers.map(Math.abs);
			var maxValue = Math.max.apply(Math, absNumbers);
		
			return maxValue;
		}
	}

	var test2 = new AgilieBtn(buttonWrap);
	test2.init();
	// test.init({
	// 	color: '#000',
	// 	size: 80,
	// 	classes: 'js-main-btn',
	// 	id: 'js-main-btn',
	// 	openType: 'horizontal'
	// });
})();