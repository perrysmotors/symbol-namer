# Symbol Namer plugin for Sketch
[![Download from Sketchpacks.com](https://badges.sketchpacks.com/plugins/com.gilesperry.symbol-namer/version.svg)](https://api.sketchpacks.com/v1/plugins/com.gilesperry.symbol-namer/download) [![Compatible Sketch Version](https://badges.sketchpacks.com/plugins/com.gilesperry.symbol-namer/compatibility.svg)](https://sketchpacks.com/perrysmotors/symbol-namer)

A Sketch plugin to help you rename symbol instances.

## Features
- Rename symbol instances to their override text values

or

- Set and use a default name

## How Symbol Namer works with text overrides

![symbol namer](https://user-images.githubusercontent.com/12557727/52470294-a5928b00-2b85-11e9-9a28-3e2321c75c72.gif)

- The name is based on the value of the text override that appears first in the Inspector panel
- Symbol instances without text overrides are ignored

When a symbol has more than one text override, **Symbol Namer** assumes that you have set your symbol up nicely, so that its primary override is listed first in Sketch's Inspector panel. You can control this order by arranging the symbol master's layers in the desired order.

## How defaults work
When you create a symbol you might give it a name like `Components/Album/Card/Default` to keep your symbols organised. So this is the name that Sketch uses when you insert the symbol. But in the Layers Panel `Album Card` might be better. Symbol Namer let's you set this as a default, making it quick and easy to reapply the saved name whenever needed. If you don't define a default then symbols will be renamed to match their master.

**Default names can be set on Library symbols:**

- Set the default in the library file to use it across all documents. 
- Set the default in an individual document to use it in that document only.

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
