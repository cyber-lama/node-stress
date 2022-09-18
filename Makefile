up:
	docker-compose up -d

migration-run:
	docker-compose exec backend yarn migration:run