# 每日鸡汤语录

<p align="center">
  <img src="./assets/cover.png" alt="每日鸡汤语录 MineAdmin 插件封面" width="100%" />
</p>

`xjlldw/daily-quote` 是 MineAdmin 顶部导航栏插件，不创建菜单。

## 功能

- 顶部工具栏展示每日固定语录
- 点击后弹出详情
- 支持随机换一句
- 支持复制语录
- 支持本地收藏
- 不依赖外部接口

## 安装

```bash
php bin/hyperf.php mine-extension:install xjlldw/daily-quote --yes
```

插件安装后会复制 `web/` 到 MineAdmin 前端插件目录，前端重新构建或开发服务热更新后生效。
