# Megawatt Solution 
===============

1. User Interface Screenshot

<p align="center">
  <img src="Screenshot.png" width="350" alt="screenshot"> 
</p> <br />

<p align="center">
  <img src="Screenshot0.png" width="350" alt="screenshort0">
</p>

2. Requirements

Requirements <br />
    : Linux Distro or Darwin  <br />
    : Note (for windows users your will need to review Makefile and change sudo priviledge) <br />
    : Docker <br />

Please note that every commmand you run will promp you to provide your password <br />

3. Clone Repo

Clone repository <br />
run command
```
    $ git clone https://github.com/reaganscofield/megawatt.git
```

Navigate to project directory

```
    $ cd megawatt
```

4. Setup Environment Variables

Back-End environment variables <br />

create file ".env" in root directory <br />

```
    $ touch .env
```
and add the below code in your .env file <br />
```
    DEBUG=True
    SECRET_KEY='auze%a^qyec-mvy^!9yg+(6zg#vpdgf_$#&q=1%)w5f(+l2v+h'
    CORS_ORIGIN_ALLOW_ALL=True

    DB_PORT=5432
    DB_HOST=postgres
    DB_PASSWORD=postgres
    DB_USER=postgres
    DB_NAME=megawatt
    DB_ENGINE=django.db.backends.postgresql_psycopg2
    MONITORING_API_ENDPOINT=http://monitoring_service_api:5000/?plant-id=2&from=2019-01-01&to=2019-02-01

```

Front-END environment variables <br />

create file  "frontend_app/.env" in root directory <br />
```
    $ touch frontend_app/.env
```
and add the below code <br />
```
    REACT_APP_HOST_NAME=127.0.0.1
    REACT_APP_HOST_PORT=4700
```

5. Build and Install Dependencies

Build<br />
run command:
```
    $ make build
```

Run <br />
run command
```
    $ make run
```

6. Database Set up

Your can open your browser to access PGADMIN INTERFACE <br />

URL :  http://127.0.0.1:5558  <br />

now you can login to your PGADMIN INTERFACE with  <br />

email : pgadmin4@pgadmin.org <br />
password : admin <br />


Create PostgreSQL Server in your PGADMIN INTERFACE with <br />

name : postgres <br />
host : postgres <br />
port : 5432 <br />
username : postgres <br />
password : postgres <br />


Now Create Database <br />

name : megawatt <br />


Stop your docker images and run it again <br />
run command

```
    $ ctrl + c
```

```
    $ make run
```

Now Run Migrations Commands  <br />

Open new terminal in your root directory<br />
run command

```
    $ make migrations
```

Migrate  <br />
run command

```
    $ make migrate
```

Run Your Application <br />
run command

```
    $ make run 
```

Note: I have set Periodics Tasks to pull data from monitoring service every day at midnight but you can change the argument in order to get some data to test with, follow the below instructions. when you finish making change you might need to stop your project and run it again to apply change you have made.  <br />

Inside "megawatt/settings.py" line 106 change "crontab('*/5 * * * *')" argument  to below: <br />

every day at midnight:  minute=0, hour=0  <br />
every five minutes:     */5 * * * *       <br />
every 2 minutes:       */2 * * * *        <br />

```
    CELERY_BEAT_SCHEDULE = {
        'pull_from_monitoring_service': {
            'task': 'backend_app.views.pull_from_monitoring_service',
            'schedule': crontab(minute=0, hour=0)
        }
    }
```

Your Back-End Service is EXPOSE on    127.0.0.1:4700 <br />
Your Front-End Service is EXPOSE on   127.0.0.1:6099 <br />
Your Database Service is EXPOSE on    127.0.0.1:5558 <br />
Your Monitoring Service is EXPOSE on  127.0.0.1:5001 <br />
