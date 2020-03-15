# Symbol Namer plugin for Sketch
[![Download from Sketchpacks.com](https://badges.sketchpacks.com/plugins/com.gilesperry.symbol-namer/version.svg)](https://api.sketchpacks.com/v1/plugins/com.gilesperry.symbol-namer/download) [![Compatible Sketch Version](https://badges.sketchpacks.com/plugins/com.gilesperry.symbol-namer/compatibility.svg)](https://sketchpacks.com/perrysmotors/symbol-namer)

A Sketch plugin to help you rename symbol instances.

## Features
- Rename symbol instances to their override text values
- ***New in Version 2*** – Set and use a default name
- ***New in Version 3*** – Templates!

![symbol namer](https://user-images.githubusercontent.com/12557727/76146764-7e123880-608d-11ea-8022-4f7a5a7dfdeb.gif)

## How Symbol Namer works with text overrides

- The name is based on the value of the text override that appears first in the Inspector panel
- Symbol instances without text overrides are ignored

When a symbol has more than one text override, **Symbol Namer** assumes that you have set your symbol up nicely, so that its primary override is listed first in Sketch's Inspector panel. You can control this order by arranging the symbol master's layers in the desired order.

## How defaults work
When you create a symbol you might give it a name like `Components/Album/Card/Default` to keep your symbols organised. So this is the name that Sketch uses when you insert the symbol. But in the Layers Panel `Album Card` might be better. Symbol Namer lets you set this as a default, making it quick and easy to reapply the saved name whenever needed. If you don't define a default then symbols will be renamed to match their master.

**Default names can be set on Library symbols:**

- Set the default in the library file to use it across all documents. 
- Set the default in an individual document to use it in that document only.

## How templates work

The Templates feature lets you define patterns for renaming your symbols. You can refer to each part of the symbol name by its position, either left to right or right to left, and you can also access override text:

- `%1` for first from left, `%2` for second from left, etc.
- `%-1` for the last entry, `%-2` for the second last entry, etc.
- `%O` for override text. 

e.g. `%2 %3` maps "Components/Album/Card/Default" to "Album Card"

If you insert a "Save" button using "Button/Large/Primary/Disabled" and a "Cancel" button using "Button/Large/Secondary/Default", then the template `%O %1 - %-1 State` would rename the buttons to "Save Button - Disabled State" and "Cancel Button - Default State".

Define a global template using `Define Template`. Apply the global template using `Rename Selection Using Template`.

Templates can also be used in `Set Default Symbol Name` to save a default pattern for renaming a specific symbol.

## Installation

* [Download](../../releases/latest/download/symbol-namer.sketchplugin.zip) the latest release of the plugin
* Un-zip
* Double-click on `symbol-namer.sketchplugin`

or...

[![Install Symbol Namer with Sketchpacks](http://sketchpacks-com.s3.amazonaws.com/assets/badges/sketchpacks-badge-install.png "Install Symbol Namer with Sketchpacks")](https://sketchpacks.com/perrysmotors/symbol-namer/install)

---

**If you are using this plugin, please 'star' the project**. It's a simple way to help me see how many people are using it.

If you ***love*** this plugin, why not shout me a coffee ☕️ via [PayPal](https://www.paypal.me/perrysmotors/2) to share the love!

<a href="https://www.paypal.me/perrysmotors/2">
  <img width="160" height="41" src="https://user-images.githubusercontent.com/12557727/39295119-7e115bca-4935-11e8-9fe9-802d667ac22c.png">
</a>
