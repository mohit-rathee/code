def smithNum(n):
    #calc digit sum
    digitSum = calcSum(n)
    #prime upto n
    sieveLen = (n+1)//2+1
    arr=[i for i in range(0,sieveLen)]
    arr[1]=0
    sieveNum = 2
    while sieveNum < sieveLen :
        for i in range(2*sieveNum,sieveLen,sieveNum):
            if arr[i]:
                arr[i] = 0
        sieveNum+=1
    print(arr)
    num=n
    factorSum = 0
    i=2
    while i < sieveLen and num!=1 :
        if arr[i] and num%i==0: # prime and a factor
            print('dividing by '+str(i))
            digSum = calcSum(i)
            while num%i==0 and num!=1:
                print('*',end="")
                num = num/i
                factorSum+=digSum
        i+=1
    print(digitSum)
    print(factorSum)
    if digitSum == factorSum:
        print("TRUE")
        return 1
    else:
        print("FALSE")
        return 0

    
def calcSum(num):
    digitSum=0
    for i in list(str(num)):
        digitSum+=int(i)
    return digitSum



smithNum(985)
