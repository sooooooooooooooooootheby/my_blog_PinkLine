---
title: 如何搭建一个后端服务
description: 在云服务器上搭建一个后端服务
time: 2024-8-15
---

# nvm

因为直接使用`apt-get`安装会自动安装旧版本的node.js，所以我们这里使用nvm安装，同时也方便后期改版本。

从Github将nvm的包下载到服务器上，新建nvm的工作目录，将包解压到工作目录中。

```shell
wget https://github.com/nvm-sh/nvm/archive/refs/tags/v0.39.1.tar.gz
mkdi -p /.nvm
tar -zxvf nvm-0.39.1.tar.gz -C /.nvm
```

> 如果服务器是国内的无法下载Github的资源，也可以在自己的电脑上将包下载下来再使用WinSCP之类的ftp软件复制到服务器上

在一串刷屏后所有的东西都解压完成就需要编辑`~/.bashrc`，如果你使用的是zsh就编辑`~/.zshrc`。

在底部加入nvm的配置信息。

```
# nvm
export NVM_DIR="/.nvm/nvm-0.39.1"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# 这里是nvm的镜像源，如果需要修改镜像源就在这里修改。
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
```

保存退出后执行一下刷新命令使配置生效。

```shell
// bash
source ~/.bashrc

// zsh
source ~/.zshrc
```

此时输入`nvm -v`就能输出版本号了，这也就意味着nvm安装完成。

# node.js

执行`nvm ls-remote`可以输出当前可用的node.js版本。

> 注意：如果命令执行很慢，且只输出了iojs版本，那说明镜像源出问题了，请百度搜索一下可用的镜像源并进行修改。

执行`nvm install 版本号`就可以安装指定版本的node.js了，这里我需要使用`20.11.1`，就执行了`nvm install 20.11.1`。

如果你的服务器在这之前没有安装过其他版本的node.js，执行了安装命令之后直接执行`node -v`就能输出你刚刚安装的版本的版本号了。

# pnpm

在上一步使用nvm安装node.js会自动安装npm，所以我们不需要额外使用过`apt-get`指令安装npm了。

使用pnpm是个人习惯。

```shell
// 修改npm镜像源
npm config set registry https://registry.npmmirror.com
// 全局安装pnpm
npm install -g pnpm
// 初始化pnpm
pnpm setup
```

# MySql

## 安装

`apt-get`可以直接安装新版本的MySql，所以我们直接使用包管理工具安装就好了，不必手动安装。

```shell
// 更新软件包列表
apt-get update

// 安装mysql，（-y选项可以让安装过程所有的提示都为y，不用手动输入）
sudo apt install mysql-server -y

// 运行安全脚本
sudo mysql_secure_installation
```

运行安全脚本会有几个问题。

```shell
// 是否使用VALIDATE PASSWORD组件检测密码强度
VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

Press y|Y for Yes, any other key for No:

// 选择你需要的密码强度策略
There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:

// 是否删除mysql自带用于测试的匿名账户
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) :

// 是否允许root账户远程连接
Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) :

// 是否删除自带用于测试的test数据库
By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) :

// 重新加载特权表使刚刚的选项生效
Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) :
```

## 创建账户

输入`mysql -u root -p`进入mysql，因为我们是刚安装完mysql，所以root账户是没有密码的，提示输入密码直接回车就能进入。

修改root账户的密码。

```mysql
// new_password就是需要修改的密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';

// 刷新权限表
FLUSH PRIVILEGES;
```

安全起见，我们不允许root账户远程连接，而是创建一个普通账户，设置其只能操作单个数据库。

```mysql
// 修改username和password，%是表示可以从任何地方远程连接，你可以修改为你自己的ip地址，或者localhost只允许本地连接
CREATE USER 'username'@'%' IDENTIFIED BY 'password';

// 创建数据库
CREATE DATABASE database_name
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

// 指定账户只能使用blog数据库
GRANT ALL ON database_name.* TO 'username'@'%';

// 刷新权限表
FLUSH PRIVILEGES;
```

## 设置mysql允许远程访问

网上大多数教程教你如何修改mysql远程连接提供的配置文件修改路径多半是错误的，大部分可能会告诉你路径是`/etc/mysql/my.conf`，但我们使用`apt-get`安装的mysql8.0.39的配置文件位于`/etc/mysql/mysql.conf.d/mysqld.cnf`。

编辑配置文件，将`127.0.0.1`修改为`0.0.0.0`，让mysql允许远程访问。

```
// 使用vim编辑
vim /etc/mysql/mysql.conf.d/mysqld.cnf

// 一般是31行
bind-address            = 127.0.0.1
```

这个时候我们在自己的电脑上使用命令行或者图形化工具连接数据库可能会提示连接服务器失败。

![1.png](/image/APIService/1.webp)

只需要重启一下mysql的服务就好了。

```shell
systemctl restart mysql
```

# 部署程序

使用winSCP将后端程序文件复制到root的根目录。

## 直接运行

直接运行node.js程序可以方便在生产环境调试，但是一旦关掉终端程序就会停止运行

```shell
// 进入后端程序文件夹
cd backend

// 安装依赖
pnpm i

// 将程序跑起来
node src/main.js

// 安装nodemon便于调试bug
pnpm install -g nodemon

// 使用nodemon将程序跑起来
nodemon src/main.js
```

![2.png](/image/APIService/2.webp)


## 使用pm2托管后台

```shell
// 安装pm2
pnpm i -g pm2

// 使用pm2将程序跑起来
pm2 start src/main.js
```

```shell
// pm2常用命令
pm2 start app.js            # 启动程序
pm2 ls                      # 列出程序
pm2 stop app.js / "id"      # 暂停程序
pm2 restart app.js / "id"   # 重启程序
pm2 delete app.js / "id"    # 删除程序
```

命令中的id可使用`pm2 ls`指令查看

![3.png](/image/APIService/3.webp)

