import express, { Application, Request, Response } from 'express';
import usersRouter from './app/modules/user/users.route';
import cors from 'cors';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/users/', usersRouter);

//testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working successfully');
});

export default app;
