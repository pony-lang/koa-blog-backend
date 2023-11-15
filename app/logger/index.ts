/*
 * @Author: bin
 * @Date: 2023-11-07 16:01:32
 * @LastEditors: bin
 * @LastEditTime: 2023-11-08 11:20:28
 * @objectDescription: 入口文件
 */
import * as log4js from "log4js";
log4js.configure({
  appenders: {
    cheese: { type: "file", filename: "logs/cheese.log" },
    access: { type: "file", filename: "logs/access.log" }
  },
  categories: {
    default: { appenders: ["cheese"], level: "info" },
    access: { appenders: ["access"], level: "info" }
  },
});
export const Accesslogger = log4js.getLogger('access');
export default log4js.getLogger()