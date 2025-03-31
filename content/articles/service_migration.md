---
title: "[随记]将旧服务器上的服务迁移到新服务器"
description: null
data: 2025-02-22T20:55:34.000Z
dataed: null
categories: 运维
file: service_migration
---

最近斥巨资换了个 .moe 的域名, 因为域名在 dynadot 买的, 所以我之前的华为云服务器使用这个域名会被拦截, 索性又斥巨资换了个 cloudcone 的 VPS

> 位于加拿大的服务器
>
> 25刀/Yr 3G2C 240G 4T/Mo 1Mbps
>
> 除了国内访问慢, 延迟高, 其他的真香 😻

目前的计划是华为云的服务器只跑 mysql 服务, 把 api 服务都迁移到新 VPS 上.

本文所有操作都是用命令手操, 如果你问我为什么不用服务器面板? 我只能说宝塔太丑了, 而我也不会docker, 1panel有点上手难度, 直接回归本源使用命令手操.

# 配置 nginx

先安装一下 nginx 配置反代, 方便之后通过域名访问服务.

```bash
sudo apt-get update
sudo apt-get install nginx
```

安装完成后设置一下开机自启并确认一下状态

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

看见绿色的 active (running)就是跑起来了, 庆祝一下!

![run nginx](https://image.s22y.moe/image/service_migration/1.webp)

按下 ctrl + c 退出去.

在正式配置之前我们现在浏览器访问一下看一下是否能够正常访问.

在地址栏输入 ip 地址.

![browser](https://image.s22y.moe/image/service_migration/2.webp)

因为我的域名是在 dynadot 买的, 这家服务商会提供证书注册服务, 以及自动续签, 所以我们只需要下载证书, 然后配置一下 nginx.

![dynadot](https://image.s22y.moe/image/service_migration/3.webp)

使用 WinSCP 把下载下来的证书(.cert)和密钥(.key)文件上传到服务器.

现在我们需要配置 nginx, 这样我们才能启用 https.

按照惯例, 先备份后配置, 方便我们出错了可以回退.

```bash
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
```

使用 vim 配置.

```bash
sudo vim /etc/nginx/nginx.conf
```

进入文件后疯狂按 d, 清除默认配置.

写入自己的配置, 保存退出.

```conf
events {}

http {
        server {
                listen 443 ssl;
                server_name api.s22y.moe;

                # 指定证书和私钥文件路径
                ssl_certificate /home/alice/SSL/s22y.moe.cert;
                ssl_certificate_key /home/alice/SSL/s22y.moe.key;

                # 启用 SSL 协议和加密套件
                ssl_protocols TLSv1.2 TLSv1.3;
                ssl_ciphers HIGH:!aNULL:!MD5;

                # 其他配置
                root /var/www/html;
                index index.html index.htm;

                location / {
                    try_files $uri $uri/ =404;
                }
        }
}
```

重载一下 nginx 的配置

```bash
sudo nginx -t

# 运行了 -t 之后显示 ok 说明配置文件没问题, 才能运行下面的命令重载
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

sudo nginx -s reload
```

这个时候打开浏览器输入 s22y.moe 就会不会显示不安全了, 并且成功启用了 https.

![browser](https://image.s22y.moe/image/service_migration/4.webp)

# 安装 nodejs

因为之后需要使用 pm2, 而 pm2 是需要 nodejs 的, 所以先安装一下 nodejs.

按照我另外一篇文章 [nvm 安装使用](https://blog.s22y.moe/articles/nvm_install) 去通过 nvm 安装和管理 nodejs.

# 安装 pm2 运行服务

pm2 是一个守护进程管理工具, 我一直都用这个工具运行服务, 避免服务重启后需要重新启动服务.

```bash
pnpm install pm2@latest -g
```

使用 WinSCP 传一个服务, 先跑一个试试.

我上传了一个计数器的服务, 进入项目目录, 使用命令运行.

```bash
pm2 start main.js --name count
```

运行成功后, 使用 curl 命令试试能不能正常返回.

```bash
aliceclodia@Wonderland:~$ curl "http://127.0.0.1:9890/get?name=Alice"
{"success":true,"data":{"name":"Alice","count":129}}
```

有返回, 说明服务一切正常, 在服务器本地可以访问, 接下来就需要配置 nginx 让外部也可以访问这个服务.

在之前写的 `api.s22y.moe` 的 `server` 块中加入 `location` 块, 如果访问 `api.s22y.moe/count/` 就会转发到 `127.0.0.1:9890`.

```conf
location /count/ {
        proxy_pass http://127.0.0.1:9890/;
}
```

使用浏览器或者postman测试一下.

```text
https://api.s22y.moe/count/get?name=Alice

{"success":true,"data":{"name":"Alice","count":130}}
```

有返回了, 成功!

现在服务就这样迁移成功了.
