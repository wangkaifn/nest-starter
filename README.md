## nestjs 通用模版




## mysql docker 启动
```bash
docker compose -f docker-compose-mysql.yml up -d
```
## mongo docker 启动
```bash
docker compose -f docker-compose-mongo.yml up -d
```

## postgresql docker 启动
```bash
docker  compose -f docker-compose-postgresql.yml up -d
```

## redis docker 启动

```bash
docker compose -f docker-compose-redis.yaml up -d
```


## prisma 命令
```bash
# 初始化迁移文件
npx prisma migrate dev --name init
# 推送数据库
pnpm prisma:db:push

# 重置数据库
prisma:db:reset

```
