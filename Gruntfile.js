module.exports = function(grunt) {
    var log = grunt.log.writeln;
    grunt.task.registerTask('check', 'validate json files',
    function() {
        var file_list = grunt.file.expand('data/**/*');
        for (var i = 0; i < file_list.length; i++) {
            if (grunt.file.isFile(file_list[i])) {
                try {
                    grunt.file.readJSON(file_list[i]);
                } catch(err) {
                    try {
                        var content = grunt.file.read(file_list[i]);
                        content = "{" + content + "}";
                        JSON.parse(content);
                    } catch(err) {
                        grunt.log.errorlns('invalid:' + file_list[i]);
                    }
                }
            }
        }
    });
}
