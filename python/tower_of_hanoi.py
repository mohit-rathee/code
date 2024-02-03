def toh (n, source, dest, alter) :
    if n==0:
        return
    toh(n-1, source ,alter, dest)
    print( source+" to "+ dest)
    toh(n-1, alter ,dest , source)

toh(3,"A","B","C")
