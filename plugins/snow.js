export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;

        canvas.width = viewWidth;
        canvas.height = viewHeight;
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "9999";
        canvas.style.pointerEvents = "none";

        document.body.append(canvas);

        let snowCount = 150;
        let speed = Math.random() * 2 + 0.5;
        if (viewWidth < 768) {
            snowCount = 50;
            speed = Math.random() * 1 + 0.1;
        }
        const snowflakes = [];

        for (let i = 0; i < snowCount; i++) {
            const x = Math.random() * viewWidth;
            const y = Math.random() * viewHeight;
            const radius = Math.random() * (2 - 1) + 1;
            const direction = Math.random() * 2 - 1;

            snowflakes.push({
                x: x,
                y: y,
                radius: radius,
                speed: speed,
                direction: direction,
            });
        }

        function drawSnowflakes() {
            ctx.clearRect(0, 0, viewWidth, viewHeight);

            snowflakes.forEach((snowflake) => {
                // 更新雪花的位置
                snowflake.y += snowflake.speed;
                snowflake.x += snowflake.direction;

                // 判断雪花是否超出画布范围
                if (snowflake.x - snowflake.radius > viewWidth) {
                    snowflake.x = 0 - snowflake.radius; // 从左边重新进入
                } else if (snowflake.x + snowflake.radius < 0) {
                    snowflake.x = viewWidth + snowflake.radius; // 从右边重新进入
                }

                if (snowflake.y - snowflake.radius > viewHeight) {
                    snowflake.y = 0 - snowflake.radius; // 从顶部重新进入
                } else if (snowflake.y + snowflake.radius < 0) {
                    snowflake.y = viewHeight + snowflake.radius; // 从底部重新进入
                }

                // 绘制雪花
                ctx.beginPath();
                ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(255,255,255,0.5)";
                ctx.fill();
            });

            requestAnimationFrame(drawSnowflakes);
        }

        // 启动动画
        drawSnowflakes();
    }
});
