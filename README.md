# 🚀 To-Do Project for Testing

## → Instruction for todo-frontend folder

```bash
cd todo-frontend
npm i
npm run dev
```

## → Instruction for todo-backend folder

```bash
cd todo-backend
npm i
```
### 1. make a .env file and enter your local postgress link in that file, and your file should be looking like this :

```bash
DATABASE_URL="postgres://postgres:yourpassword@localhost:5432/todoist"
```

here todoist is my table name , so add according to your table name

### 2. Now run the backend server 

```bash
npx ts-node src/index.ts
```


