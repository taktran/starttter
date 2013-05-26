/*global require:true, module:false*/
module.exports = function (grunt) {
  'use strict';

  var port = grunt.option('port') || 7770,
    appBase = "app";

  // For livereload
  function addLivereloadMiddleware(connect, options) {
    var path = require('path'),
      lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
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
          port: port,
          base: appBase,
          middleware: addLivereloadMiddleware
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
      jshintrc: '.jshintrc',
      gruntfile: {
        src: ['Gruntfile.js']
      },
      js: {
        src: ['app/js/*.js', 'test/**/*.js']
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
        files: 'app/js/*.js',
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      css: {
        files: 'app/sass/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      html: {
        files: 'app/*.html',
        options: {
          livereload: true
        }
      }
    },

    open: {
      all: {
        path: 'http://localhost:' + port
      }
    }
  });

  grunt.registerTask('default', ['open', 'connect', 'watch']);

};
