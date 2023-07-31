## Getting Started
The following instructions will get you a copy of this project and you can run the project on your local machine or you can try the demo without any setup

### Prerequisites
You need to install the following software:

* Node

* npm

* Python

### Installation
> Install npm packages for reactjs frontend 

```shell
$ npm install 
```

> Install python virtual environment

```shell
$ pyton -m venv venv
$ source venv/bin/activate
```

> Install python packages for django backend

```shell
$ cd backend
$ pip install -r requirements.txt
```

### Usage
> Create database file and make migrations
```shell
$ cd backend
$ python manage.py makemigrations
$ python manage.py migrate
```

> Start Django backend server
```shell
$ cd backend
$ python manage.py runserver
```

> Start React.js front end
```shell
$ npm start
```

