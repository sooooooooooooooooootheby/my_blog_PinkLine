---
title: ufw防火墙使用说明
ai: deepseek-chat
---

::user
ufw防火墙使用说明
::

::assistant

# UFW (Uncomplicated Firewall) 使用说明

UFW 是 Ubuntu 系统上一个简化的防火墙配置工具，它是 iptables 的前端，旨在使防火墙配置更简单。

## 安装 UFW

在大多数 Ubuntu 系统中, UFW 已经预装。如果没有，可以使用以下命令安装：

```bash
sudo apt update
sudo apt install ufw
```

## 基本命令

### 1. 启用/禁用 UFW

```bash
# 启用 UFW
sudo ufw enable

# 禁用 UFW
sudo ufw disable
```

### 2. 查看防火墙状态

```bash
sudo ufw status
# 或显示详细规则
sudo ufw status verbose
```

### 3. 重置防火墙规则

```bash
sudo ufw reset
```

## 规则管理

### 1. 允许/拒绝连接

```bash
# 允许特定端口 (如允许 SSH 的 22 端口)
sudo ufw allow 22

# 允许特定协议和端口 (如允许 TCP 的 80 端口)
sudo ufw allow 80/tcp

# 拒绝特定端口
sudo ufw deny 23
```

### 2. 允许特定 IP 地址

```bash
# 允许特定 IP 的所有连接
sudo ufw allow from 192.168.1.100

# 允许特定 IP 访问特定端口
sudo ufw allow from 192.168.1.100 to any port 22
```

### 3. 允许特定子网

```bash
sudo ufw allow from 192.168.1.0/24
```

### 4. 删除规则

```bash
# 先查看规则编号
sudo ufw status numbered

# 然后根据编号删除规则
sudo ufw delete 2  # 删除编号为2的规则
```

## 应用特定配置

### 1. 限制 SSH 连接

```bash
# 允许 SSH (22端口)
sudo ufw allow 22/tcp

# 或者限制 SSH 只允许特定 IP 访问
sudo ufw allow from 192.168.1.100 to any port 22
```

### 2. 允许 HTTP/HTTPS

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### 3. 允许特定应用程序

UFW 包含一些应用程序配置文件：

```bash
# 查看可用应用程序配置文件
sudo ufw app list

# 允许特定应用程序 (如允许 Nginx)
sudo ufw allow 'Nginx Full'  # 允许 HTTP 和 HTTPS
sudo ufw allow 'Nginx HTTP'  # 仅允许 HTTP
sudo ufw allow 'Nginx HTTPS' # 仅允许 HTTPS
```

## 高级配置

### 1. 设置默认策略

```bash
# 默认拒绝所有传入连接
sudo ufw default deny incoming

# 默认允许所有传出连接
sudo ufw default allow outgoing
```

### 2. 限制连接速率 (防暴力破解)

```bash
# 限制 SSH 连接尝试 (每分钟最多 6 次)
sudo ufw limit 22/tcp
```

### 3. 端口转发

```bash
# 将 8080 端口转发到内部 80 端口
sudo ufw route allow proto tcp from any to any port 8080
sudo sysctl -w net.ipv4.ip_forward=1
# 然后在 /etc/ufw/before.rules 文件中添加 NAT 规则
```

## 日志记录

```bash
# 启用日志记录
sudo ufw logging on

# 设置日志级别 (可选: off, low, medium, high, full)
sudo ufw logging medium

# 查看日志
sudo tail -f /var/log/ufw.log
```

## 注意事项

1. 在启用 UFW 前确保允许 SSH 连接，否则可能被锁定
2. 规则更改后立即生效
3. 复杂的防火墙需求可能需要直接使用 iptables
4. 使用 `sudo ufw status numbered` 可以显示带编号的规则列表，便于删除特定规则

通过以上命令，您可以轻松管理 Ubuntu 系统的防火墙设置，保护系统安全。
::
