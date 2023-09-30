db:
	sudo docker run --name socPostgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=soc_db -d -p 5432:5432 postgres
	sudo docker run --name socPostgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=soc_db -d -p 5432:5432 soc-postgis-image
build:
	sudo docker build -t soc-postgis-image .

connect:
	sudo docker exec -it socPostgres psql -U postgres

.PHONY: db build connect