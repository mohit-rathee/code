local naughty = require("naughty")
local gears = require("gears")
local wibox = require("wibox")


naughty.connect_signal("request::display", function(n)

    naughty.layout.box({
        notification = n,
        border_width = 0,

        widget_template = {
            {
                {
                    naughty.widget.icon,
                    naughty.widget.title,
                    naughty.widget.message,
                    spacing = 8,
                    layout = wibox.layout.fixed.vertical,
                },
                margins = 8,
                widget = wibox.container.margin
            },

            bg = "#1e1e2e",
            shape = gears.shape.rounded_rect,
            widget = wibox.container.background
        }
    })
end)
