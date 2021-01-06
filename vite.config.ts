/*
 * @Author: zyj
 * @Date: 2020-12-26 15:12:46
 * @LastEditors: zyj
 * @LastEditTime: 2021-01-06 16:00:35
 * @Description: file content
 * @FilePath: /vite-element-plus/vite.config.ts
 */
import path from 'path'
import { UserConfig } from 'vite'

// const env = loadEnv(
//     'mock', // mode
//     process.cwd(), // root
//     '' // prefix (defaults to "VITE_")
// )

// console.log(env)

const config:UserConfig = {
    // base: '/element-plus-admin',
    //extensions vite 暂时不支持，观望中
    alias: {
        '/@/': path.resolve(__dirname, 'src')
    },
    open: true,
    assetsDir: 'public',
    proxy: {
        '/api': {
            target: 'http://localhost:3001/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    },
    port: 3002,
    optimizeDeps: {
        include: ['axios', 'NProgress', 'mockjs']
    }
}
export default config