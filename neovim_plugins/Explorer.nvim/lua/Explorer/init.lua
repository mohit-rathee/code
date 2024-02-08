
local M ={}

M.pwd = function()
    print('You are in',vim.fn.getcwd())
end
M.ls = function()
    local cwd = vim.fn.getcwd()
    M.pwd()
    local files = vim.fn.glob(cwd..'/*',true,true)
    local counter = 0
    for _,key in pairs(files) do
        counter = counter +1
        print(key)
    end
    print(counter,'files found.')
end
return M


