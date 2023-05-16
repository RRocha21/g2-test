const url = require('url');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('dotenv').config();

const db_url = url.parse(process.env.DATABASE_URL);
const auth = db_url.auth.split(':');

const user = auth[0];
const database = db_url.pathname.substring(1);

function execute_sql_file() {
    exec (
        `psql -U ${user} ${database} < dump.sql`,
    )
}

execute_sql_file();
