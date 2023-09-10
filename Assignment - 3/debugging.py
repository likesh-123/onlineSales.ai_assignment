# Given Code
def compute(n):
    if n < 10:
        out = n ** 2
    elif n < 20:
        out = 1
        for i in range(1, n-10):
            out *= i
    else:
        lim = n - 20
        out = lim * lim
        out = out - lim
        out = out / 2 
    print(out)


n = int(input("Enter an integer: "))
compute(n)


# Corrected code
def compute(n):
    if n < 10:
        out = n ** 2
    elif n <= 20:    # here it should be <= 20 as the condition is about If n is between 10 and 20 
        out = 1
        for i in range(1, n-9): #it should be multiplying from 1 to n-9 to calculate the correct factorial
            out *= i
    else:
        lim = n - 20
        out = (lim * (lim + 1)) // 2   # we can use sum of n numbers formula here -> sum = (n * (n + 1)) / 2
    print(out)

n = int(input("Enter an integer: "))
compute(n)