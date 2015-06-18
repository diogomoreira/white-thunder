/*global module:false*/

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: [
					'components/jquery/dist/jquery.min.js',
					'components/**/assets/javascripts/*.min.js',
					'_assets/scripts/*.js'
				],
				dest: 'assets/scripts/app.main.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: 'assets/scripts/app.main.js',
				dest: 'assets/scripts/app.main.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'assets/stylesheets/main.css': '_assets/stylesheets/main.scss',			 
				}
			}
		},
		watch: {
			sass: {
				files: ['_assets/stylesheets/**'],
				tasks: ['sass']	
			},
			scripts: {
				files: ['_assets/scripts/**'],
				tasks: ['concat', 'uglify']
			}
		},
		copy: {
			bootstrap: {
				files: [
					{expand: true, cwd: 'components/bootstrap-sass/assets/fonts/', src: ['**'], dest: 'assets/fonts/'}
				]
			},
			fontawesome: {
				files: [
					{expand: true, cwd: 'components/fontawesome/fonts/', src: ['**'], dest: 'assets/fonts/'}
				]
			}
		},
		imagemin: {
			options: {
				cache: false
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: 'assets/images'
				}]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

};
