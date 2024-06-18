import {connectToDatabase} from "./db";
import {initializeCore} from "./core";
import {startServer} from "./web";
import {DATABASE_URI, SERVICE_PORT, SESSIONS_SECRET} from "./config";
import {launchScheduler} from "./scheduler";


async function main() {
    // Connecting to database
    const db = await connectToDatabase({
        uri: DATABASE_URI,
    });
    console.log(`Connected to database (${DATABASE_URI})`)

    // Initializing core
    const core = await initializeCore({
        db,
        attemptTimeoutInSeconds: 10,
        maxAttemptCount: 2,
    });
    console.log(`Core has been initialized`)

    console.log(`Removing all hits`)
    await core.hit.cleanUp();

    // Starting scheduler
    const scheduler = await launchScheduler({
        core,
        cyclePeriodInSeconds: 1,
    });

    // Starting web server
    await startServer({
        port: SERVICE_PORT,
        sessionSecret: SESSIONS_SECRET,
        core,
        scheduler,
    });
    console.log(`Web server started (http://localhost:${SERVICE_PORT})`)
}


main()
    .catch(error => console.error(error))
