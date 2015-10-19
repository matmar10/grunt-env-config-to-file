# grunt-env-config-to-file

> Install heroku configuration from environment variables as config files (JSON or YAML)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-env-config-to-file --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-env-config-to-file');
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
  envConfigToFile: {
    options: {},
    files: { 'config/production.json': 'config/production.json' }
  },
});
```

#### Custom Mapping

In this example, environment properties are mapped to custom nested properties and assigned to two output config files.

Also note that multiple source files are includes for the development version of the output config.

```js
grunt.initConfig({
  herokuConfig: {
    options: {
      map: {
        DATABASE_URL: 'postgres.connectionUrl',
        NODE_ENV: 'env',
        RABBITMQ_BIGWIG_URL: 'worker.rabbitmq.connectionUrl'        
      }
    },
    files: {
      'config/development.json': [
        'config/dev-defaults.json',
        'config/local-dev.json'
      ]
    }
  },
});
```

Assuming the following contents of the `config/dev-defaults.json`

```
{
  "debug": true
}
```

And of `config/local-dev.json`

```
{
  "sendEmail": false
}
```

The resulting file would look like this:

```
{
  "debug": true,
  "sendEmail": false,
  "postgres": {
    "connectionUrl": "[ value from process.env.DATABASE_URL ]"
  },
  "env": "[ value from process.env.NODE_ENV ]",
  "worker": {
    "rabbitmq": {
      "connectionUrl": "[ value from process.env.RABBITMQ_BIGWIG_URL ]"
    }
  }
}
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

### 0.1.0

* Add support for YAML
* Use object mapper to allow for generic nested property mapping
* Rename task to be more generic (was grunt-heroku-config)

### 0.1.1

Update release notes to match.

### 0.1.2

Update release notes to match. For real this time.
