const { Accounts } = require("./src/schemas/Accounts");
const { Passwords } = require("./src/schemas/Passwords");
const { Friendships } = require("./src/schemas/Friendships");
const { Friend_Invitations } = require("./src/schemas/Friend_Invitations");
const { Messages } = require("./src/schemas/Messages");
const { Room_Members } = require("./src/schemas/Room_Members");
const { Rooms } = require("./src/schemas/Rooms");



const express = require('express');
const cors = require('cors');
const chalk = require('chalk');

const CONFIG = require('./src/config/config');
const db = require('./src/config/connection');
const routes = require('./src/routes');

const app = express();
const PORT = CONFIG.port ?? 5000;

app.use(cors(CONFIG.cors));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes
app.use('/api/v1', routes);

// setting this to true will drop all tables and seed new data
const reset = false;

// sync sequelize with sql db
// immediately invoked function necessary to run await async code
// no top level await available here (only in es modules/mjs)
(async function main() {
    try {
        await db.authenticate();
        console.log(chalk.green('SUCCESSFULLY CONNECTED TO DB'));

        // force will drop all tables and recreate them
        await db.sync({ force: reset });
        console.log(chalk.green("SUCCESSFULLY SYNCED DB"));

        // seeding data
        if (reset) {
            // dynamic imports
            // should help with faster startup if not in use
            console.log(chalk.yellow("LOADING SEEDER"));
            const { seeder } = require('./src/database/seeder');

            console.log(chalk.yellow('RUNNING SEEDER'));
            await seeder();

            console.log(chalk.green('FINISHED SEEDING'));
        }

        app.listen(PORT, (error) => {
            if (error) {
                console.log(chalk.red(`FAIL TO LISTEN ON PORT ${PORT}`));
                process.exit(1);
            }
            console.log(chalk.green(`LISTENING TO PORT ${PORT}`));
        });
    }
    catch (error) {
        console.log(chalk.red('ERROR STARTING SERVER', error));
        process.exit(1);
    }
})();

// https://nodejs.org/api/process.html#process_event_uncaughtexception
// https://stackoverflow.com/a/40867663
// used for cleaning up the application and then shut down
process.on('uncaughtException', (error, origin) => {
    console.log(`AN UNCAUGHT ERROR OCCURED AT ${origin}`);
    console.log('THE UNCAUGHT ERROR', error);
    process.exit(1);
});
