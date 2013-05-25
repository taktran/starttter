/*global require:true, module:false*/
module.exports = function (grunt) {
  'use strict';

  var port = grunt.option('port') || 7770,
    appBase = "app";

  // For livereload
  var path = require('path');
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

  var folderMount = function folderMount(connect, point) {
    return connect['static'](path.resolve(point));
  };

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
          middleware: function (connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('default', ['connect', 'watch']);

};
