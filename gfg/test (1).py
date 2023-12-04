def ECHO():
    print("i_am_ON")
    ECHO()
try:
    if True :
        ECHO()
except:
    print("i_am_DONE")
