def ReFormatString(S, K):
    string=S.split("-")
    # print(string)
    length=0
    newString=""
    for i in range(len(string)):
        length+=len(string[i])
        newString+=string[i]
    print(newString)
    print(length)
    newString=newString.upper()
    result=""
    firststr=length%K
    print(firststr)
    result+=newString[:firststr]
    for i in range(int(length/K)):
        result+="-"+newString[firststr+(i*K):firststr+(i*K)+K]
    if firststr:
        print(result)
    else:
        print(result[1:])


ReFormatString("Q-ebt-hyO-Z-h-Q",2)