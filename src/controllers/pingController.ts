import { Request, Response } from "express";

export default function pingCheck(_: Request, res: Response) {
  return res.json({ message: "Ping Ok" });
}
