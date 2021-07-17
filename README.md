# Uwall-frontend

> 校园万能墙前端

后端地址 `golang` : [jsun969/Uwall-backend](https://github.com/jsun969/Uwall-backend)

## 如何部署

> 请事先阅读后端 Readme 配置后端

1. 下载所有文件到本地 , 并在本地配置好 `yarn` / `npm` 环境
2. `yarn` 或 `npm install`
3. 基本配置
   1. 创建 `.env.production.local` 文件
   2. 按照 `.env.development` 文件进行配置  
      *推荐后端地址配置为* `REACT_APP_API='/api'`
4. `yarn build` 构建
5. 将生成的 `build` 文件夹中的文件放入服务器

## Todo List

- [ ] 图片上传
- [x] 图片显示
- [ ] 懒加载 / 无限滚动 (检测是否滚动到底部再请求)
- [ ] 页面切换滑动动画
