var SECTION     = /^\[(.+)\]$/,
    SUBSECTION  = /^\[([-\w\d\.]+) \"(.+)\"\]$/,
    COMMENT     = /^[;#]/;

module.exports = function Parser(fileContents) {
    var contentLines = fileContents.split('\n'),
        section, subsection, matches, vars, current,
        i = 0, line;

    this.sections = {};

    for (i; i < contentLines.length; i++) {
        line = contentLines[i].trim();

        if (!line || COMMENT.test(line)) continue;

        if (SECTION.test(line)) {
            section = line.match(SECTION)[1];
            this.sections[section] || (this.sections[section] = {});

            if (SUBSECTION.test(line)) {
                matches      = line.match(SUBSECTION);
                subsection   = '__' + matches[2];

                this.sections[section][subsection] ||
                    (this.sections[section][subsection] = {});
            } else {
                subsection = null;
            }
        } else { // variable
            if (!section) throw new Error('variable outside of section');

            vars = line.split('=');

            if (subsection) {
                current = this.sections[section][subsection];
            } else {
                current = this.sections[section];
            }

            if (vars.length == 1) {
                current[vars[0]] = true;
            } else {
                current[vars[0].trim()] = vars[1].trim();
            }
            /*
            TODO: multivars
            There can be more than one value for a given variable; we say then
            that the variable is multivalued.
            */
        }
    }
}
