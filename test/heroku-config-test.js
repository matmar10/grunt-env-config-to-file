'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.herokuConfig = {
  setUp: function (done) {
    process.env.DATABASE_URL = 'postgresql://user:pass@host:port/database';
    process.env.RABBITMQ_BIGWIG_URL = 'amqp://user:pass@host:10000/vhost';
    done();
  },
  defaultOptions: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/production.json');
    var expected = grunt.file.read('test/expected/production.json');
    test.equal(actual, expected,
      'Should convert default environment variables to configuration properties in the specified file(s)');
    test.done();
  }
};
