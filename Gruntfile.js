/*global require:true, module:false*/
module.exports = function (grunt) {
  'use strict';

  var port = grunt.option('port') || 7770,
    appBase = "app",
    hostname = "0.0.0.0",
    liveReloadPort = grunt.option('lrp') || 35729;

  // For livereload
  function addLiveReloadMiddleware(connect, options) {
    var path = require('path'),
      lrSnippet = require('connect-livereload')({
        port: liveReloadPort
      }),
      folderMount = function folderMount(connect, point) {
        return connect['static'](path.resolve(point));
      };

    return [lrSnippet, folderMount(connect, options.base)];
  }

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    connect: {
      livereload: {
        options: {
          hostname: hostname,
          port: port,
          base: appBase,
          middleware: addLiveReloadMiddleware
        }
      }
    },

    sass: {
      dist: {
        files: {
          'app/css/main.css': 'app/sass/main.scss'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      karmaConfig: {
        src: ['karma.conf.js']
      },
      js: {
        src: ['app/js/*.js']
      },
      test: {
        src: ['test/unit/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      }
    },

    watch: {
      jshintrc: {
        files: '.jshintrc',
        tasks: ['jshint:jshintrc']
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: ['app/js/*.js', 'app/vendor/**/*'],
        tasks: ['jshint'],
        options: {
          livereload: liveReloadPort
        }
      },
      karmaConfig: {
        files: '<%= jshint.karmaConfig.src %>',
        tasks: ['jshint:karmaConfig', 'karma:unit:run']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint', 'karma:unit:run']
      },
      css: {
        files: 'app/sass/*.scss',
        tasks: ['sass']
      },
      html: {
        files: ['app/*.html', 'app/css/*.css'],
        options: {
          livereload: liveReloadPort
        }
      }
    },

    open: {
      all: {
        path: 'http://' + hostname + ':' + port
      }
    }
  });

  grunt.registerTask('default', ['connect', 'karma', 'watch']);

};
