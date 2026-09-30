import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {

  // Store the authenticated userId on res.locals.userId

 const userId = req.headers['x-user-id']; 
 const IdNumber = Number(userId); 
 if (Number.isNaN(IdNumber) || !userId) {
 res.status(401).json({error: "Unauthorized"}); // status 404 if id number is not a number or there is not userId
 return;
 } 
 res.locals.userId = IdNumber; //attach user id to res.local so other routes can access
 
  next();
}

export default authMiddleware;
