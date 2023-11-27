/*
 * @Author: bin
 * @Date: 2023-11-07 13:59:05
 * @LastEditors: bin
 * @LastEditTime: 2023-11-07 14:00:27
 * @objectDescription: 入口文件
 */
const config = {
	db: {
		db_host: process.env.DB_HOST,
		db_name: process.env.DB_NAME,
		db_user: process.env.DB_NAME,
		db_port: process.env.DB_NAME,
	},
	server: {
		port: process.env.SERVER_PORT,
	},
	jwt: {
		secretKey: process.env.SECRET_KEY,
		expire: process.env.EXPIRE,
	},
}
export default config
