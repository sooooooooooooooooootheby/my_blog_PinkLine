/**
 *
 * 原作者: adryd325: https://github.com/adryd325
 * 修改: s22y: https://github.com/sooooooooooooooooootheby
 *
 * original author: adryd325: https://github.com/adryd325
 * revamp: s22y: https://github.com/sooooooooooooooooootheby
 *
 */

import nekoFile from "~/plugins/oneko/oneko.gif";

export default defineNuxtPlugin((nuxtApp) => {
    // 是否启用
    const enable = true;
    // 检查是否在客户端运行
    if (process.client && enable) {
        const isReducedMotion =
            window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
            window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

        if (isReducedMotion) return;

        const nekoEl = document.createElement("div");

        let nekoPosX = 32;
        let nekoPosY = 32;

        let mousePosX = 0;
        let mousePosY = 0;

        const nekoSites = ["localhost"];

        try {
            const searchParams = location.search
                .replace("?", "")
                .split("&")
                .map((keyvaluepair) => keyvaluepair.split("="));
            tmp = searchParams.find((a) => a[0] == "catx");
            if (tmp && tmp[1]) nekoPosX = parseInt(tmp[1]);
            tmp = searchParams.find((a) => a[0] == "caty");
            if (tmp && tmp[1]) nekoPosY = parseInt(tmp[1]);
            tmp = searchParams.find((a) => a[0] == "catdx");
            if (tmp && tmp[1]) mousePosX = parseInt(tmp[1]);
            tmp = searchParams.find((a) => a[0] == "catdy");
            if (tmp && tmp[1]) mousePosY = parseInt(tmp[1]);
        } catch (e) {
            console.error("oneko.js: failed to parse query params.");
            console.error(e);
        }

        function onClick(event) {
            let target;
            if (event.target.tagName === "A" && event.target.getAttribute("href")) {
                target = event.target;
            } else if (
                event.target.tagName == "IMG" &&
                event.target.parentElement.tagName === "A" &&
                event.target.parentElement.getAttribute("href")
            ) {
                target = event.target.parentElement;
            } else {
                return;
            }
            let newLocation;
            try {
                newLocation = new URL(target.href);
            } catch (e) {
                return;
            }
            if ((nekoSites.includes(newLocation.host) && newLocation.pathname == "/") || target.dataset.neko) {
                newLocation.searchParams.append("catx", Math.floor(nekoPosX));
                newLocation.searchParams.append("caty", Math.floor(nekoPosY));
                newLocation.searchParams.append("catdx", Math.floor(mousePosX));
                newLocation.searchParams.append("catdy", Math.floor(mousePosY));
                event.preventDefault();
                window.location.href = newLocation.toString();
            }
        }
        document.addEventListener("click", onClick);

        // 每当动画播放一帧时，这个计数器就会增加。这个变量通常用于控制动画的速度、循环播放等。
        let frameCount = 0;
        // 这个变量通常用于检测用户是否长时间没有与页面交互，从而触发相应的空闲动画或行为。
        let idleTime = 0;
        // 这个变量可以是任何类型的对象，比如一个动画实例或一个函数，用于在用户长时间不活动时播放。
        let idleAnimation = null;
        // 这个变量与frameCount类似，但专门用于跟踪空闲动画的播放进度。
        let idleAnimationFrame = 0;

        // neko 速度
        const nekoSpeed = 10;
        // 截取 neko 在图片中的位置
        const spriteSets = {
            idle: [[-3, -3]],
            alert: [[-7, -3]],
            scratchSelf: [
                [-5, 0],
                [-6, 0],
                [-7, 0],
            ],
            scratchWallN: [
                [0, 0],
                [0, -1],
            ],
            scratchWallS: [
                [-7, -1],
                [-6, -2],
            ],
            scratchWallE: [
                [-2, -2],
                [-2, -3],
            ],
            scratchWallW: [
                [-4, 0],
                [-4, -1],
            ],
            tired: [[-3, -2]],
            sleeping: [
                [-2, 0],
                [-2, -1],
            ],
            N: [
                [-1, -2],
                [-1, -3],
            ],
            NE: [
                [0, -2],
                [0, -3],
            ],
            E: [
                [-3, 0],
                [-3, -1],
            ],
            SE: [
                [-5, -1],
                [-5, -2],
            ],
            S: [
                [-6, -3],
                [-7, -2],
            ],
            SW: [
                [-5, -3],
                [-6, -1],
            ],
            W: [
                [-4, -2],
                [-4, -3],
            ],
            NW: [
                [-1, 0],
                [-1, -1],
            ],
        };

        // neko 初始化
        function init() {
            nekoEl.id = "oneko";
            nekoEl.ariaHidden = true;
            nekoEl.style.width = "32px";
            nekoEl.style.height = "32px";
            nekoEl.style.position = "fixed";
            nekoEl.style.pointerEvents = "none";
            nekoEl.style.imageRendering = "pixelated";
            nekoEl.style.left = `${nekoPosX - 16}px`;
            nekoEl.style.top = `${nekoPosY - 16}px`;
            nekoEl.style.zIndex = Number.MAX_VALUE;
            nekoEl.style.zIndex = 9999;

            // let nekoFile = "~/plugins/oneko/oneko.gif";
            const curScript = document.currentScript;
            if (curScript && curScript.dataset.cat) {
                nekoFile = curScript.dataset.cat;
            }
            nekoEl.style.backgroundImage = `url(${nekoFile})`;

            document.body.appendChild(nekoEl);

            document.addEventListener("mousemove", function (event) {
                mousePosX = event.clientX;
                mousePosY = event.clientY;
            });

            window.requestAnimationFrame(onAnimationFrame);
        }

        // 创建动画循环
        let lastFrameTimestamp;
        function onAnimationFrame(timestamp) {
            if (!nekoEl.isConnected) {
                return;
            }
            if (!lastFrameTimestamp) {
                lastFrameTimestamp = timestamp;
            }
            if (timestamp - lastFrameTimestamp > 100) {
                lastFrameTimestamp = timestamp;
                frame();
            }

            window.requestAnimationFrame(onAnimationFrame);
        }

        // 根据帧数来更新 neko 的显示图像
        function setSprite(name, frame) {
            // 移动 *
            const sprite = spriteSets[name][frame % spriteSets[name].length];
            // 动画切换 *
            nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
        }

        // neko 停止时调用
        function resetIdleAnimation() {
            idleAnimation = null;
            idleAnimationFrame = 0;
        }

        // 闲置
        function idle() {
            idleTime += 1;

            if (idleTime > 10 && Math.floor(Math.random() * 200) == 0 && idleAnimation == null) {
                let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
                if (nekoPosX < 32) {
                    avalibleIdleAnimations.push("scratchWallW");
                }
                if (nekoPosY < 32) {
                    avalibleIdleAnimations.push("scratchWallN");
                }
                if (nekoPosX > window.innerWidth - 32) {
                    avalibleIdleAnimations.push("scratchWallE");
                }
                if (nekoPosY > window.innerHeight - 32) {
                    avalibleIdleAnimations.push("scratchWallS");
                }
                idleAnimation = avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)];
            }

            switch (idleAnimation) {
                case "sleeping":
                    if (idleAnimationFrame < 8) {
                        setSprite("tired", 0);
                        break;
                    }
                    setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                    if (idleAnimationFrame > 192) {
                        resetIdleAnimation();
                    }
                    break;
                case "scratchWallN":
                case "scratchWallS":
                case "scratchWallE":
                case "scratchWallW":
                case "scratchSelf":
                    setSprite(idleAnimation, idleAnimationFrame);
                    if (idleAnimationFrame > 9) {
                        resetIdleAnimation();
                    }
                    break;
                default:
                    setSprite("idle", 0);
                    return;
            }
            idleAnimationFrame += 1;
        }

        // 控制 neko 的动画
        function frame() {
            frameCount += 1;
            const diffX = nekoPosX - mousePosX;
            const diffY = nekoPosY - mousePosY;
            const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

            if (distance < nekoSpeed || distance < 48) {
                idle();
                return;
            }

            idleAnimation = null;
            idleAnimationFrame = 0;

            if (idleTime > 1) {
                setSprite("alert", 0);
                idleTime = Math.min(idleTime, 7);
                idleTime -= 1;
                return;
            }

            let direction;
            direction = diffY / distance > 0.5 ? "N" : "";
            direction += diffY / distance < -0.5 ? "S" : "";
            direction += diffX / distance > 0.5 ? "W" : "";
            direction += diffX / distance < -0.5 ? "E" : "";
            setSprite(direction, frameCount);

            nekoPosX -= (diffX / distance) * nekoSpeed;
            nekoPosY -= (diffY / distance) * nekoSpeed;

            nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
            nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

            nekoEl.style.left = `${nekoPosX - 16}px`;
            nekoEl.style.top = `${nekoPosY - 16}px`;
        }

        init();
    }
});
