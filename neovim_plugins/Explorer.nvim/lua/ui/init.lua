
local ui = {}
ui.win_id = nil
local create_window = function ()
    local str = "HELLO"
    local buffer_id = vim.fn.bufnr(str,true)
    vim.api.nvim_buf_set_name(buffer_id,str)
    local width=60
    local height=15
    local row = (vim.api.nvim_get_option('lines') - height) / 2
    local col = (vim.api.nvim_get_option('columns') - width) / 2
    local win_id = vim.api.nvim_open_win(
        buffer_id,
        true,
        {
            relative = 'win',
            row=row,
            col=col,
            anchor="NW",
            border="single",
            title="Explorer",
            title_pos="center",
            width=width,
            height=height
        }
    )
    ui.win_id=win_id
    return win_id
end

local function toogle_window()
    if ui.win_id then
        local is_valid = vim.api.nvim_win_is_valid(ui.win_id)
        if is_valid then
            vim.api.nvim_win_close(ui.win_id, true)
        else
            create_window()
        end
    else
        create_window()
    end
end

ui.toogle_window=toogle_window

ui.whereami = function ()
        local vline_start = vim.fn.line("v")
        local vcol_start = vim.fn.col("v")
        local vline_end = vim.fn.line(".")
        local vcol_end = vim.fn.col(".")
        local mode = vim.api.nvim_get_mode().mode

        if mode == "V" then
            vcol_start = 1
            vcol_end = vim.fn.col("$") - 1
        elseif mode ~= "v" then
            error("Only visual and visual line modes are supported.")
        end

        if vline_start > vline_end then
            vline_start, vline_end = vline_end, vline_start
            if mode ~= "V" then
                vcol_start, vcol_end = vcol_end, vcol_start
            end
        elseif vline_start == vline_end and vcol_start > vcol_end then
           vcol_start, vcol_end = vcol_end, vcol_start
        end

    P({
            vline_start = vline_start,
            vcol_start = vcol_start,
            vline_end = vline_end,
            vcol_end = vcol_end,
        })
end
return ui
