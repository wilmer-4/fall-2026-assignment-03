import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // TODO: Student implementation - Part 1: Authentication Middleware
  // Store the authenticated userId on res.locals.userId

 const userId = req.headers['x-user-id']
 const IdNumber = Number(userId)
 if (Number.isNaN(IdNumber) || !userId) {
 res.status(401).json({error: "Unauthorized"});
 return;
 } 
 res.locals.userId = IdNumber;
 
  next();
}

export default authMiddleware;
