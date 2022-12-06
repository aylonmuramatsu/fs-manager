require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  timezone: '-03:00',
  charset: 'utf8',
  collate: 'utf8_general_ci',
};
