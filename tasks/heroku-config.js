/*
 * grunt-heroku-config
 * https://github.com/matmar10/grunt-heroku-config
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

var yaml = require('yamljs');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('herokuConfig',
    'Install heroku configuration from environment variables as config files (JSON or YAML)',
    function () {

      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        envVars: {
          'DATABASE_URL': 'DATABASE_URL',
          'RABBITMQ_BIGWIG_URL': 'RABBITMQ_BIGWIG_URL'
        },
        type: 'json'
      });

      // Iterate over all specified file groups.
      this.files.forEach(function (file) {
        var filepath, fileContent, envProperty, envValue, i;

        // Concat specified files.
        var files = file.src.filter(function (filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          }
          return true;
        });

        for (i = 0; i < files.length; i++) {

          filepath = files[i];
          fileContent = false;

          if ('json' === options.type) {
            fileContent = grunt.file.readJSON(filepath);
          }

          if ('yml' === options.type || 'yaml' === options.type) {
            fileContent = grunt.file.readYAML(filepath);
          }

          if (!fileContent) {
            grunt.log.error('Could not parse file `' + filepath + '` as `' + options.type + '`');
            continue;
          }

          for (envProperty in options.envVars) {
            envValue = process.env[envProperty];
            if ('undefined' === typeof envValue) {
              grunt.log.warn('Environment property `' + envProperty + '` is undefined');
              continue;
            }
            fileContent[options.envVars[envProperty]] = envValue;
          }


          if ('json' === options.type) {
            grunt.file.write(file.dest, JSON.stringify(fileContent, null, 2));
            grunt.log.writeln('Yaml file `' + file.dest + '` created/updated.');
          }

          if ('yml' === options.type || 'yaml' === options.type) {
            grunt.file.write(file.dest, yaml.stringify(fileContent));
            grunt.log.writeln('Yaml file `' + file.dest + '` created/updated.');
            return;
          }


        }

      });
    });

};
