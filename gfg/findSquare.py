from typing import List


class Solution:
    unstaged_checked = {}
    checked = {}
    Max = 0
    
    def is_checked(self,x,y):
        query = str(x)+str(y)
        if self.checked.get(query):
            return True
        else:
            #print(query,end=" ")
            self.unstaged_checked[query] = True
            if self.mat[y][x] == 1:
                #print('found 1 at '+str(y)+str(x))
                return False
            return True
            
    def minSquare(self, n : int, m : int, mat : List[List[int]]) -> int:
        # storing variables in self
        self.X = m
        self.Y = n
        self.mat = mat
        
        for x in range(n):
            for y in range(m):
                #print(x,y)
                #print(self.checked)
                if not self.is_checked(y,x):
                    #print(y,x)
                    print('found new '+str(x)+str(y))
                    self.Max = max(self.Max,self.getMaxSquare(x,y))
        #self.X=None
        #self.Y=None
        #self.Max=None
        #self.checked = None
        #self.unstaged_checked = None
        #self.a_x = None
        #self.a_y = None
        #self.b_x = None
        #self.b_y = None
        #self.c_x = None
        #self.c_y = None
        #self.d_x = None
        #self.d_y = None
        #self.mat = None
        return self.Max
    
    def getMaxSquare(self,x,y):
        # x,y is already a square with side 1
        is_square = True
        side = 1
        # coordinates of corner are x and y
        # corner a has coordinates (a_x,a_y)
        # due to coordinate system in matrix
        # a_x = y and a_y = x 
        self.a_x = y
        self.a_y = x
        self.b_x = y
        self.b_y = x
        self.c_x = y
        self.c_y = x
        self.d_x = y
        self.d_y = x
        # check for squares with bigger sides
        while is_square:
            is_square = self.is_square_with_side(side+1)
            if is_square :
                side+=1
                for key,value in self.unstaged_checked.items():
                    self.checked[key] = value
                print('found square with side '+str(side))
        print('finally '+str(side))
        return side            


    def is_square_with_side(self,side):
        print( 'checking  for '+
            ' a:'+str((self.a_y, self.a_x))+
            ' b:'+str((self.b_y, self.b_x))+
            ' c:'+str((self.c_y, self.c_x))+
            ' d:'+str((self.d_y, self.d_x))+
            ' side: '+str(side)
        )
        if self.is_left():
            if self.is_top(self.a_x-1,self.b_x):
                # verified up-left square
                self.a_x = max(self.a_x-1,0)
                self.a_y = max(self.a_y-1,0)
                self.c_x = max(self.c_x-1,0)
                self.b_y = max(self.b_y-1,0)
                return True
            if self.is_bottom(self.c_x-1,self.d_x):
                # verified down-left square
                self.c_x = max(self.c_x-1,0)
                self.c_y = min(self.c_y+1,self.Y)
                self.a_x = max(self.a_x-1,0)
                self.d_y = min(self.d_y+1,self.Y)
                return True
            return False
        elif self.is_right():
            #print('right')
            #print('x :'+str(self.b_x))
            #print('y :'+str(self.b_y))
            if self.is_top(self.a_x,self.b_x+1):
                # verified up-right square
                self.b_x = min(self.b_x+1,self.X)
                self.b_y = max(self.b_y-1,0)
                self.d_x = min(self.d_x+1,self.X)
                self.a_y = max(self.a_y-1,0)
                return True
            if self.is_bottom(self.c_x,self.d_x+1):
                # verified down-right square
                self.d_y = min(self.d_y+1,self.Y)
                self.d_x = max(self.d_x+1,0)
                self.c_y = min(self.c_y+1,self.Y)
                self.b_x = min(self.b_x+1,self.X)
                return True
            return False
        else:
            return False
     
    def is_left(self):
        print('checking left')
        if self.a_x-1<0 :
            print('too left')
            return False
        else:
            print(self.a_y,self.c_y)
            for y in range(self.a_y,self.c_y+1):
            #    print('check for y: '+str(y))
                # variable y
                print(self.checked)
                if self.is_checked(self.a_x-1,y):
                    print('found 0')
                    return False
            print('left okay')
            return True
        
    def is_right(self):
        print('checking right')
        if self.b_x+1>=self.X :
            print('too right')
            return False
        else:
            #print(self.b_y,self.d_y)
            for y in range(self.b_y,self.d_y+1):
                # variable y
                if self.is_checked(self.b_x+1,y):
                    print('found 0')
                    return False
            print('right okay')
            return True

    def is_top(self,a,b):
        print('checking top')
        if self.a_y-1<0:
            print('too top')
            return False
        else:
            for x in range(a,b+1):
                # variable x
                if self.is_checked(x,self.a_y-1):
                    #print('found 0')
                    return False
            print('top okay')
            return True

    def is_bottom(self,a,b):
        print('checking bottom')
        #print('y :'+str(self.c_y+1)+' x from '+str(a)+' to '+str(b))
        print('-----')
        print(self.c_y)
        print(self.Y)
        if self.c_y+1>=self.Y:
            print('too bottom')
            return False
        else:
            for x in range(a,b+1):
                # variable x
                if self.is_checked(x,self.c_y+1):
                    print('found 0')
                    return False
            print('bottom okay')
            return True

#{ 
 # Driver Code Starts
class IntMatrix:

    def __init__(self) -> None:
        pass

    def Input(self, n, m):
        matrix = []
        #matrix input
        for _ in range(n):
            matrix.append([int(i) for i in input().strip().split()])
        return matrix

    def Print(self, arr):
        for i in arr:
            for j in i:
                print(j, end=" ")
            print()


if __name__ == "__main__":
    t = int(1)
    for _ in range(t):

        n, m = [7,10]

        mat = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,0,0,1,1,1,1],
            [0,1,0,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,0,0,1],
            [0,0,1,1,1,0,1,0,1,0],
            [1,1,1,1,1,1,1,0,0,1],
        ]
        obj = Solution()
        for i in mat:
            print(i)
        res = obj.minSquare(n, m, mat)

        print(res)

# } Driver Code Ends
