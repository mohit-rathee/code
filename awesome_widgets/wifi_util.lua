local awful = require("awful")
local gears = require("gears")
local beautiful = require("beautiful")
local wibox = require("wibox")
--local watch = require("awful.widget.watch")
local spawn = require("awful.spawn")
-- local gfs = require("gears.filesystem")
local naughty = require("naughty")
-- local beautiful = require("beautiful")

local notification

local wifi_util = {}
local wifi_check = "nmcli g"
local wifi_ch_regex = "connected"
local wifi_connect = "nmcli d wifi connect GalaxyF23"

local blutoth_check = "bluetoothctl info 74:D7:13:ED:10:00"
local blutoth_ch_regex = "connected: yes"
local blutoth_connect = "bluetoothctl connect 74:D7:13:ED:10:00"

local function run_cmd(device, connect_cmd, conn_regex)
    --spawn.easy_async(CMD,callback(stdout, stderr, reason, exit_code))
    naughty.notify({ text = "trying to connect" })
    spawn.easy_async(connect_cmd, function(conn_out)
        conn_regex = string.format('%s', conn_regex, '%s')
        local connected = string.match(conn_out:lower(), conn_regex)
        if connected then
            naughty.notify({ text = "connected with device" })
        else
            naughty.notify({ text = "can't find device" })
        end
    end)
end
local function worker(user_args)
    local args = user_args or {}
    local text
    if args.mode == "wifi" or args.mode == "bluetooth" then
        text = args.mode
    else
        text = "wifi" --default
    end
    wifi_util.widget = wibox.widget.textbox()
    wifi_util.widget.text = text

    local function rounded_shape(size)
        return function(cr, width, height)
            gears.shape.rounded_rect(cr, width, height, size)
        end
    end

    local cal = wibox.widget {}

    local popup = awful.popup {
        ontop = true,
        visible = true,
        shape = rounded_shape(8),
        offset = { y = 5 },
        border_width = 1,
        widget = cal
    }


    function wifi_util:toggle()
        naughty.destroy(notification)
        if wifi_util.widget.text == "bluetooth" then
            wifi_util.widget.text = "wifi"
        else
            wifi_util.widget.text = "bluetooth"
        end
        wifi_util:check(true)
    end

    --wifi_util:check("wifi",wifi_check,"connected")
    function wifi_util:check(show_notification, callback)
        local ch_cmd
        local ch_rgx
        local device = wifi_util.widget.text
        if device == "wifi" then
            ch_cmd = wifi_check
            ch_rgx = wifi_ch_regex
        else
            ch_cmd = blutoth_check
            ch_rgx = blutoth_ch_regex
        end
        --      local watcher = watch("ls", 2, function ()
        --        naughty.notify({text="hd"})
        --      end,wifi_util)
        awful.spawn.easy_async(ch_cmd,
            function(stdout, _, _, _)
                if notification then
                    naughty.destroy(notification)
                    notification = false
                end
                ch_rgx = string.format('%%s%s%%s', ch_rgx)
                local connected = string.match(stdout:lower(), ch_rgx)
                local result
                if connected then
                    result = "connected"
                    if not show_notification then
                        callback(device, true)
                    end
                else
                    result = "not connected"
                    if not show_notification then
                        callback(device, false)
                    end
                end
                notification = naughty.notify {
                    title = wifi_util.widget.text,
                    text = result,
                    width = 200,
                    --timeout = 3,
                }
            end)
    end

    function wifi_util:connect()
        wifi_util:check(false, function(device, is_conn)
            if not is_conn then
                if device == "wifi" then
                    run_cmd(device, wifi_connect, "successfully")
                else
                    run_cmd(device, blutoth_connect, "successful")
                end
            end
        end)
    end

    wifi_util.widget:buttons(
        awful.util.table.join(
            awful.button({}, 1, function() wifi_util:connect() end),
            awful.button({}, 3, function() wifi_util:toggle() end)
        --awful.button({}, 4, function() wifi_util:check_wifi() end)
        --awful.button({}, 5, function() wifi_util:toggle() end)
        )
    )

    wifi_util.widget:connect_signal("mouse::enter", function() wifi_util:check(true) end)
    wifi_util.widget:connect_signal("mouse::leave", function() naughty.destroy(notification) end)
    return wifi_util.widget
end


return setmetatable(wifi_util, {
    __call = function(_, ...)
        return worker(...)
    end
})
