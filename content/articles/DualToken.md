---
title: 无感刷新token
description: 使用双token实现无感刷新，以此提升用户体验
time: 2024-8-15
---

# 写在前面

注意！本文并不十分严谨，只是以我自己的理解写的。请不要以本文为准，注意参考其他大佬的文章。

# OAuto2.0

在开始介绍双 token（access token 和 refresh token）之前先了解一下[what is OAuto2.0](https://auth0.com/intro-to-iam/what-is-oauth-2)。

OAuto2.0 是一种授权框架（协议），起初我以为是一种插件框架之类的，不过详细看了一遍文档发现并没有这么麻烦，可以简单理解为他只是一种形式规范。

例如 OAuto2.0 规定了`角色`的概念：

- 资源所有者：拥有受保护的资源（例如媒体文件，数据库数据）并且可以授权访问的用户或系统。
- 客户端：访问受保护资源的系统。访问资源时，需要拥有访问令牌。
- 授权服务器：服务器接收来自客户端的令牌请求，在身份验证通过后返回令牌。
- 资源服务器：存放资源并接收客户端访问请求的服务器，在用户发起请求时会验证访问令牌并返回资源。

在 OAuto2.0 中，令牌也有两个：

- 访问令牌：用户验证资源请求所用的验证令牌。
- 刷新令牌：当访问令牌过期时请求新的访问令牌。

我不想写的太冗余（其实就是我原本写了一大堆然后软件没有保存，不小心切换到其它文章让我白写了，现在我已经没耐心再写那么多东西了）。

所以写在前面，请忘记 OAuto2.0，这个东西不重要，因为他只是一种形式，如果你总要带入这个东西，那多半会对你的理解造成困扰。

接下来我会用我自己的理解去给你介绍两个令牌他们的工作方式。

（或许你会你问我既然如此为什么还要去写 OAuto2.0，而不是直接写双令牌。因为不写一下 OAuto2.0 会让人感觉双令牌是我自己发明的，显得我很装）

# 运作

我们从登录开始。

当客户端发起登录请求，授权服务器会校验用户名和密码，并且生成`访问令牌`和`刷新令牌`，将刷新令牌保存到数据库用于后期验证。

这里的两个令牌会有一些区别，例如访问令牌会包含用户名和 uid 一些用户的信息，而刷新令牌并不会保存用户的任何信息。访问令牌的有效期会比刷新令牌的短。

> 注意，刷新令牌不该保存任何用户相关的信息，这是危险的行为，这会使刷新令牌和访问令牌无异。

当页面挂载时，客户端会主动发起访问令牌有效性的验证请求。

如果无效就携带上刷新令牌请求新的访问令牌。如果授权服务器发现刷新令牌也无效，就返回指定内容让客户端跳转到登录重新获取令牌。

# 原理解释

看到这里，聪明的你或许就会知道为什么之前让你忘记 OAuto2.0 的原因了。因为所有的操作并没有用到什么库或者插件，可以说仅仅是一个习惯。

如果你还不明白，可以接着往下看。

我们设想一个场景（实际上就是我开发时遇到的问题）：

站点只有一个 JWT 格式的令牌，用于作为身份验证资源请求。

此时令牌过期了，我们应该怎么办，是直接返回登录？还是用旧令牌去请求新令牌？

事实上这两个都不是好办法，前者会降低用户体验，例如你的令牌有效期是七天，而用户可能不会频繁访问你的网站，或者说每次访问间隔总在七天之后，那这样可能会导致每次访问都需要登录，这无疑降低了用户体验。而后者是根本行不通的，因为令牌已经过期了，是无法解析出任何有用的信息的。

可能你会想，那我直接把有效期设置长一些，直接设置一个月，或者根本不会过期！哦，亲爱的，这当然可以，不过可能会让你的用户发现自己的信息被扒光或者被修改了。

那么目前来看新增一个令牌是很好的方法，
原来的单个令牌变成访问令牌，用于身份验证资源请求。而新增的令牌是刷新令牌，他不会携带任何有用的信息，作用仅仅是用来请求新的令牌。

当然你可能会奇怪，刷新令牌不携带任何信息，那我怎么判断他是哪个用户的刷新令牌，我怎么给用户刷新访问令牌。

我的解决方法是直接在数据库新建了一个表，存放所有的刷新令牌和对应的 uid，添加一个字段用来作为刷新令牌是否有效的判断。（我曾经在某个文章还是评论区看见有人说不应该储存刷新令牌，但是我实在不知道该怎么做验证了，只能这样做）

# 实践操作

纸上得来终觉浅，主要是我觉得写也不好，把代码贴出来可能会让人感觉更清晰一些。

这里我使用了 vue3 + pinia + nodejs

```
# 数据库-用于保存刷新令牌的表

CREATE TABLE `refresh_token` (
  `refresh_token` varchar(255) NOT NULL,    # 这是用于保存刷新令牌的字段
  `uid` int(6) unsigned zerofill NOT NULL,  # 这是记录刷新令牌相对应的用户uid
  `state` int(1) NOT NULL DEFAULT '1',      # 这是令牌状态记录，为0无效，1有效
  PRIMARY KEY (`refresh_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

```javascript
# 后端

// 解析token中间件
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send("No token provided.");
    }

    const tokenParts = req.headers.authorization.split(" ");

    if (tokenParts.length !== 2) {
        return res.status(403).send("Invalid token format.");
    }

    const token = tokenParts[1];

    jwt.verify(token, config.token.accessTokenKey, (err, decoded) => {
        if (err) return res.status(401).send("Invalid token.");
        req.user = decoded;
        next();
    });
}

// 登录api
router.post("/login", (req, res) => {
    // ......省略其他的验证代码
    db.query(sqlLogin, [username, hashPassword], (err, results) => {
        if (err) return console.log(err.message);
        const uid = results[0].uid;

        if (results.length === 0) {
            res.status(200).json({ code: 0, message: "登录失败，检查用户名和密码是否正确" });
        } else if (results.length === 1) {
            // 在完成用户名和密码验证后会生成访问令牌(accessToken)和刷新令牌(refreshToken)，其中刷新令牌不包含任何用户相关的数据
            const accessToken = jwt.sign({ username: username, uid: uid }, typhon_access_token_key, { expiresIn: 7d });
            const refreshToken = jwt.sign({}, typhon_refresh_token_key, { expiresIn: 14d });

            const sqlAddRT = `INSERT INTO refresh_token VALUES (?,?,1)`;
            // 将生成的访问令牌和刷新令牌写入数据库，并给前端返回两个令牌
            db.query(sqlAddRT, [refreshToken, uid], (err, results) => {
                if (err) return console.log(err.message);
                if (results.length === 0) {
                    console.log("插入失败");
                    return;
                }
                res.status(200).json({ code: 1, message: "登陆成功，欢迎回来"accessToken, refreshToken });
            });
        } else {
            res.status(500).json({ message: "服务器错误，请联系管理员" });
        }
    });
    // ......省略其他的验证代码
});

// 获取新的accessToken Api
router.get("/getAccessToken", (req, res) => {
    const oldRefreshToken = req.query.refreshToken;
    const sqlInquireRT = `SELECT * FROM refresh_token WHERE refresh_token = ?`;
    db.query(sqlInquireRT, oldRefreshToken, (err, results) => {
        if (err) return console.log(err.message);

        if (results.length === 0) {
            res.status(200).json({ code: 2, message: "没有这个refreshToken" });
            return;
        }

        if (results[0].status === 0) {
            res.status(200).json({ code: 2, message: "refreshToken 已过期" });
            return;
        }

        const { username, uid } = results[0];
        const accessToken = jwt.sign({ username: username, uid: uid }, config.token.accessTokenKey, { expiresIn: config.token.accessTokenOutTime });
        const refreshToken = jwt.sign({}, config.token.refreshTokenKey, { expiresIn: config.token.refreshTokenOutTime });

        const sqlUpdateState = `UPDATE refresh_token SET state = 0 WHERE refresh_token = ?`;
        db.query(sqlUpdateState, oldRefreshToken, (err, results) => {
            if (err) return console.log(err.message);

            if (results.length === 0) {
                res.status(500).json({ message: "服务器错误" });
                return;
            }
        });

        const sqlAddRT = `INSERT INTO refresh_token VALUES (?, ?, 1)`;
        db.query(sqlAddRT, [refreshToken, uid], (err, results) => {
            if (err) return console.log(err.message);

            if (results.length === 0) {
                res.status(500).json({ message: "服务器错误" });
                return;
            }
        });

        res.status(200).json({ code: 1, message: "token刷新成功", accessToken, refreshToken });
    });
});
```

```javascript
# 前端
# pinia

state: () => {
    return {
        message: null,
        code: null,
    };
},
actions: {
    // 请求accessToken
    async getAccessToken(refreshToken) {
        try {
            const res = await axios.get("/getAccessToken", { params: { refreshToken } });
            if (res.data.code === 1) {
                this.code = res.data.code;
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                return;
            }
            if (res.data.code === 2) {
                this.code = res.data.code;
                return;
            }
        } catch (error) {
            if (error.response) {
                this.message = error.response.data.message;
            }
        }
    },
}

# vue

import { userStore } from "@/stores/user.js";
import { jwtDecode } from "jwt-decode";
data() {
    const user = userStore();
    return {
        handleUser: user,
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
    };
},
methods: {
    async getTokenUserInfo() {
        // ...... 请求用户数据
    },
    async verifyToken() {
        const accessTokenPayload = jwtDecode(this.accessToken).exp * 1000;
        const refreshTokenPayload = jwtDecode(this.refreshToken).exp * 1000;
        const time = Date.now();

        if (time >= accessTokenPayload) {
            // accessToken 过期
               console.log("accessToken 过期");
            if (time >= refreshTokenPayload) {
                // refreshToken 过期
                console.log("refreshToken 过期");
                router.push("/login");
            }

            try {
                await this.handleUser.getAccessToken(this.refreshToken);
                if (this.handleUser.code === 1) {
                    this.getTokenUserInfo();
                } else if (this.handleUser.code === 2) {
                    router.push("/login");
                } else {
                    console.log("未知code: " + this.handleUser.code);
                }
            } catch (error) {
                console.log(error);
            }

            return;
        }

        // token 有效
        this.getTokenUserInfo();
    },
},
mounted() {
    if (this.accessToken) {
        this.verifyToken();
    }
},
```
