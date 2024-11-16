---
title: DVWA靶场记录-Brute Force
data: '2024-8-22T14:22:33.000Z'
dataed: null
categories: 网络攻防
---

# 写在前面

本文对DVWA的Brute Force爆破过程进行记录，并且对源代码进行检查，查看每个等级的区别。

因为高等级的防护都只是增加暴力破解的时间和难度，并没有记录的必要，所以只对low等级进行记录。

# 开始爆破

启动Burp Suite的代理，在两个输入框随便输入点什么，点击 Login 发送数据包。

![1](/image/DVWA-BruterForce/1.webp)

Burp Suite成功获取到带有 username 和 password 的数据包，将其通过 Action 发送到 Intruder 。

![2](/image/DVWA-BruterForce/2.webp)

在 Intruder 页面下分别选中 username 和 password 的值，点击`add§`打上标记。

由于我们这里有多个变量，所以需要将 Attack type 切换到 Cluster bomb 。

![3](/image/DVWA-BruterForce/3.webp)

在Intruder 页面下切换到 Payloads 选项卡，在 Payload settings 块下点击 Load... 选择加载字典文件。

由于我们这里有两个变量，所以还需要将 Payload set 切换到 2 ，再加载一次字典。

这里的 1 和 2 就对应这前面第几个变量，例如第一个变量是 username 那么我们 Payload set 1 就加载用户名相关的字典，第二个变量是 password 那么我们 Payload set 2 就加载密码相关的字典，以此类推

![4](/image/DVWA-BruterForce/4.webp)

随后点击 Start attack 开始暴力破解。

破解了一会点击 Length 筛选长度，发现有一个包长度比其他几个包多了一个字节，点击查看响应，发现已经成功进入。

但是仔细观察就会发现，这是 sql注入 导致的，后面几个4672字节的包返回的响应也是成功进入，这是因为我们的设定的难度为 Low 所以不管是暴力破解还是 sql注入 都可以成功进入。

又跑了一会后出现了两个字节为4666的包，点击查看响应发现成功进入，在网站中尝试也成功进入。

由此成功使用暴力破解获取用户名密码。

![5](/image/DVWA-BruterForce/5.webp)

![6](/image/DVWA-BruterForce/6.webp)

![7](/image/DVWA-BruterForce/7.webp)

# 检查源代码

由于我并不会php，只能粗略看懂部分代码，所以为了方便和准确性，代码中的注释由[kimi.ai](https://kimi.moonshot.cn/)生成，用于参考。

## 等级为low

通过源代码我们可以发现 username 和 password 通过变量获取之后会将 password 进行 md5 加密，虽然 md5 加密不会对爆破产生任何影响，但是这种习惯可以保证数据库泄露时不会泄露用户的原始密码。

之后通过sql语句对 username 和 password 进行查询，根据返回的结果数量进行对应的文字展示。

```php
<?php

// 检查是否接收到了GET请求中的'Login'参数
if(isset($_GET['Login'])) {
    // 从GET请求中获取用户名
    $user = $_GET['username'];

    // 从GET请求中获取密码，并使用md5进行加密
    $pass = md5($_GET['password']);

    // 构造SQL查询语句，用于验证用户名和密码
    $query = "SELECT * FROM `users` WHERE user = '$user' AND password = '$pass';";

    // 执行SQL查询，如果失败则输出错误信息
    $result = mysqli_query($GLOBALS["___mysqli_ston"], $query) 
        or die('<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_error($GLOBALS["___mysqli_ston"]) : 
        (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>');

    // 如果查询结果存在且只有一行数据，表示用户验证成功
    if($result && mysqli_num_rows($result) == 1) {
        // 获取用户详细信息
        $row = mysqli_fetch_assoc($result);
        $avatar = $row["avatar"];

        // 输出欢迎信息和用户头像
        echo "<p>Welcome to the password protected area {$user}</p>";
        echo "<img src=\"{$avatar}\" />";
    }
    // 如果查询结果不匹配，表示登录失败
    else {
        echo "<pre><br />Username and/or password incorrect.</pre>";
    }

    // 关闭数据库连接
    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

?>
```

## 安全等级为Medium

在 username 和 password 处理时，对其进行了转义，以防止sql注入。

在登录失败时会等待两秒后显示错误信息，这样就能减缓暴力破解的速度。

```php
<?php

// 检查GET请求中是否包含'Login'
if (isset($_GET['Login'])) {
    // 清理并转义用户名输入，防止SQL注入
    $user = $_GET['username'];
    $user = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $user) : 
        ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // 清理并转义密码输入，防止SQL注入
    $pass = $_GET['password'];
    $pass = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $pass) : 
        ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
    // 使用md5函数对密码进行加密
    $pass = md5($pass);

    // 构造SQL查询语句，用于验证用户名和密码
    $query = "SELECT * FROM `users` WHERE user = '$user' AND password = '$pass';";
    // 执行SQL查询，如果失败则输出错误信息
    $result = mysqli_query($GLOBALS["___mysqli_ston"], $query) 
        or die('<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_error($GLOBALS["___mysqli_ston"]) : 
        (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>');

    // 如果查询结果存在且只有一行数据，表示用户验证成功
    if ($result && mysqli_num_rows($result) == 1) {
        // 获取用户详细信息
        $row = mysqli_fetch_assoc($result);
        $avatar = $row["avatar"];

        // 输出欢迎信息和用户头像
        echo "<p>Welcome to the password protected area {$user}</p>";
        echo "<img src=\"{$avatar}\" />";
    }
    // 如果查询结果不匹配，表示登录失败
    else {
        // 登录失败时，等待2秒再显示错误信息，以防止自动化的登录尝试
        sleep(2);
        echo "<pre><br />Username and/or password incorrect.</pre>";
    }

    // 关闭数据库连接
    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

?>
```

## 安全等级为High

添加了CSRF（跨站请求伪造）防护，CSRF是指攻击者伪装成合法用户执行恶意操作。

将登陆失败的等待时间修改为了0~3s随机时间。

```php
<?php

if (isset($_GET['Login'])) {
    // 检查CSRF令牌以防止跨站请求伪造攻击
    checkToken($_REQUEST['user_token'], $_SESSION['session_token'], 'index.php');

    // 清理用户名输入，移除反斜杠
    $user = $_GET['username'];
    $user = stripslashes($user);
    // 转义用户名以防止SQL注入
    $user = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $user) : 
        ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // 清理密码输入，移除反斜杠
    $pass = $_GET['password'];
    $pass = stripslashes($pass);
    // 转义密码以防止SQL注入
    $pass = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $pass) : 
        ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
    // 使用md5函数对密码进行加密
    $pass = md5($pass);

    // 构造SQL查询语句，用于验证用户名和密码
    $query = "SELECT * FROM `users` WHERE user = '$user' AND password = '$pass';";
    // 执行SQL查询，如果失败则输出错误信息
    $result = mysqli_query($GLOBALS["___mysqli_ston"], $query) 
        or die('<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_error($GLOBALS["___mysqli_ston"]) : 
        (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>');

    // 如果查询结果存在且只有一行数据，表示用户验证成功
    if ($result && mysqli_num_rows($result) == 1) {
        // 获取用户详细信息
        $row = mysqli_fetch_assoc($result);
        $avatar = $row["avatar"];

        // 输出欢迎信息和用户头像
        echo "<p>Welcome to the password protected area {$user}</p>";
        echo "<img src=\"{$avatar}\" />";
    }
    // 如果查询结果不匹配，表示登录失败
    else {
        // 登录失败时，随机等待一段时间再显示错误信息，以减缓自动化的登录尝试
        sleep(rand(0, 3));
        echo "<pre><br />Username and/or password incorrect.</pre>";
    }

    // 关闭数据库连接
    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

// 生成会话CSRF令牌
generateSessionToken();

?>
```

## 安全等级为Impossible

添加锁定机制，设置了登录次数，锁定时间和锁定状态，如果失败3次就会锁定15分钟。

将请求失败的等待时间修改为了2~4秒。

在用户登录之后会显示失败次数和最后一次登录时间，以此警告用户账户是否被人登录。

```php
<?php

if (isset($_POST['Login']) && isset($_POST['username']) && isset($_POST['password'])) {
    // 检查CSRF令牌以防止跨站请求伪造攻击
    checkToken($_REQUEST['user_token'], $_SESSION['session_token'], 'index.php');

    // 清理用户名输入，移除反斜杠
    $user = $_POST['username'];
    $user = stripslashes($user);
    // 转义用户名以防止SQL注入
    $user = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $user) : 
        ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // 清理密码输入，移除反斜杠
    $pass = $_POST['password'];
    $pass = stripslashes($pass);
    // 转义密码以防止SQL注入
    $pass = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? 
        mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $pass) : 
        ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
    // 使用md5函数对密码进行加密
    $pass = md5($pass);

    // 定义失败登录尝试次数和锁定时间
    $total_failed_login = 3;
    $lockout_time       = 15;
    $account_locked     = false;

    // 检查数据库中的用户信息
    $data = $db->prepare('SELECT failed_login, last_login FROM users WHERE user = (:user) LIMIT 1;');
    $data->bindParam(':user', $user, PDO::PARAM_STR);
    $data->execute();
    $row = $data->fetch();

    // 检查用户是否被锁定
    if ($data->rowCount() == 1 && $row['failed_login'] >= $total_failed_login) {
        // 计算用户再次尝试登录的时间
        $last_login = strtotime($row['last_login']);
        $timeout    = $last_login + ($lockout_time * 60);
        $timenow    = time();

        // 如果时间未到，锁定账户
        if ($timenow < $timeout) {
            $account_locked = true;
        }
    }

    // 检查用户名和密码是否匹配
    $data = $db->prepare('SELECT * FROM users WHERE user = (:user) AND password = (:password) LIMIT 1;');
    $data->bindParam(':user', $user, PDO::PARAM_STR);
    $data->bindParam(':password', $pass, PDO::PARAM_STR);
    $data->execute();
    $row = $data->fetch();

    // 如果登录有效且账户未被锁定
    if ($data->rowCount() == 1 && $account_locked == false) {
        // 获取用户详细信息
        $avatar = $row['avatar'];
        $failed_login = $row['failed_login'];
        $last_login = $row['last_login'];

        // 登录成功
        echo "<p>Welcome to the password protected area <em>{$user}</em></p>";
        echo "<img src=\"{$avatar}\" />";

        // 如果账户因多次失败尝试而被锁定
        if ($failed_login >= $total_failed_login) {
            echo "<p><em>Warning</em>: Someone might of been brute forcing your account.</p>";
            echo "<p>Number of login attempts: <em>{$failed_login}</em>.<br />Last login attempt was at: <em>{$last_login}</em>.</p>";
        }

        // 重置失败登录计数
        $data = $db->prepare('UPDATE users SET failed_login = "0" WHERE user = (:user) LIMIT 1;');
        $data->bindParam(':user', $user, PDO::PARAM_STR);
        $data->execute();
    } else {
        // 登录失败
        sleep(rand(2, 4));

        // 提供用户反馈
        echo "<pre><br />Username and/or password incorrect.<br /><br/>Alternative, the account has been locked because of too many failed logins.<br />If this is the case, <em>please try again in {$lockout_time} minutes</em>.</pre>";

        // 更新失败登录计数
        $data = $db->prepare('UPDATE users SET failed_login = (failed_login + 1) WHERE user = (:user) LIMIT 1;');
        $data->bindParam(':user', $user, PDO::PARAM_STR);
        $data->execute();
    }

    // 设置最后登录时间
    $data = $db->prepare('UPDATE users SET last_login = now() WHERE user = (:user) LIMIT 1;');
    $data->bindParam(':user', $user, PDO::PARAM_STR);
    $data->execute();
}

// 生成会话CSRF令牌
generateSessionToken();

?>
```
