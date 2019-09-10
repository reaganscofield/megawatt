build:
	@sudo docker-compose build
migrations:
	@sudo docker-compose run web python manage.py makemigrations
migrate:
	@sudo docker-compose run web python manage.py migrate
run:
	@sudo docker-compose up
test:
	@sudo docker-compose run web python manage.py test
