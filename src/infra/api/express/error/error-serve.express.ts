import { NextFunction, Request, Response } from "express";

export class ErrorServeExpress {
    public handler = (err: any, res: Response) => {
        res.status(err.status || 500).json({
            message: err.message || "Internal server error"
        });
    };
}
