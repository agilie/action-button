function ActionButton (elemsContainer) {
	var module = {};
	
	module.options = {
		isOpen: false,
		btnSize: 80,
		backgroundColor: 'rgb(249, 180, 120)',
		itemsOpenType: 'radial',
		itemsOpenDirection: 'top-left',
		itemsGap: 80,
		itemsSize: 40,
		itemsBackgroundColor: ['rgb(117, 174, 253)', 'rgb(247, 113, 109)', 'rgb(251, 213, 112)'],
	};

	function setOpenType(type = 'radial') {
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
			return '';
		}
	}
	function createBtn() {
		var btn = document.createElement('button');

		btn.classList.add('addBtn');
		btn.id = 'js-addBtn';
		btn.setAttribute('type', 'button');
		btn.style.width = module.options.btnSize + 'px';
		btn.style.height = module.options.btnSize + 'px';
		btn.style.backgroundColor = module.options.backgroundColor;

		btn.addEventListener('click', function() {
			setActiveStatus(btn);
		})

		return btn;
	}
	function configurateItems(btnElem) {
		var items = elemsContainer.children;

		for(var i = 0; i < items.length; i++) {
			items[i].classList.add('addBtn__item');
			items[i].style.backgroundColor = module.options.itemsBackgroundColor[i];
			items[i].addEventListener('click', function() {
				setActiveStatus(btnElem);
			})
		}
	}
	function setActiveStatus(btn) {
		module.options.isOpen ? module.options.isOpen = false : module.options.isOpen = true;
		var items = elemsContainer.children;
		var toggleClass = setOpenType(module.options.itemsOpenType);
		var itemsCount = items.length - 1;
		var delayTime = (500 * itemsCount);

		btn.classList.add('addBtn--active');
		setTimeout(function() {
			btn.classList.remove('addBtn--active');
		}, delayTime);
		for(var i = 1; i < items.length; i++) {
			items[i].classList.toggle(toggleClass);
		}
	}

	module.init = function (settings = module.options) {
		var obj = Object.assign(module.options, settings);
		var btn = createBtn();

		configurateItems(btn);
		elemsContainer.insertBefore(btn, elemsContainer.firstChild);
		elemsContainer.classList.add('addBtn__wrap', setOpenDirection(obj.itemsOpenDirection));
		
		return obj;
	}

	return module;
};