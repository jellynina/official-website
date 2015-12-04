
# TDI website

***


## TODO

1. ~~add template~~: 1124 done
2. ~~favicon~~: 1125done
3. [logo with animation](#idea:20): studying
4. [background image animation](#idea:30): blocking
5. Visual Design and Adjustment: **Director** decide Visual style, and content.
6. [lightbox plugin import](#done:02): 1204 done

### 素材請求：

1. [簡介文案](#todo:40)
2. [視覺素材](#todo:30)
3. [案例相片](#todo:20)


# Improvement:


## Svg

* svg css filter:[read](http://codepen.io/noahblon/post/coloring-svgs-in-css-background-images)


## gulp connect

### live re-load

```js
  var connect = require('gulp-connect');
  gulp.task('run', ['watch'], function (){
    connect.server({
      root: 'dist',
      port: 8080,
      livereload: true
    });
  });
```

## photoswipe

list:

* photoswipe.min.js
* photoswipe-ui-default.min.js
* default-skin.css
* default-skin.png
* default-skin.svg
* preloader.gif

### JSON import data:

```html
<h1>Posts</h1>
<ul>
{% for item in items %}
  <li>{{ item.title }}</li>
{% else %}
  <li>This would display if the 'item' collection were empty</li>
{% endfor %}
</ul>
```

use [gulp-data](https://www.npmjs.com/package/gulp-data) import.

目前先使用inline的方式匯入資料

#### 問題：

* [相簿自動分頁](#hack:0)？ *先手動一頁放六張照片*
* gulp: compass 之後 加入cssStream [sourcemap](#FIXME:10)無法正常顯示
* [gulp assets import](#todo:10): [Browsersync](http://www.browsersync.io/docs/gulp/)是否會是solution?
* [contact us javascript](#todo:0)


## 2015.11.24 note:

* templating with [nunjucks](https://mozilla.github.io/nunjucks/)

## 2015.12.01 note

* 套用photoswipe
* `for loop` 用於撈取照片資料。
