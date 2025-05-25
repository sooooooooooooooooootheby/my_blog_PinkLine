---
title: 修改ssh端口并在ufw放行
ai: deepseek-chat
---

::user
修改ssh端口并在ufw放行
::

::assistant
# 修改SSH端口并在UFW放行

## 1. 修改SSH端口

### 步骤1: 编辑SSH配置文件
```bash
sudo nano /etc/ssh/sshd_config
```

### 步骤2: 找到并修改端口号
找到以下行(可能被注释掉):
```
#Port 22
```
取消注释并修改为新的端口号(例如2222):
```
Port 22
Port 2222
```
(建议保留22端口直到确认新端口工作正常)

### 步骤3: 保存并退出
按 `Ctrl+X`，然后按 `Y` 确认，最后按 `Enter` 保存。

### 步骤4: 重启SSH服务
```bash
sudo systemctl restart sshd
```

## 2. 使用UFW放行新端口

### 步骤1: 检查UFW状态
```bash
sudo ufw status
```

### 步骤2: 放行新SSH端口(例如2222)
```bash
sudo ufw allow 2222/tcp
```

### 步骤3: 启用UFW(如果尚未启用)
```bash
sudo ufw enable
```

### 步骤4: 验证规则
```bash
sudo ufw status numbered
```

## 3. 测试新SSH端口

### 从另一个终端测试连接
```bash
ssh -p 2222 用户名@服务器IP
```

### 如果测试成功，可以移除原22端口的规则
```bash
sudo ufw delete allow 22/tcp
```

### 可选: 在sshd_config中禁用22端口
编辑 `/etc/ssh/sshd_config`，注释掉或删除 `Port 22` 行，然后重启SSH服务:
```bash
sudo systemctl restart sshd
```

## 注意事项
1. 确保在修改前有其他方式访问服务器，以防SSH连接失败
2. 建议先同时开放新旧端口，测试成功后再关闭旧端口
3. 如果使用云服务器，还需在云平台的安全组/防火墙中放行新端口
4. 选择端口时应避免使用常见服务端口(建议在1024-49151之间)

完成以上步骤后，您的SSH服务将在新端口上运行，并且UFW防火墙已正确配置允许该端口的连接。
::