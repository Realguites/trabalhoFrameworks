import { Router } from 'express';
import funcionarioRouter from './funcionario.routes';
import loginRouter from './login.routes';
import departamentoRouter from './departamento.routes';
import userRouter from './user.routes';



const routes = Router();



routes.use('/funcionario',funcionarioRouter);
routes.use('/departamento',departamentoRouter);
routes.use('/user',userRouter);
routes.use('/login',loginRouter);

export default routes;
