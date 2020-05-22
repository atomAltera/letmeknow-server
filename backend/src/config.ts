import {config} from "dotenv";

config();

export const DATABASE_URI = process.env.DATABASE_URI!;
export const SERVICE_PORT = parseInt(process.env.SERVICE_PORT!);
export const SESSIONS_SECRET = process.env.SESSIONS_SECRET!;

// TODO: Implement some validation
