/*global module:false*/
module.exports = function(grunt) {

  // Load all plugins
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: ['lib/{,*/}*.js'],
        dest: 'dist/messenger.js'
      }
    },
    uglify: {
      options: {
        report: 'gzip'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/messenger.min.js'
      }
    },
    clean: {
      dist: {
        src: ['dist/']
      }
    },
    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      lib_test: {
        src: ['lib/{,*/}*.js']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // Build task
  grunt.registerTask('build', ['jshint', 'clean:dist', 'mochaTest', 'concat', 'uglify']);

  // Specific tasks
  grunt.registerTask('test', ['mochaTest']);

  // Default
  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
