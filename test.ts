// tests go here; this will not be compiled when this package is used as a library
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
