module.exports = {
	mongodbMemoryServerOptions: {
		binary: {
			version: '5.0.5',
			skipMD5: true,
		},
		autoStart: false,
		instance: {
			dbName: 'jest',
		},
	},
}
