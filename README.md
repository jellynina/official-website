
# TDI website

***


## TODO

1. ~~add template~~: 1124 done
2. ~~favicon~~: 1125done
3. logo with animation: studying
4. background image animation: blocking
5. Visual Design and Adjustment: **Director** decide Visual style, and content.
6. lightbox


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

## 2015.11.24 note:

* templating with [nunjucks](https://mozilla.github.io/nunjucks/)
