/*
 * grunt-heroku-config
 * https://github.com/matmar10/grunt-heroku-config
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

var objectMapper = require('object-mapper');
var merge = require('merge');
var yaml = require('yamljs');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('envConfigToFile',
    'Install heroku configuration from environment variables as config files (JSON or YAML)',
    function () {

      var isYaml = function (options, filename) {
        return options.type === 'yml' || options.type === 'yaml' ||
          ('auto' === options.type && -1 !== filename.indexOf('yml'));
      };

      var isJson = function (options, filename) {
        return options.type === 'json' || ('auto' === options.type && -1 !== filename.indexOf('json'));
      };

      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        map: {
          'DATABASE_URL': 'DATABASE_URL',
          'RABBITMQ_BIGWIG_URL': 'RABBITMQ_BIGWIG_URL'
        },
        type: 'auto'
      });

      // iterate over all specified file groups
      this.files.forEach(function (file) {
        var srcFiles, filepath, fileContent, mappedResult, result, i, srcObj = {};

        // contact source files
        srcFiles = file.src.filter(function (filepath) {
          if (!grunt.file.exists(filepath)) {
            return false;
          }
          return true;
        });

        grunt.verbose.writeln('Processing source files for destination:', file.dest, srcFiles);

        // merge all the source files' data into a single object
        for (i = 0; i < srcFiles.length; i++) {

          filepath = srcFiles[i];
          fileContent = false;

          if (isJson(options, filepath)) {
            grunt.verbose.writeln('Processing as JSON:', filepath);
            fileContent = grunt.file.readJSON(filepath);
          }

          if (isYaml(options, filepath)) {
            grunt.verbose.writeln('Processing as YAML:', filepath);
            fileContent = grunt.file.readYAML(filepath);
          }

          if (!fileContent) {
            grunt.log.error('Could not parse file `' + filepath + '` as `' + options.type + '`');
            continue;
          }

          srcObj = merge(true, srcObj, fileContent);
          grunt.verbose.writeln('Source data is now:', srcObj);
        }

        // map env variables into object based on configured map
        grunt.verbose.writeln('Applying map to process.env object; map is:', options.map);
        mappedResult = objectMapper(process.env, options.map);
        grunt.verbose.writeln('Mapped result from process.env is:', mappedResult);

        // merge in the original merged source values from the config file with the extracted env values
        result = merge.recursive(true, srcObj, mappedResult);
        grunt.verbose.writeln('Merged result from process.env and source files is:', result);

        if (isJson(options, file.dest)) {
          grunt.verbose.writeln('Saving as JSON to:', file.dest);
          grunt.file.write(file.dest, JSON.stringify(result, null, 2));
          grunt.log.writeln('JSON file `' + file.dest + '` updated.');
          return;
        }

        if (isYaml(options, file.dest)) {
          grunt.verbose.writeln('Saving as YAML to:', file.dest);
          grunt.file.write(file.dest, yaml.stringify(result));
          grunt.log.writeln('YAML file `' + file.dest + '` updated.');
          return;
        }

        grunt.log.error('Could not determine output format for file `' + file.dest +
          '` (expected extention ".yml" or ".json")');
      });
    });

};
