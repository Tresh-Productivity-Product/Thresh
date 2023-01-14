const { Pool } = require('pg');

// const BRIAN_URI = 'postgres://assojzyg:N8mhtCF41OW-ZC8BPpZAHq8w6MPsyHc-@mahmud.db.elephantsql.com/assojzyg';
PG_URI= 'postgres://lvbqlfxf:cEJx4TZZyOxliTRx09oc_DjhHtXsJESr@isilo.db.elephantsql.com/lvbqlfxf'
PSW= 'cEJx4TZZyOxliTRx09oc_DjhHtXsJESr'
// console.log('URI: ', process.env.PG_URI)

const pool = new Pool({
    connectionString: PG_URI,
    password: PSW,
    port: 3000
});



module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
