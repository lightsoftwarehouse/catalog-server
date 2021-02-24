const sourceFolder = (process.env.NODE_ENV === "production") ? "dist" : "./src";
const fileExtension = (process.env.NODE_ENV === "production") ? "js" : "ts";

export default {
	"name": "default",
	"type": "postgres",
	"host": "suleiman.db.elephantsql.com",
	"port": 5432,
	"username": "nzfzvjrx",
	"password": "uNZkJTTCrOl7GD6c7rObzyIKPT5VUCrO",
	"database": "nzfzvjrx",
	"synchronize": true,
	"logging": false,
	"entities": [ `${sourceFolder}/models/*.${fileExtension}` ],
	"migrations": [ `${sourceFolder}/migrations/*.${fileExtension}` ],
	"subscribers": [ `${sourceFolder}/subscriber/*.${fileExtension}` ],
	// "entities": [ "./src/models/*.ts" ],
	// "migrations": [ "./src/migrations/*.ts" ],
	// "subscribers": [ "./src/subscriber/*.ts" ],
	"cli": {
		"entitiesDir": "./src/models",
		"migrationsDir": "./src/migrations",
		"subscribersDir": "./src/subscriber"
	}
}