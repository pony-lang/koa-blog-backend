/*
 * @Author: bin
 * @Date: 2023-11-01 15:41:48
 * @LastEditors: bin
 * @LastEditTime: 2023-11-07 14:03:06
 * @objectDescription: 入口文件
 */
import run from './app'
import config from './app/config'
run(config.server.port)