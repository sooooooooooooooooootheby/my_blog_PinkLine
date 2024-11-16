---
title: DVWA靶场记录-Command Injection
data: '2024-9-15T23:25:23.000Z'
dataed: null
categories: 网络攻防
---

# 写在前面

开始攻击前简单学习一下 Command Injection 命令注入。

命令注入指的是通过web程序的漏洞实现执行服务器命令。有些web页面可能会调用系统命令执行一些操作，如果对输入的内容没有执行严格过滤，就会导致漏洞出现，从而实现命令注入。

开始攻击前介绍四个命令拼接符。

- &&: 先执行 command1且执行成功再执行 command2

- &   : 先执行 command1 不管是否成功都执行 command2

- ||  : 先执行 command1 且执行失败再执行 command2

- |    : 先执行 command1 再将 command1 的输出作为 command2 的输入，最后只输出 command2 的结果



# low 等级

```php
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // 获取输入
    $target = $_REQUEST[ 'ip' ];

    // 判断操作系统，并执行ping命令
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // 最后输出的内容
    echo "<pre>{$cmd}</pre>";
}
```

通过检查代码，我们可以发现low等级并没有任何防护措施，只是将输入框的内容放到函数中直接执行，以此我们可以随意让服务器执行命令。

![3](/image/DVWA-CommandInjection/3.webp)

# Medium 等级

```php
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // 获取输入
    $target = $_REQUEST[ 'ip' ];

    // 设置黑名单
    $substitutions = array(
        '&&' => '',
        ';'  => '',
    );

    // 删除黑名单中的字符
    $target = str_replace( array_keys( $substitutions ), $substitutions, $target );

    // 判断操作系统，并执行ping命令
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // 最后输出的内容
    echo "<pre>{$cmd}</pre>";
}

?>
```

Medium 等级添加了黑名单功能，但是黑名单内容只有 && 和 ; ，所以我们仍可以使用 & 、|| 和 |。

![3](/image/DVWA-CommandInjection/3.webp)

# High 等级

```php
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // 获取输入
    $target = trim($_REQUEST[ 'ip' ]);

    // 设置黑名单
    $substitutions = array(
        '&'  => '',
        ';'  => '',
        '| ' => '',
        '-'  => '',
        '$'  => '',
        '('  => '',
        ')'  => '',
        '`'  => '',
        '||' => '',
    );

    // 删除黑名单中的字符
    $target = str_replace( array_keys( $substitutions ), $substitutions, $target );

    // 判断操作系统，并执行ping命令
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // 最后输出的内容
    echo "<pre>{$cmd}</pre>";
}

?>
```

High等级只是在原有的基础多添加了几个黑名单项，看上去貌似无法破解了，但是仔细观察会发现 | 后面有一个空格，因此我们还是可以使用 | 作为拼接符。

![3](/image/DVWA-CommandInjection/3.webp)

# Impossible 等级

```php
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // 检查CSRF令牌以防止跨站请求伪造攻击
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // 获取输入
    $target = $_REQUEST[ 'ip' ];
    // 移出反斜杠
    $target = stripslashes( $target );

    // 将IP切割为四份
    $octet = explode( ".", $target );

    // 检查是否为int
    if( ( is_numeric( $octet[0] ) ) && ( is_numeric( $octet[1] ) ) && ( is_numeric( $octet[2] ) ) && ( is_numeric( $octet[3] ) ) && ( sizeof( $octet ) == 4 ) ) {
        // 如果都是int就重新拼接
        $target = $octet[0] . '.' . $octet[1] . '.' . $octet[2] . '.' . $octet[3];

        // 判断操作系统，并执行ping命令
        if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
            // Windows
            $cmd = shell_exec( 'ping  ' . $target );
        }
        else {
            // *nix
            $cmd = shell_exec( 'ping  -c 4 ' . $target );
        }

        // 最后输出的内容
        echo "<pre>{$cmd}</pre>";
    }
    else {
        // 告诉用户输入有错
        echo '<pre>ERROR: You have entered an invalid IP.</pre>';
    }
}

// 生成会话CSRF令牌
generateSessionToken();

?>
```

Impossible 等级去掉了黑名单，修改成对用户输入的判断，判断是否符合ip地址的格式。

这样相当于从黑名单转换成白名单，这样就可以避免黑名单项的错误，也让命令注入变成无法实现的了。
