import os
import environ
from celery.schedules import crontab

# environment variables
env = environ.Env(
    DEBUG=(bool, False),
    SECRET_KEY=(str, ''),
    CORS_ORIGIN_ALLOW_ALL=(bool, True),
    DB_PORT=(int, None),
    DB_HOST=(str, ''),
    DB_PASSWORD=(str, ''),
    DB_USER=(str, ''),
    DB_NAME=(str, ''),
    DB_ENGINE=(str, ''),
    MONITORING_API_ENDPOINT=(str, '')
)

environ.Env.read_env(env.str('ENV_PATH', '.env'))


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')
MONITORING_API_ENDPOINT = env('MONITORING_API_ENDPOINT')

ALLOWED_HOSTS = ['*']


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'backend_app',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'megawatt.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'megawatt.wsgi.application'
CORS_ORIGIN_ALLOW_ALL =  env('CORS_ORIGIN_ALLOW_ALL')


DATABASES = {
   'default': {
       'ENGINE': env('DB_ENGINE'), 
       'NAME': env('DB_NAME'),
       'USER': env('DB_USER'),
       'PASSWORD': env('DB_PASSWORD'),
       'HOST': env('DB_HOST'),
       'PORT': env('DB_PORT')
   }
}






# Celery Setup
CELERY_BROKER_URL = 'redis://redis:6379'
CELERY_RESULT_BACKEND = 'redis://redis:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'


# every day at 8am:  0 8 * * *   
# every five minutes: */5 * * * *  
# every 2 minutes: */2 * * * * 

CELERY_BEAT_SCHEDULE = {
    'pull_from_monitoring_service': {
        'task': 'backend_app.views.pull_from_monitoring_service',    
        'schedule': crontab('*/5 * * * *')
    }
}



# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
