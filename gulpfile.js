'use strict';

const NODE_ENV = process.env.WERCKER_GIT_BRANCH || process.env.NODE_ENV || process.argv[3];
const ENV = setupEnv(NODE_ENV);
const ENV_PROD = (ENV === 'production');

const env = require('node-env-file');

env(__dirname + '/.env');

const appConfig = require('./config/appConfig')[ENV];

const childProcess = require('child_process');
const concat = require('gulp-concat');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const inject = require('gulp-inject'); //jshint ignore:line
const jshint = require('gulp-jshint');
const less = require('gulp-less');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const uglify = require('gulp-uglifyjs');
const uuid = require('node-uuid');
const watch = require('gulp-watch');
const wrap = require('gulp-wrap');

require('gulp-task-list')(gulp);

console.log('\n\nENV: ' + ENV + '\n\n');

const BUILDDIR = 'build';

const BUILD_ID = uuid.v4();

//js
const MINIFIED_SRC_SCRIPT = 'startupReviewApp-' + BUILD_ID + '.min.js';
const MINIFIED_VENDOR_SCRIPT = 'startupReviewLibs-' + BUILD_ID + '.min.js';

const UGLIFYOPTIONS = {
  mangle: false,
  compress: true,
  output: {
    comments: false
  }
};

const VENDOR_JS = [
  BUILDDIR + '/bower_components/angular/angular.js',
  BUILDDIR + '/bower_components/bootstrap/dist/js/bootstrap.js',
  BUILDDIR + '/bower_components/angular-resource/angular-resource.js',
  BUILDDIR + '/bower_components/angular-ui-router/release/angular-ui-router.js',
  BUILDDIR + '/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  BUILDDIR + '/bower_components/underscore/underscore.js',
  BUILDDIR + '/bower_components/angular-animate/angular-animate.js',
  BUILDDIR + '/bower_components/angular-sanitize/angular-sanitize.js',
  BUILDDIR + '/bower_components/moment/moment.js',
  BUILDDIR + '/bower_components/slick-carousel/slick/slick.js'
];

//css
const MINIFIED_SRC_CSS = 'startupReview-' + BUILD_ID + '.css';
const MINIFIED_VENDOR_CSS = 'startupReviewLibs-' + BUILD_ID + '.css';

const LESSOPTIONS = {
  compress: ENV_PROD
};

const VENDOR_CSS = [
  BUILDDIR + '/bower_components/slick-carousel/slick/slick.css'
];

/* =========================================================================
 * Tasks
 * ========================================================================= */

/**
 * List gulp tasks
 */
gulp.task('?', next => {
  childProcess.exec('gulp task-list', next);
});

/**
 * Clean the build directory
 */
gulp.task('clean', next => {
  childProcess.exec(`rm -rf ${BUILDDIR}`, next);
});

/**
 * Fonts
 */
gulp.task('fonts', () => {
  const fontcustom = require('fontcustom');

  return fontcustom({
    path: 'resources/font-glyphs',
    output: 'src/font-glyphs',
    noisy: true,
    force: true
  });
});

// Copy src folder to build directory
gulp.task('copy', ['clean', 'copy-bower', 'copy-vendor'], () => {
  //exclude bower_compoents js files
  return _init(gulp.src(['src/**/*.*', '!src/vendor/js/**/*.*', 'src/bower_components/**/*.css', 'src/bower_components/**/*.less', 'src/bower_components/**/*.html', '!src/bower_components/**/*.js']))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('copy-bower', ['clean'], () => {
  //copy bower_components js files - wrap in self-invoking function to prevent issues when concatenating and minifying
  return _init(gulp.src('src/bower_components/**/**/*.js'))
    .pipe(wrap('(function(){<%= contents %>\n})();'))
    .pipe(gulp.dest(BUILDDIR + '/bower_components'));
});

gulp.task('copy-vendor', ['clean'], () => {
  //copy venue js files - wrap in self-invoking function to prevent issues when concatenating and minifying
  return _init(gulp.src('src/vendor/js/*.js'))
    .pipe(wrap('(function(){<%= contents %>\n})();'))
    .pipe(gulp.dest(BUILDDIR + '/vendor/js'));
});

// Copy src folder to build directory
// gulp.task('fonts', function(next) {
//   return fontcustom({
//     path: 'src/font-glyphs/icons',
//     output: 'src/font-glyphs',
//     noisy: true,
//     force: true
//   });
// });

// Replace lets in config
gulp.task('replace', ['copy'], () => {
  return _replace(gulp.src(['build/**/*.*']))
    .pipe(gulp.dest(BUILDDIR));
});

// Compile .less files to .css
gulp.task('css', ['js', 'css-vendor'], () => {
  let target = gulp.src(BUILDDIR + '/index.html');

  let sources = gulp.src(BUILDDIR + '/less/main.less')
    .pipe(less(LESSOPTIONS))
    .pipe(rename(MINIFIED_SRC_CSS))
    .pipe(gulp.dest(BUILDDIR + '/css'));

  return target.pipe(inject(sources, {
      starttag: '<!-- injectSrcCss:css -->',
      endtag: '<!-- endinjectSrcCss -->',
      transform: filepath => {
        let path = filepath.replace('/build', '');
        return '<link rel="stylesheet" href="' + path + '"/>';
      }
    }))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('css-vendor', ['js', 'copy', 'replace'], () => {
  let target = gulp.src(BUILDDIR + '/index.html');

  let sources = gulp.src(VENDOR_CSS)
    .pipe(less(LESSOPTIONS))
    .pipe(concat(MINIFIED_VENDOR_CSS))
    .pipe(gulp.dest(BUILDDIR + '/css'));

  return target.pipe(inject(sources, {
      starttag: '<!-- injectVendorCss:css -->',
      endtag: '<!-- endinjectVendorCss -->',
      transform: filepath => {
        let path = filepath.replace('/build', '');
        return '<link rel="stylesheet" href="' + path + '"/>';
      }
    }))
    .pipe(gulp.dest(BUILDDIR));
});

/**
 * Minify javascript files
 */
gulp.task('js', ['js-vendor', 'copy', 'replace'], () => {
  let target = gulp.src(BUILDDIR + '/index.html');

  let sources = gulp.src([BUILDDIR + '/app/**/**/*.js', '!' + BUILDDIR + '/app/' + MINIFIED_SRC_SCRIPT, '!' + BUILDDIR + '/app/' + MINIFIED_VENDOR_SCRIPT])
    .pipe(gulpIf(ENV_PROD, uglify(MINIFIED_SRC_SCRIPT, UGLIFYOPTIONS)))
    .pipe(gulpIf(ENV_PROD, gulp.dest(BUILDDIR + '/app')));

  return target.pipe(inject(sources, {
      starttag: '<!-- injectSrcJs:js -->',
      endtag: '<!-- endinjectSrcJs -->',
      transform: filepath => {
        let path = filepath.replace('/build', '');
        return '<script src="' + path + '"></script>';
      }
    }))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('js-vendor', ['copy', 'replace'], () => {
  let target = gulp.src(BUILDDIR + '/index.html');

  let sources = gulp.src(VENDOR_JS)
    .pipe(gulpIf(ENV_PROD, uglify(MINIFIED_VENDOR_SCRIPT, UGLIFYOPTIONS)))
    .pipe(gulpIf(ENV_PROD, gulp.dest(BUILDDIR + '/app')));

  return target.pipe(inject(sources, {
      starttag: '<!-- injectVendorJs:js -->',
      endtag: '<!-- endinjectVendorJs -->',
      transform: filepath => {
        let path = filepath.replace('/build', '');
        return '<script src="' + path + '"></script>';
      }
    }))
    .pipe(gulp.dest(BUILDDIR));
});

/**
 * Js Hint
 */
gulp.task('jshint', ['replace'], () => {
  return _init(gulp.src(['src/app/**/*.js']))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('server', ['default'], () => {

  // LESS
  (function processLess(paths) {
    paths.forEach(path => {
      watch(path, {
        emit: 'one',
        emitOnGlob: false
      }, files => {
        //copy the changes less files to the build dir
        files
          .pipe(gulp.dest(BUILDDIR + '/less'));

        //reprocess main.less in the build dir - regenerate css
        return gulp.src(BUILDDIR + '/less/main.less')
          .pipe(less(LESSOPTIONS))
          .pipe(rename(MINIFIED_SRC_CSS))
          .pipe(gulp.dest(BUILDDIR + '/css'));
      });
    });
  })(['src/less/**/*.less']);

  (function processJs() {
    console.log('watching js files');

    watch('src/app/**/**/*.js', {
      emit: 'one',
      emitOnGlob: false
    }, files => {
      //copy the changed js files to the build dir
      return _replace(files)
        .pipe(gulp.dest(BUILDDIR + '/app'));
    });
  }());

  (function processHtml(paths) {
    console.log('watching html files');

    paths.forEach(path => {
      let dest = path.split('/').slice(0, -1).join('/').replace('src', BUILDDIR).replace(/\*/gi, '');
      watch(path, {
        emit: 'one',
        emitOnGlob: false
      }, files => {
        return _replace(files)
          .pipe(gulp.dest(dest));
      });

    });
  }(['src/**/**/*.html']));

  return require('./server');
});

/**
 * Run all steps in order
 */
gulp.task('default', ['clean', 'copy', 'replace', 'css', 'js']);

/**
 * Deploy steps
 */
gulp.task('deploy', ['default']);

/**
 * Run unit and e2e tests - this task is run by Wercker when building our app
 */
//gulp.task('test', ['test-unit', 'test-e2e', 'deploy'], function() {});
//gulp.task('test', ['test-unit', 'deploy'], function() {});
gulp.task('test', ['deploy'], () => {});

/* =========================================================================
 * Helper Functions
 * ========================================================================= */

function _init(stream) {
  stream.setMaxListeners(0);
  return stream;
}

function _replace(stream) {
  _init(stream);
  for (let key in appConfig) {
    stream.pipe(replace('@@' + key, appConfig[key], {
      skipBinary: true
    }));
  }

  return stream;
}

function setupEnv(env) {
  // allow passing name as an argument
  if (env && env.indexOf('-') === 0) env = env.substring(1);

  // production
  if (env === 'master' || env === 'prod' || env === 'production') return 'production';
  // development
  else if (env === 'dev' || env === 'development') return 'development';
  // local
  else if (env === 'local') return 'local';
  // default
  else return 'development';
}
