
#Mp3Player Package

![](/image.png/)

This library is designed to Mp3Player, You can get module here.

https://shop.elecfreaks.com/products/elecfreaks-octopus-mp3-player-module?_pos=2&_sid=68f42762c&_ss=r

## Code Example

```JavaScript
input.onButtonPressed(Button.A, function () {
    mp3Player.execute(
    mp3Player.playType.Play
    )
})
input.onButtonPressed(Button.B, function () {
    mp3Player.execute(
    mp3Player.playType.Pause
    )
})
mp3Player.MP3SetSerial(SerialPin.P1)
basic.forever(function () {
	
})

```
## Supported targets
for PXT/microbit

## License
MIT

