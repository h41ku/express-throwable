import type { Request, Response, RequestHandler, NextFunction } from "express";

export type AsyncErrorCallback = (error: any, request: Request, response: Response) => Promise<void>;
export type AsyncErrorRequestHandler = (error: any, request: Request, response: Response, next: NextFunction) => Promise<void>;
export type AsyncRequestHandler = (request: Request, response: Response, next: NextFunction) => Promise<void>;
export type AsyncFinalizeCallback = (request: Request, response: Response) => Promise<void>;

export declare function errorHandler(callback: AsyncErrorCallback): RequestHandler;
export declare function throwable(handler: RequestHandler): AsyncRequestHandler;
export declare function finalize(callback: AsyncFinalizeCallback): AsyncErrorRequestHandler;
