import { Request, Response, NextFunction } from 'express';
export function logger(req: Request, res: Response, next: NextFunction) {
  const currentDate = new Date();
  const currentDateTime = currentDate.toLocaleString();
  console.log(`[${currentDateTime}] ${req.method} ${req.originalUrl}`);
  next();
}
