/*Settings:
	1. action-button size, color
	2. items size, color, gap(distance from action-button)
	3. do smth when animation is over
	4. be able to get status of action-button (open or close)
Errors:
	- if items more then 3
	- if items gap less than (action-button radius + items radius + 20)
*/
function ActionBtn(elemsContainer, options = {}) {
	var isOpen = false;
	var animDuration = 0;
	var defaultOptions = {
		actionBtnSize: 100,
		actionBtnColor: 'rgb(249, 180, 120)',
		itemsSize: 60,
		itemsColors: ['rgb(117, 174, 253)', 'rgb(247, 113, 109)', 'rgb(251, 213, 112)'],
		itemsGap: 100,
		itemsOpenType: 'radial',
		itemsOpenDirection: 'top-left'
	}
	var settings = Object.assign({}, defaultOptions, options);
	var elems = {
		container: elemsContainer,
		btn: createActionBtn(settings.actionBtnSize, settings.actionBtnColor),
		items: Array.prototype.slice.call(elemsContainer.querySelectorAll('*'))
	}
	var items = elemsContainer.children;

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
	init();
	function init() {
		configurateItems();
		elems.container.insertBefore(elems.btn, elems.container.firstChild);
		elems.container.classList.add('addBtn__wrap');
		elems.container.classList.add(setOpenDirection(settings.itemsOpenDirection));
	}
	function OpenTypeException(msg) {
		this.message = msg;
	}
	function OpenDirectionException(msg) {
		this.message = msg;
	}
	function setOpenType(type = 'radial') {
		if (type === 'radial') {
			return 'show-radial';
		} else if (type === 'horizontal') {
			return 'show-horizontal';
		} else if (type === 'vertical') {
			return 'show-vertical';
		} else {
			throw new OpenTypeException('Wrong open type!');
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
			throw new OpenDirectionException('Wrong open direction!');
		}
	}
	function toggle() {
		isOpen ? closeItems() : openItems();
	}
	function openItems() {
		var toggleClass = setOpenType(settings.itemsOpenType),
				btnElem = elems.btn;

		btnElem.classList.remove('addBtn--close');
		btnElem.classList.add('addBtn--open');
		btnElem.style.animationIterationCount = items.length - 1;
		for(var i = 1; i < items.length; i++) {
			items[i].classList.add(toggleClass);
		}
		isOpen = true;
		setTimeout(function() {
			btnElem.dispatchEvent(actionBtnOpened);
		}, animDuration * 1000);
	}
	function closeItems() {
		var toggleClass = setOpenType(settings.itemsOpenType),
				btnElem = elems.btn;

		btnElem.classList.remove('addBtn--open');
		btnElem.classList.add('addBtn--close');
		btnElem.style.animationIterationCount = items.length - 1;
		for(var i = 1; i < items.length; i++) {
			items[i].classList.remove(toggleClass);
		}
		isOpen = false;
		setTimeout(function() {
			btnElem.dispatchEvent(actionBtnClosed);
		}, animDuration * 1000);
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
	this.checkOpenStatus = function() {
		return isOpen;
	}
}

