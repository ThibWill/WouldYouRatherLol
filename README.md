# Launch 

docker compose up -d
docker exec -it dcc7ead5fa94 sh
npm run prisma:migrate:dev // (put a random name for the migration and delete the folder just after)

=> You can go to localhost:3000/