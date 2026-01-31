import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import routes from './routes';
import { NotFoundError, ApiError } from './core/ApiError';
import cors from 'cors';
import connectDB from './database/db';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import client from 'prom-client';
import responseTime from 'response-time';

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;

const Registry = client.Registry;
const register = new Registry();

collectDefaultMetrics({ register: register });

const reqResTime = new client.Histogram({
  name: 'http_express_req_res_time',
  help: 'This tell how much time is taken by req and res',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

const totalReqCount = new client.Counter({
  name: 'total_req',
  help: 'Tells total req',
});

app.use(
  responseTime((req, res, time) => {
    totalReqCount.inc();
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  }),
);

app.use(express.json());

void connectDB();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.get('/health', (req, res) => {
  res.status(200).send('Node server working fine');
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', routes);

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  const metrics = await register.metrics();
  res.send(metrics);
});

app.use((req, res, next) => next(new NotFoundError()));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return ApiError.handle(err, res);
  }
  console.error(err);
  return res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
  });
});

export default app;
