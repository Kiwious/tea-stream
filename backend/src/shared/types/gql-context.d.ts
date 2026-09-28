import type { Request, Response } from 'express'

interface GqlContext {
	req: Request
	res: Response
}
