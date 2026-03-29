1 . npm i 
docker compose up -d
npx prisma generate
npx prisma db push 
npx tsx src/scripts/seedShopsFromJSON.ts
npm run dev