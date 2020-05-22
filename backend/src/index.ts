import {connectToDatabase} from "./db";
import {initializeCore} from "./core";
import {startServer} from "./web";
import {DATABASE_URI, SERVICE_PORT, SESSIONS_SECRET} from "./config";


async function main() {
    // Connecting to database
    const db = await connectToDatabase({
        uri: DATABASE_URI,
    });
    console.log(`Connected to database (${DATABASE_URI})`)

    // Initializing core
    const core = await initializeCore({
        db
    });
    console.log(`Core has been initialized`)

    // Starting web server
    await startServer({
        port: SERVICE_PORT,
        sessionSecret: SESSIONS_SECRET,
        core,
    });
    console.log(`Web server started (http://localhost:${SERVICE_PORT})`)
}


main()
    .catch(error => console.error(error))
