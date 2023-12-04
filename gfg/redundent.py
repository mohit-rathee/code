sign=["+","-","*","/"]
brac=["(",")"]
priority={
    "+":0.5,
    "-":1,
    "*":1.5,
    "/":2,
    None:0
}
def checkbracket(skips,exp):
    # print(exp)
    length=len(exp)
    # count=0
    prev=None
    next=None
    Start=[]
    b=skips   #-skips
    if exp.count("(")==b and exp.count(")")==b:  
        print("guess here is the issue")  
        return ["c",exp]
    for i in range(length):                  
        if exp[i] =="(":
            # b+=1
            Start.append(i)
        elif exp[i]==")":
            b-=1
            if b==-1:
                start=Start[-1]
                print(exp)
                if exp[start-1] in sign:
                    prev=exp[start-1]
                if i!=length-1 and exp[i+1] in sign :
                    next=exp[i+1]
                print(prev,exp[start+1:i],next)
                redun=checkRedundency(prev,next,exp[start+1:i])
                print(redun)
                # print(exp[:start]+exp[start+1:i]+exp[i+1:])
                if redun:
                    return [True,exp[:start]+exp[start+1:i]+exp[i+1:]]
                else:
                    return [False,exp]
            Start.pop()

def checkRedundency(p,n,s):
    cur1=s.find("(")
    cur2=s[::-1].find(")")
    cur2=len(s)-1-cur2
    x =[]
    print(p)
    P=int(priority[p])
    N=int(priority[n])
    if cur1 !=-1 and cur2 !=-1:
        s=s[:cur1]+"T"+s[cur2+1:]
    else:
        s=s
    for i in s:
        if i in sign:
            x.append(priority[i])
    X=int(min(x))
    print(str(p) +" , (" + s + ") , " + str(n))
    print(X)
    # print(s)
    if len(s)==1:
        print(s)
        return True
    if p==None and n==None:
        print([p,n])
        print(s)
        return True
    elif p!=None and n!=None:
        if X<N or  X<P :
            return False
        else :
            return True   
    elif p==None:
        if X<N or not X==N :
            return False
        else :
            return True 
    elif n==None:
        if X<P or not X==P :
            return False
        else :
            return True 

    # elif p=="+" and n=="+":
    #     print("2")
    #     return True
    # elif p=="+" and n==None or p==None and n=="+":
    #     print("3")
    #     return True
    # elif p=="-" and "+" not in s and "-" not in s:
    #     return True
    #     print("4")
    # elif p=="*" and "+" not in s and "-" not in s:
    #     return True
    #     print("5")
    # elif p=="/" :
    #     return False
    # else: 
    #     return False

def removeBrackets (Exp):
    #code here
    exp=Exp
    checkbrac=0
    while True:
        expression=checkbracket(checkbrac,exp)
        # print(expression)
        exp=expression[1]
        if not expression[0]:
            checkbrac+=1
        # print(checkbrac)
        # print(exp)
        print("=====")
        if expression[0]=="c":
            return exp

print(removeBrackets("A-B+((C+D/(E/((F/((G*(((H*(I*(J*K*((L*(M/N-((O+(P-(Q+(R-S/T-((((((U/(V*W/(((X-Y/Z))))))))))))))))))))))))))))))"))

# print(removeBrackets("A+(B-C+D)"))
# G*(H*(I*(J*K*(L*(M/N-(O+P-(Q+R-S/T-(U/())))))))))))
# G*H*I*J*K*L*(M/N-(O+P-(Q+R-S/T-U/()))))))
    # (A-+B)-+(C-+D) ==  A-+B-+C-+D
    # (A-+B)*/(A-+)  ==  (A-+B)*/(A-+)
    # (A)-+(B)*/(C)  ==  A-+B*/C
    # (A*/B)-+(C*/D) ==  (A*/B)-+(C*/D)
    # when: (any)    ==  anything
    # (any(-+))-+(any(-+)) == any-+any
    # (any(*/))-+
    # 
# A-B+C+D/(E/(F/(G*(H*(I*(J*K*(L*(M/N-(O+P-(Q+R-S/T-(U/Te)))))))))))
# A-B+C+D/(E/(F/(G*H*I*J*K*L*(M/N-(O+P-(Q+R-S/T-U/Te))))))