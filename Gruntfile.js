/*jshint global*/
var _proxySnippet = require("grunt-connect-proxy/lib/utils").proxyRequest;
var _dirname = "app";
var _dist = "dist";	
var _doc = "doc";
/*jshint global*/
module.exports = function(grunt){
	"use strict";
	// load all grunt tasks matching the "grunt-*" pattern
	/*jshint global*/
	require("load-grunt-tasks")(grunt);

	/**
	 * [grunt.initConfig configure the tasks with grunt]
	 * @return {[type]}
	 */
	grunt.initConfig({

		pkg : grunt.file.readJSON("package.json"),
		
		// grunt-jshint
		jshint: {
			options: {
				jshintrc: true
			},
			"gruntfile" :{
				files : {
					src : ["Gruntfile.js"]
				}
			},
			"application" : {
				files: {
					src : ["<%=_dirname%>/**/*.js"]
				}
			}
		},

		// grunt-express 
		express : {
			all : {
				options : {
					host:"http",
					port: 8066,
					hostname: "localhost",
					bases : ["app"],
					livereload: true
				}
			}
		},

		// grunt-open
		open :{
			all: {
				path: "<%=express.all.options.host%>://<%=express.all.options.hostname%>:<%=express.all.options.port%>"
			}
		},

		// grunt-watch to keep an eye on the code. 
		watch : {
			all : {
				options: {
	    			dateFormat: function(time) {
			      		grunt.log.write('The watch finished in ' + time + 'ms at' + (new Date()).toString());
			      		grunt.log.write('Waiting for more changes...');
		      		},
		      		livereload: true
			    },
			    files : ["app/**/*.js"],
//			    tasks : ['validate:application']
			}
		}
		
	});

	// register tasks
	grunt.registerTask("validate",["jshint:gruntfile","jshint:application"]);
	grunt.registerTask("server",["express","open","watch"]);
};