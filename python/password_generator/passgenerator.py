import random
alf = "abcdefghijklmopqrstuvwxyz"
num = "0123456789"
ALF = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
spec_char = '''!@#$%^&*()_+{}:"<>?/.,;'[]=-'''

def generator(cmd:list):
    gen_cmd=[] #fgenerated cmd's
    # print(cmd)
    for i in range(len(cmd)):
        y=cmd[i]
        y=y.split()
        # print(y)
        match y:
            case ["num"]:
                gen_cmd.append(random.choice(num))
            case ["alf"]:
                gen_cmd.append(random.choice(alf))
            case ["ALF"]:
                gen_cmd.append(random.choice(ALF))
            case ["@@@"]:
                gen_cmd.append(random.choice(spec_char))
            case ["num",x] if x.isdigit():
                gen_cmd.append("".join(random.choices(num,k=int(x))))
            case ["alf",x] if str(x).isdigit():
                gen_cmd.append("".join(random.choices(alf,k=int(x))))
            case ["ALF",x] if str(x).isdigit():
                gen_cmd.append("".join(random.choices(ALF,k=int(x))))
            case ["@@@",x] if str(x).isdigit():
                gen_cmd.append(''''''.join(random.choices(spec_char,k=int(x))))
        continue
    return gen_cmd           

def ask_preff():
    n_cmd=[]
    cmd=[]
    z=1
    print("COMMANDS ARE: ")
    print("\tnum -> one number")
    print("\t@@@ -> one special char")
    print("\talf -> one alfabet")
    print("\tALF -> one capital alfabet")
    print("WHEN COMMAND FOLLOWED BY NUMBER(N) ->COMMAND WILL CREATE THAT TYPE N TIME'S ")
    print("\tlen X -> X numbers of password will be created")
    print("\t/rm/ -> terminate last preffed value")
    print("\t/rmcmd/ -> terminate last command")
    print("\t/ls/ -> print your current status")
    print("ANY VALUE GIVEN LIKE / X / -> X WILL BE CONSIDERED A PREFFERED VALUE")
    print("\t**note** spacing between two word will be considered as seperate preffered value's")
    print("\t /N/ x will print x number of different passwords ")
    print("\t / -> generate")
    while True:
        y = input(" prefference (pls): ")
        y=y.split()
        match y:
            case ["/"]:
                break
            case ["/",x]:
                n_cmd.append([x])    
            case ["/rm/"]:
                n_cmd.pop()
            case ["/rmcmd/"]:
                cmd.pop()    
            case ["len",x] if x.isdigit():
                z=x
            case ["/ls/"]:
                print("n_cmd's: ",n_cmd)
                print("cmd's: ",cmd)
                print("length: ",z)
            case ["help"]:
                print("COMMANDS ARE: ")
                print("\tnum -> one number")
                print("\t@@@ -> one special char")
                print("\talf -> one alfabet")
                print("\tALF -> one capital alfabet")
                print("WHEN COMMAND FOLLOWED BY NUMBER(N) ->COMMAND WILL CREATE THAT TYPE N TIME'S ")
                print("\tlen X -> X numbers of password will be created")
                print("\t/rm/ -> terminate last preffed value")
                print("\t/rmcmd/ -> terminate last command")
                print("\t/ls/ -> print your current status")
                print("ANY VALUE GIVEN LIKE / X / -> X WILL BE CONSIDERED A PREFFERED VALUE")
                print("\t**note** spacing between two word will be considered as seperate preffered value's")
                print("\t /N/ x will print x number of different passwords ")
                print("\t / -> generate")
            case ["num"]:
                cmd.append("".join(y))
            case ["alf"]:
                print("one alpfabet")
                cmd.append("".join(y))
            case ["ALF"]:
                print("one ALFABET")
                cmd.append("".join(y))
            case ["@@@"]:
                print("one special character")
                cmd.append("".join(y))
            case ["num",x] if x.isdigit():
                print("number with len",y[1])
                cmd.append(" ".join(y))
            case ["alf",x] if str(x).isdigit():
                print("alfabet with len ",y[1])
                cmd.append(" ".join(y))
            case ["ALF",x] if str(x).isdigit():
                print("ALFABET with len ",y[1])
                cmd.append(" ".join(y))
            case ["@@@",x] if str(x).isdigit():
                print("special character with len ",y[1])
                cmd.append(" ".join(y))
            case ["/N/",x] if str(x).isdigit():
                print("Number of passwords to generate ",y[1])
                n=int(x)
            case other:
                n_cmd.append(y)
    # print("cmd",cmd)
    # print("n_cmd",n_cmd)
    non_cmd=sum(n_cmd,[])
    return cmd,non_cmd,n

def randomisor(P):
    random.shuffle(P)
    random.shuffle(P)
    password=""
    for i in range(len(P)):
        x=str(P[i])
        password+=str(x)
    print(password)

    # something to save password into password.txt

# generate_password()
def password_dictionary():
    x=ask_preff()
    b=x[1]
    c=x[2]
    for i in range(int(c)):
        P=x[0]
        a=generator(P)
        randomisor(a+b)

password_dictionary()





