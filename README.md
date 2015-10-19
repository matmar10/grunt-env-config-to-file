# grunt-heroku-config

> Install heroku configuration from environment variables as config files (JSON or YAML)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-heroku-config --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-heroku-config');
```

## The "herokuConfig" task

### Overview
In your project's Gruntfile, add a section named `herokuConfig` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  herokuConfig: {
    options: {
      // Task-specific options go here.
    },
    yourTarget: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.envVars
Type: `Object`
Default value: `{ 'DATABASE_URL': 'DATABASE_URL', 'RABBITMQ_BIGWIG_URL': 'RABBITMQ_BIGWIG_URL' }`

A object mapping the environment variable to the property that should be saved in the target output files.

### Usage Examples

#### Default Options

In this example, the default options are used.
It adds the `DATABASE_URL` and `RABBITMQ_BIGWIG_URL` properties to the `config/production.json` file.

```js
grunt.initConfig({
  herokuConfig: {
    options: {},
    files: { 'config/production.json': 'config/production.json' }
  },
});
```

#### Custom Options

In this example, environment properties are mapped to custom names and assigned to two output config files.

```js
grunt.initConfig({
  herokuConfig: {
    options: {
      map: {
        DATABASE_URL: 'dbUrl',
        NODE_ENV: 'env',
        RABBITMQ_BIGWIG_URL: 'rabbitMQUrl'        
      }
    },
    files: {
      'config/development.json': 'config/development.json',
      'config/production.json': 'config/production.json'
    }
  },
});
```

## Contributing

### Code style

Code style is enforced using jsbeautifierq.

Run `grunt jsbeautifier:test` to validate.

Run `grunt jsbeautifier:dev` to reformat if you have any failures on the test pass.

### Code quality

Code quality is enforced using jshint.

Run `grunt jshint` to validate.

## Release History

### 0.0.1

Initial release. Add working barebones version
