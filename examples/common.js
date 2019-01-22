function ActionBtn(elemsContainer, options = {}) {
	this.getOpenStatus = function() {
		return isOpen;
	}
	this.open = function() {
		openItems();
	}
	this.close = function() {
		closeItems();
	}
	this.toggleStatus = function() {
		isOpen ? closeItems() : openItems();
	}
	this.onOpen = function(callback) {
		document.addEventListener('ActionBtnOpened', function() {
			callback();
		})
	}
	this.onClose = function(callback) {
		document.addEventListener('ActionBtnClosed', function() {
			callback();
		})
	}
	var isOpen = false;
	var animDuration = 0;
	var timer1;
	var timer2;
	var defaultOptions = {
		actionBtnSize: 80,
		actionBtnColor: 'rgb(249, 180, 120)',
		itemsSize: 45,
		itemsColors: ['rgb(117, 174, 253)', 'rgb(247, 113, 109)', 'rgb(251, 213, 112)'],
		itemsGap: 20,
		itemsOpenType: 'radial',
		itemsOpenDirection: 'top-left'
	}
	var settings = Object.assign({}, defaultOptions, options);
	var elems = {
		container: elemsContainer,
		btn: createActionBtn(settings.actionBtnSize, settings.actionBtnColor),
		items: Array.prototype.slice.call(elemsContainer.querySelectorAll('*'))
	}
	var wrapper = createWrapper();
	var items = elemsContainer.children;
	var containerBackground = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter></defs></svg>';
	var actionBtnOpened = new CustomEvent("ActionBtnOpened", {
		detail: {
			msg: "Action-button is opened"
		},
		bubbles: true,
		cancelable: false
	});
	var actionBtnClosed = new CustomEvent("ActionBtnClosed", {
		detail: {
			msg: "Action-button is closed"
		},
		bubbles: true,
		cancelable: false
	});
	function getAnimationDuration() {
		return animDuration;
	}
	function startTimer1() {
		var time = getAnimationDuration();
		timer1 = setTimeout(function() {
			elems.btn.dispatchEvent(actionBtnOpened);
		}, time * 1000);
	}
	function stopTimer1() {
		clearTimeout(timer1);
	}
	function startTimer2() {
		var time = getAnimationDuration();
		timer2 = setTimeout(function() {
			elems.btn.dispatchEvent(actionBtnClosed);
		}, time * 1000);
	}
	function stopTimer2() {
		clearTimeout(timer2);
	}
	function init() {
		checkItemsNumber(elems.items);
		configurateItems();
		elems.container.insertBefore(elems.btn, elems.container.firstChild);
		elems.container.insertAdjacentHTML('afterend', containerBackground);
		elems.container.classList.add('addBtn__wrap');

		var parentElem = elems.container.parentNode;
		parentElem.appendChild(wrapper);
		wrapper.appendChild(elems.container);

		// elems.container.classList.add(setOpenDirection(settings.itemsOpenDirection));
	}
	init();
	function setOpenType(type = 'radial') {
		if (type === 'radial') {
			return 'show-radial';
		} else if (type === 'horizontal') {
			return 'show-horizontal';
		} else if (type === 'vertical') {
			return 'show-vertical';
		} else {
			throw new Error('Wrong open type!');
		}
	}
	function setOpenDirection(direction = 'top-left') {
		if (direction === 'top-left') {
			return 'top-left';
		} else if (direction === 'top-right') {
			return 'top-right';
		} else if (direction === 'bottom-right') {
			return 'bottom-right';
		} else if (direction === 'bottom-left') {
			return 'bottom-left';
		} else {
			throw new Error('Wrong open direction!');
		}
	}
	function toggle() {
		isOpen ? closeItems() : openItems();
	}
	function openItems() {
		var elemsTranforms = calcRadialTransform();
		var btnElem = elems.btn;

		setWrapSize();
		btnElem.classList.remove('addBtn--close');
		btnElem.classList.add('addBtn--open');
		btnElem.style.animationIterationCount = items.length - 1;
		elems.items.forEach(function(item, index) {
			item.style.transform = `translate(${elemsTranforms[index].x}, ${elemsTranforms[index].y})`;
		})
		isOpen = true;
		stopTimer2();
		startTimer1();
	}
	function closeItems() {
		var btnElem = elems.btn;

		removeWrapSize();
		btnElem.classList.remove('addBtn--open');
		btnElem.classList.add('addBtn--close');
		btnElem.style.animationIterationCount = items.length - 1;
		elems.items.forEach(function(item, index) {
			item.style.transform = 'translate(0)';
		})
		isOpen = false;
		stopTimer1();
		startTimer2();
	}
	function createActionBtn(size, color) {
		var btn = document.createElement('button');

		btn.classList.add('addBtn');
		btn.setAttribute('type', 'button');
		btn.style.width = size + 'px';
		btn.style.height = size + 'px';
		btn.style.backgroundColor = color;
		btn.addEventListener('click', toggle)

		return btn;
	}
	function configurateItems() {
		elems.items.forEach(function(item, index) {
			item.classList.add('addBtn__item');
			item.style.width = item.style.height = settings.itemsSize + 'px';
			item.style.backgroundColor = settings.itemsColors[index];
			item.style.transitionDelay = (0.0 + index * 0.5) + 's';
			item.style.transitionDuration = 0.8 + 's';
		})
		animDuration = parseFloat(items[items.length - 1].style.transitionDelay) + parseFloat(items[items.length - 1].style.transitionDuration);
	}
	function calcRadialTransform(distance = settings.itemsGap) {
		if (checkGap(distance)) {
			var arrOfTransforms = [];
			var realGap = distance + (settings.actionBtnSize / 2) + (settings.itemsSize / 2);
			var oxDistance = realGap * Math.cos(45 * Math.PI / 180);
			var oyDistance = realGap * Math.sin(45 * Math.PI / 180);
			var firstElem, secondElem, thirdElem, fourElem, fiveElem;
			var firstElem = {
				x: '0px',
				y: `-${realGap}px`
			};
			var secondElem = {
				x: `-${oxDistance}px`,
				y: `-${oyDistance}px`
			};
			var thirdElem = {
				x: `-${realGap}px`,
				y: '0px'
			};
			var fourElem = {
				x: `-${oxDistance}px`,
				y: `${oyDistance}px`
			};
			var fiveElem = {
				x: '0px',
				y: `${realGap}px`
			};
			arrOfTransforms.push(firstElem, secondElem, thirdElem, fourElem, fiveElem);
		} else {
			throw new Error('Please set more gap between Action-button and items.');
		}

		return arrOfTransforms;
	}
	function checkGap(gap) {
		return gap > 0 ? true : false;
	}
	function checkItemsNumber(items) {
		if (items.length > 5) {
			throw new Error('Max items count is 5!!!');
		}
	}
	function calcWrapSize() {
		var size = ((settings.actionBtnSize / 2) + settings.itemsGap + settings.itemsSize + 20) * 2;

		return size;
	}
	function setWrapSize() {
		elemsContainer.classList.add('addBtn__wrap--active');
		elemsContainer.style.width = `${calcWrapSize()}px`;
		elemsContainer.style.height = `${calcWrapSize()}px`;
	}
	function removeWrapSize() {
		elemsContainer.classList.remove('addBtn__wrap--active');
		elemsContainer.style.width = 'auto';
		elemsContainer.style.height = 'auto';
	}
	function createWrapper() {
		var wrap = document.createElement('div');

		wrap.classList.add('addBtn__wrapper');
		wrap.style.width = `${settings.actionBtnSize}px`;
		wrap.style.height = `${settings.actionBtnSize}px`;

		return wrap;
	}
}