import { Request } from 'express';

export type LoginRequest = Request & { user: any };
