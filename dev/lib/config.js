const envPath = __dirname + './.env'

// Default config settings, mysql pass required to use app
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = 3306;
process.env.DB_USER = 'root';
process.env.DB_PASS = '',
process.env.DB = 'employees_db';