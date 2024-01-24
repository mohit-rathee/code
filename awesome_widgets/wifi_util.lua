local awful = require("awful")
local wibox = require("wibox")
-- local watch = require("awful.widget.watch")
local spawn = require("awful.spawn")
-- local gfs = require("gears.filesystem")
local naughty = require("naughty")
-- local beautiful = require("beautiful")

local wifi_util = {}
local wifi_check = "nmcli g"
local wifi_ch_regex = "connected"
local wifi_connect = "nmcli d wifi connect GalaxyF23"

local blutoth_check = "bluetoothctl info B4:9A:95:DF:F0:6D"
local blutoth_ch_regex = "connected: yes"
local blutoth_connect = "bluetoothctl connect B4:9A:95:DF:F0:6D"

local function worker (user_args)
    local args = user_args or {}
    local text
    if args.mode == " wifi " or args.mode == " bluetooth " then
        text = args.mode
    else
        text = " wifi " -- default
    end
    wifi_util.widget = wibox.widget.textbox()
    wifi_util.widget.text = text

    local notification

    function wifi_util:toggle()
        naughty.destroy(notification)
        if wifi_util.widget.text == " bluetooth " then
            wifi_util.widget.text = " wifi "
        else
            wifi_util.widget.text = " bluetooth "
        end
        wifi_util:check()
    end
    local function run_cmd (device,check_cmd,ch_regex,connect_cmd,conn_regex)
        spawn.easy_async(check_cmd,function (out)
        --spawn.easy_async(CMD,callback(stdout, stderr, reason, exit_code))
            ch_regex = string.format('%%s%s%%s',ch_regex)
            local connected = string.match(out:lower(),ch_regex)
            if connected then
                naughty.notify({ text = string.format("%s connected",device)})
            else
                naughty.notify({ text = "not connected"})
                naughty.notify({ text = string.format("trying out with %s",device)})
                spawn.easy_async(connect_cmd,function(conn_out)
                    conn_regex = string.format('%s',conn_regex,'%s')
                    connected = string.match(conn_out:lower(),conn_regex)
                    if connected then
                        naughty.notify({ text = "connected with GalaxyF23"})
                    else
                        naughty.notify({ text = "can't find device"})
                    end
                end)
            end
        end)
    end
        --wifi_util:check("wifi",wifi_check,"connected")
    function wifi_util:check()
        local ch_cmd
        local ch_rgx
        if wifi_util.widget.text == " wifi " then
            ch_cmd = wifi_check
            ch_rgx = wifi_ch_regex
        else
            ch_cmd = blutoth_check
            ch_rgx = blutoth_ch_regex
        end
        awful.spawn.easy_async(ch_cmd,
                function(stdout, _, _, _)
                    if notification then
                        naughty.destroy(notification)
                        notification = false
                    end
                    ch_rgx = string.format('%%s%s%%s',ch_rgx)
                    local connected = string.match(stdout:lower(),ch_rgx)
                    local result
                    if connected then
                        result = "connected"
                    else
                        result = "not connected"
                    end
                    notification = naughty.notify {
                        title = wifi_util.widget.text ,
                        text = result,
                        width = 200,
                        --timeout = 3,
                    }
                end)
    end
    function wifi_util:connect()
        if wifi_util.widget.text == " wifi " then
            run_cmd('wifi',wifi_check,"connected",wifi_connect,"successfully")
        else
            run_cmd('bluetooth',blutoth_check,"connected: yes",blutoth_connect,"successful")
        end
    end
    wifi_util.widget:buttons(
            awful.util.table.join(
                    awful.button({}, 1, function() wifi_util:connect() end),
                    awful.button({}, 3, function() wifi_util:toggle() end)
                    --awful.button({}, 4, function() wifi_util:check_wifi() end)
                    --awful.button({}, 5, function() wifi_util:toggle() end)
            )
    )

    wifi_util.widget:connect_signal("mouse::enter", function() wifi_util:check() end)
    wifi_util.widget:connect_signal("mouse::leave", function() naughty.destroy(notification) end)
    return wifi_util.widget
end


return setmetatable(wifi_util, { __call = function(_, ...)
    return worker(...)
end })
