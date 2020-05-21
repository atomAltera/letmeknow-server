import {connectToDatabase} from "./db";
import {initializeCore} from "./core";
import {startServer} from "./web";


async function main() {
    // Connecting to database
    const db = await connectToDatabase({
        uri: "mongodb://localhost/letmeknow"
    });
    console.log(`Connected to database (URL)`)

    // Initializing core
    const core = await initializeCore({
        db
    });
    console.log(`Core has been initialized`)

    // Starting web server
    await startServer({
        port: 3000,
        sessionSecret: "q341231232",
        core,
    });
    console.log(`Web server started at port (PORT)`)
}


main()
    .catch(error => console.error(error))
