# Agilie/Action-button

[![install size](https://packagephobia.now.sh/badge?p=@agilie/action-button)](https://packagephobia.now.sh/result?p=@agilie/action-button)
[![](https://img.shields.io/github/license/agilie/action-button.svg)](https://github.com/agilie/action-button/tree/master)


This is fixed floating action button.

## Install

```
$ npm install @agilie/action-button
```

## Usage

```html
<head>
  <script src="../../dist/js/common.js"></script>
  <link rel="stylesheet" href="../../dist/css/main.css">
</head>
<body>
  <div class="wrap" id="js-btn-wrap">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</body>
```

```js
var elemsWrap = document.getElementById('js-btn-wrap');
var actionBtn = new ActionBtn(elemsWrap);
```

##### As a result:

```html
  <div class="wrap addBtn__wrap top-left" id="js-btn-wrap">
    <button class="addBtn" type="button" style="width: 80px; height: 80px; background-image: url('/icons/plus_2.svg'); background-size: 30px; background-color: rgb(249, 180, 120);"></button>
    <div class="item addBtn__item" style="background-color: rgb(117, 174, 253); transition-delay: 0s; transition-duration: 0.8s;"></div>
    <div class="item addBtn__item" style="background-color: rgb(247, 113, 109); transition-delay: 0.5s; transition-duration: 0.8s;"></div>
    <div class="item addBtn__item" style="background-color: rgb(251, 213, 112); transition-delay: 1s; transition-duration: 0.8s;"></div>
  </div>
```

## Examples

##### Base usage

```html
  <div class="wrap" id="js-btn-wrap">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
  <script type="text/javascript">
    var elemsContainer = document.getElementById('js-btn-wrap');
    var instances = new ActionBtn(elemsContainer);
  </script>
```
![Preview](examples/default/action-button_01.png)
![Preview](examples/default/action-button_02.png)

## Contact us
If you have any questions, suggestions or just need a help with web or mobile development, please email us at <web@agilie.com>. You can ask us anything from basic to complex questions.

We will continue publishing new open-source projects. Stay with us, more updates will follow!
