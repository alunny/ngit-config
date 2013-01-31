var Parser = require('../parser'),
    fs = require('fs');

exports['parse user config'] = function (test) {
    var contents = fs.readFileSync('test/user-gitconfig', 'utf8'),
        parsed = new Parser(contents);

    test.equal(6, Object.keys(parsed.sections).length);

    test.equal(2, Object.keys(parsed.sections.github).length);
    test.equal(2, Object.keys(parsed.sections.user).length);
    test.equal(20, Object.keys(parsed.sections.alias).length);
    test.equal(6, Object.keys(parsed.sections.color).length);
    test.equal(1, Object.keys(parsed.sections.core).length);
    test.equal(1, Object.keys(parsed.sections.push).length);

    test.done();
}
