
#Mp3Player Package

![](/image.png/)

This library is designed to Mp3Player, You can get module here.

https://www.elecfreaks.com/store/cute-bot.html

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
mp3Player.setLoop()
basic.forever(function () {
	
})

```
## Supported targets
for PXT/microbit

## License
MIT

