1 . npm i 
docker compose up -d
npx prisma generate
npx prisma db push 
npx prisma generate

npx tsx src/scripts/seedShops.ts

npm run dev