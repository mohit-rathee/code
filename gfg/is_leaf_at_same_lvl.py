def check(root):
    lvl=[root]
    ifLeafFound = False
    leaflvl = 0
    level = 0
    while lvl:
        level+=1
        newlvl=[]
        for node in lvl:
            if not node:
                continue
            if not node.left and not node.right:
                if not ifLeafFound:
                    ifLeafFound=True
                    leaflvl = level
                else:
                    if leaflvl!=level:
                        return False
            else:
                newlvl.append(node.left)
                newlvl.append(node.right)
        lvl = newlvl
    return True
        
