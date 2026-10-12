import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import healthRouter from './routes/health';
import carsRouter from './routes/api/v1/cars';
import brandsRouter from './routes/api/v1/brands';
import categoriesRouter from './routes/api/v1/categories';
import locationsRouter from './routes/api/v1/locations';
import servicesRouter from './routes/api/v1/services';
import routesRouter from './routes/api/v1/routes';
import blogsRouter from './routes/api/v1/blogs';
import adminBrandsRouter from './routes/api/v1/admin/brands';
import adminCategoriesRouter from './routes/api/v1/admin/categories';
import adminServicesRouter from './routes/api/v1/admin/services';
import adminLocationsRouter from './routes/api/v1/admin/locations';
import adminCarsRouter from './routes/api/v1/admin/cars';
import adminRoutesRouter from './routes/api/v1/admin/routes';
import adminBlogsRouter from './routes/api/v1/admin/blogs';
import adminFaqsRouter from './routes/api/v1/admin/faqs';
import adminTestimonialsRouter from './routes/api/v1/admin/testimonials';
import adminMediaRouter from './routes/api/v1/admin/media';

const app: Application = express();

app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const error: any = new Error('Not allowed by CORS');
      error.status = 403;
      error.name = 'CorsError';
      callback(error);
    }
  }
}));

app.use('/health', healthRouter);
app.use('/api/v1/cars', carsRouter);
app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/locations', locationsRouter);
app.use('/api/v1/services', servicesRouter);
app.use('/api/v1/routes', routesRouter);
app.use('/api/v1/blogs', blogsRouter);

// Admin Routes
app.use('/api/v1/admin/brands', adminBrandsRouter);
app.use('/api/v1/admin/categories', adminCategoriesRouter);
app.use('/api/v1/admin/services', adminServicesRouter);
app.use('/api/v1/admin/locations', adminLocationsRouter);
app.use('/api/v1/admin/cars', adminCarsRouter);
app.use('/api/v1/admin/routes', adminRoutesRouter);
app.use('/api/v1/admin/blogs', adminBlogsRouter);
app.use('/api/v1/admin/faqs', adminFaqsRouter);
app.use('/api/v1/admin/testimonials', adminTestimonialsRouter);
app.use('/api/v1/admin/media', adminMediaRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.name || 'Internal Server Error',
    message: statusCode === 500 ? 'An unexpected database or internal error occurred' : (err.message || 'An error occurred')
  });
});

export default app;








