import type { NextFunction, Request, Response } from "express";

type AsyncFunction = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<any>;

export function asyncHandler(fn: AsyncFunction) {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

// Usage:
// router.get('/users', asyncHandler(async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// }));
