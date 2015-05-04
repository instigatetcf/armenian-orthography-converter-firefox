module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');

    var copy = {
        main: {
            files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'bower_components/armenian-orthography-converter/dest/',
                    src: ['mashtots.min.js'],
                    dest: 'dest/skin/inject/'
                }
            ]
        },
        dev: {
            files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'bower_components/armenian-orthography-converter/src/',
                    src: ['mashtots.js', 'mashtots-dom.js'],
                    dest: 'dest/skin/inject/'
                }
            ]
        }
    };

    var replace = {
        main: {
            options: {
                patterns: [
                    {
                        match: 'files',
                        replacement: 'this.injectScript(\'chrome://mashtots/skin/inject/mashtots.min.js\');'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    src: ['dest/content/overlay.js'],
                    dest: ''
                }
            ]
        },
        dev: {
            options: {
                patterns: [
                    {
                        match: 'files',
                        replacement: 'this.injectScript(\'chrome://mashtots/skin/inject/mashtots.js\');\n' +
                             '        this.injectScript(\'chrome://mashtots/skin/inject/mashtots-dom.js\');'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    src: ['dest/content/overlay.js'],
                    dest: ''
                }
            ]
        }
    };

    var clean = {
        dest: 'dest/'
    }

    grunt.initConfig({
        copy: copy,
        replace: replace,
        clean: clean
    });

    grunt.registerTask('build', ['clean:dest', 'copy:main', 'replace:main']);
    grunt.registerTask('build-dev', ['clean:dest', 'copy:dev', 'replace:dev']);
};
