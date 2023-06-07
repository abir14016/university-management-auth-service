import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/users/', UserRoutes);

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x);
//   //   Promise.reject(new Error('Unhandled Promise Rejection'));
// });

//global error handler
app.use(globalErrorHandler);

export default app;
