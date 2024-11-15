---
title: 数组
data: '2024-11-07T14:51:20.000Z'
dataed: null
categories: C Language
---

## 题目

1.   将一个数组中的元素逆序排放. 比如 1、2、3、4、5、6、7、8、9 逆序为 9、8、7、6、5、4、3、2、1.
2.   在一个升序数组中插入一个数, 但数组任然保持升序.
3.   键盘输入一个班n个学生的C语言成绩，求超过平均成绩（含平均成绩）的学生人数和低于平均成绩的学生人数。
5.   编写程序实现从键盘输入一行包含英文字母、数字、空格和其他字符的字符串，将该字符串中的英文字母复制生成新的字符串并输出。

## 答案

```c
/*
* 将一个数组中的元素逆序排放.
* 比如 1、2、3、4、5、6、7、8、9 逆序为 9、8、7、6、5、4、3、2、1
*/
int a[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
int length = sizeof(a) / sizeof(a[0]) - 1;

for (int i = length; i >= 0; i--) {
    for (int j = 0; j = 0; j++) {
        a[j] = a[i];
    }
}
for (int i = 0; i <= length; i++) {
    printf("%d ", a[i]);
}
```

```c
/*
* 在一个升序数组中插入一个数, 但数组任然保持升序.
*/
int a[] = { 1, 2, 3, 4, 6, 7, 8, 9 };
int length = sizeof(a) / sizeof(a[0]) - 1;
int item = 5;

for (int i = 0; i <= length; i++) {
    if (item >= a[i]) {
        continue;
    }
    for (int j = length; j >= i; j--) {
        a[j + 1] = a[j];
    }
    a[i] = item;
    break;
}
for (int i = 0; i <= length + 1; i++) {
    printf("%d ", a[i]);
}
```

```c
/*
* 键盘输入一个班n个学生的C语言成绩，求超过平均成绩（含平均成绩）的学生人数和低于平均成绩的学生人数。
*/
int n = 0, ave = 0;
printf("输入学生数量: ");
scanf("%d", &n);
float per[n];
for (int i = 0; i <= n - 1; i++) {
    printf("输入学生 %d 的成绩: ", i + 1);
    scanf("%f", &per[i]);
    ave += per[i];
}
ave = ave / (float)n;

int x = 0, y = 0;
for (int i = 0; i <= n - 1; i++) {
    if (per[i] >= ave) {
        x++;
    }
    else {
        y++;
    }
}
printf("超过平均成绩（含平均成绩）的学生人数: %d \n低于平均成绩的学生人数: %d", x, y);
```

```c
/*
* 编写程序实现从键盘输入一行包含英文字母、数字、空格和其他字符的字符串，将该字符串中的英文字母复制生成新的字符串并输出。
*/
char str[100] = { 0 };
char str1[100] = { 0 };
int j = 0;
printf("请输入一个字符串：");
fgets(str, 100, stdin);
for (int i = 0; str[i] != '\0' && i <= 100; i++) {
    if ((str[i] >= 65 && str[i] <= 90) || (str[i] >= 97 && str[i] <= 122)) {
        str1[j++] = str[i];
    }
}
str1[j] = '\0';
printf("%s", str1);
```