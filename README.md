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

3. Clone Repo and Build Install Dependencies

Clone repository <br />
run command
```
    $ git clone https://github.com/reaganscofield/megawatt.git
```

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

4. Database Set up

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


Stop your docker images <br />
run command

```
    $ ctrl + c
```

Setup Environment Variables <br />

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

Now Run Migrations Commands  <br />

Makemigrartions <br />
run command

```
    $ make migrations
```

Migrate  <br />
run command

```
    $ make migrate
```

Great Good Job! you haven't yet finished so let now run last commands  <br />

Run Your Application <br />
run command

```
    $ make run 
```

to generate some data to test with you might need to change periodic function decorate  
parameter from "60*60*24" to "60*2" and then run the bellow periodic command and wait for 2 minutes
after to minutes function will be called and it will auto pull data from hardcoded module and save
to PostgreSQL database <br />

inside  "backend_app/views.py" line 20

```
@background(schedule=60*60*24)  # change schedule value to two minnutes 60*2
def pull_from_monitoring_service():
    monitoring_data = hardcoded_data
    convert_to_valid_data = []

    for data in monitoring_data:
        _data = {
            "datetime": data['datetime'],
            "expected": json.dumps(data['expected']),
            "observed": json.dumps(data['observed'])
        }
        convert_to_valid_data.append(_data)

    for create in convert_to_valid_data:
        serializer = DataPointSerializer(data=create)
        if serializer.is_valid(raise_exception=True):
            obj = DataPoint.objects.create(
                datetime = serializer['datetime'].value,
                expected = serializer['expected'].value,
                observed = serializer['observed'].value
            )
            obj.save()
            print("Success Created: {}".format(obj.id))
        else:
            print('error ', serializer.errors)
```

For Periodic Task <br />

you need to run another command which will run periodic task <br />
in every 24 hours, in the same terminal open new terminal tab <br />
and run this command. <br />

```
    $ make task
```

Your Back-End Service is EXPOSE on 127.0.0.1:4700 <br />
Your Front-End Service is EXPOSE on 127.0.0.1:6099 <br />
Your Database Service is EXPOSE on 127.0.0.1:5558 <br />
Your Monitoring Service is EXPOSE on 127.0.0.1:5001 <br />
