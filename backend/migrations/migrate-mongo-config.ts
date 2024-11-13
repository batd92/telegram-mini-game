const config = {
    mongodb: {
        url: 'mongodb://mongo1:27017,mongo2:27018,mongo3:27019',

        databaseName: 'you_database',

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },

    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
    useFileHash: false,
    moduleSystem: 'commonjs',
};

module.exports = config;