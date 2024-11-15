---
title: 函数
data: '2024-11-15T17:42:43.000Z'
dataed: null
categories: C Language
---

## 题目

1.   将一个数组中的元素逆序排放. 比如 1、2、3、4、5、6、7、8、9 逆序为 9、8、7、6、5、4、3、2、1.
2.   用函数求 1 ~ n 之和, 要求函数原型为 long fnSum(int n);
3.   编写一个函数求 Fibnacci 数列中 fib(n) 的值.
4.   判别一个数是否为素数, 如果是就返回 1 否则返回 0.
5.   求 f(n, k) = 1^k + 2^k ... + n^k n 和 k 从键盘输入.
6.   传入两个字符串将字符串连接起来.
7.   输入一个字符串反序存放, 主函数输入字符串, 调用函数倒序后输出.

## 答案

``` c
// 将一个数组中的元素逆序排放. 比如 1、2、3、4、5、6、7、8、9 逆序为 9、8、7、6、5、4、3、2、1.
double fnFun(double x) {
    if (x > 1) {
        return x * x + 1;
    } else if (x >= -1 && x <= 1) {
        return x * x;
    } else {
        return x * x - 1;
    }
}
int main() {
    printf("x = %f, y = %f, z = %f", fnFun(5), fnFun(0.2), fnFun(-5));
}
```

```c
// 用函数求 1 ~ n 之和, 要求函数原型为 long fnSum(int n);
long fnSum(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

int main() {
    printf("%d", fnSum(3));
}
```

```c
// 编写一个函数求 Fibnacci 数列中 fib(n) 的值.
int fib(int n) {
    if (n <= 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}
int main() {
    printf("%d", fib(6));
}
```

```c
// 判别一个数是否为素数, 如果是就返回 1 否则返回 0.
int isPrime(int n) {
    if (n <= 1) {
        return 0;
    }
    for (int i = 2; i <= n / 2; i++) {
        if (n % i == 0) {
            return 0;
        }
    }
    return 1;
}
int main() {
    printf("%d, %d, %d", isPrime(2), isPrime(3), isPrime(4));
}
```

```c
// 求 f(n, k) = 1^k + 2^k ... + n^k n 和 k 从键盘输入.
int handleNK(int n, int k) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        int temp = 1;
        for (int j = 0; j < k; j++) {
            temp *= i;
        }
        sum += temp;
    }
    return sum;
}
int main() {
    int n,k;
    printf("输入n和k: ");
    scanf("%d %d", &n, &k);
    printf("%d", handleNK(n, k));
}
```

```c
// 传入两个字符串将字符串连接起来.
char* jointStr(char *x, char *y) {
    int lengthX = strlen(x);
    int lengthY = strlen(y);
    int length = lengthX + lengthY;
    static char arr[100];

    int indexX = 0, indexY = 0;
    for(int i = 0; i < length; i++) {
        if (indexX < lengthX) {
            arr[i] = x[indexX];
            indexX++;
        } else {
            arr[i] = y[indexY];
            indexY++;
        }
    }
    arr[length] = '\0';

    return arr;
}
int main() {
    printf("%s", jointStr("123", "456"));
}
```

```c
// 输入一个字符串反序存放, 主函数输入字符串, 调用函数倒序后输出.
char* turnStr(char *str) {
    int length = strlen(str);
    static char arr[100];

    int index = 0;
    for(int i = length - 1; i >= 0; i--) {
        arr[index] = str[i];
        index++;
    }
    arr[length] = '\0';

    return arr;
}
int main() {
    char arr[100];
    printf("输入一个字符串: ");
    gets(arr);
    printf("反转后: %s", turnStr(arr));
}
```
