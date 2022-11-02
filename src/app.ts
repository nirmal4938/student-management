import cors from 'cors';
import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import StudentRouter from './routes/studentRoute';

const app = express();
app.use(express.json());
app.use(cors())
const port = 4300;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "student_db",
  entities: ["src/entites/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

app.use('/student', StudentRouter);

AppDataSource.initialize()
  .then(() => {
    console.log(`Database connected successfully`);

    app.listen(port, () => {
      console.log(`Server is lestening on ${port}`);
    });
  })
  .catch((err) => console.log(`Error Occured:: ${err}`));

