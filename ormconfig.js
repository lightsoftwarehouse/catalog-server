module.exports = {
	"name": "default",
	"type": "postgres",
	"host": "suleiman.db.elephantsql.com",
	"port": 5432,
	"username": "nzfzvjrx",
	"password": "uNZkJTTCrOl7GD6c7rObzyIKPT5VUCrO",
	"database": "nzfzvjrx",
	"entities": [ "./src/models/**/*.ts" ],
	"migrations": [ "./src/migrations/**/*.ts" ],
	"cli": {
		"entitiesDir": "./src/models",
		"migrationsDir": "./src/migrations"
	}
};