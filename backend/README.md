# Build

## Mongo ReplicaSet
-   Run file: docker-compose.yml
-   And hosts config
        127.0.0.1       localhost
        255.255.255.255 broadcasthost
        ::1             localhost
        127.0.0.1       mongo1
        127.0.0.1       mongo2
        127.0.0.1       mongo3
-   Access mongo1, Add ReplicaSet
   
        rs.initiate(
            {
                _id : 'rs0',
                members: [
                { _id : 0, host : "mongo1:27017" },
                { _id : 1, host : "mongo2:27017" },
                { _id : 2, host : "mongo3:27017", arbiterOnly: true }
                ]
            }
        )
    
-   Check ReplicaSet
          `mongosh "mongodb://mongo1:27017,mongo2:27018,mongo3:27019/you_database?replicaSet=rs0"`
-  .env
          `DATABASE_URL mongodb://mongo1:27017,mongo2:27018,mongo3:27019/you_database?replicaSet=rs0`


## BE

.env FRONTEND_BASE_URL= ${FRONTEND_BASE_URL} with Ngrok

```bash
$ npm install
```

Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
