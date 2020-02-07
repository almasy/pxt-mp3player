/**
 * Functions to MP3 by ELECFREAKS Co.,Ltd.
 */
//% weight=0 color=#009900 icon="\uf001" block="MP3"
namespace mp3Player {

    let Start_Byte = 0x7E
    let Version_Byte = 0xFF
    let Command_Length = 0x06
    let End_Byte = 0xEF
    let Acknowledge = 0x00
    let CMD = 0x00
    let para1 = 0x00
    let para2 = 0x00
    let highByte = 0x00
    let lowByte = 0x00
    let dataArr: number[] = [Start_Byte, Version_Byte, Command_Length, CMD, Acknowledge, para1, para2, highByte, lowByte, End_Byte]
	/*
	* Play status selection button list
	*/
    export enum playType {
        //% block="Play"
        Play = 0x0D,
        //% block="Stop"
        Stop = 0x16,
        //% block="PlayNext"
        PlayNext = 0x01,
        //% block="PlayPrevious"
        PlayPrevious = 0x02,
        //% block="Pause"
        Pause = 0x0E
    }
    /*
	* Loop button list
	*/
    export enum repeatList {
        //% block="no"
        No = 0,
        //% block="yes"
        Yes = 1
    }
    /**
     * TODO: Initializing the MP3 connection port as a serial port
     * @param pinRX Serial port TX pin of micro:bit , eg: SerialPin.P1
     */
    //% blockId="MP3_setSerial" block="set MP3Player model connect to %pinRX"
    //% weight=100 
    export function MP3SetSerial(pinRX: SerialPin): void {
        serial.redirect(
            pinRX,
            SerialPin.USB_TX,
            BaudRate.BaudRate9600
        )
        basic.pause(100)
    }
    /**
     * TODO: Perform playback or other
     * @param myType Left wheel speed , eg: playType.Play
     */
    //% blockId="execute" 
    //% block="execute procedure:%myType"
    //% weight=90 blockExternalInputs=true
    export function execute(myType: playType): void {
        CMD = myType
        para1 = 0x00
        para2 = 0x00
        dataArr[3] = CMD
        dataArr[5] = para1
        dataArr[6] = para2
        checkSum()
        sendData()
    }
    /**
     * TODO: Specify a song to play
     * @param tracking Specify a song , eg: 0
     * @param myAns repeat , eg: repeatList.Yes
     */
    //% blockId="setTracking" 
    //% block="play the mp3 on the track:%tracking|repeatList:%myAns"
    //% weight=85 tracking.min=1 tracking.max=255
    export function setTracking(tracking: number, myAns: repeatList): void {
        CMD = 0x03
        para1 = 0x00
        para2 = tracking
        dataArr[3] = CMD
        dataArr[5] = para1
        dataArr[6] = para2
        checkSum()
        sendData()
        execute(0x0D)
        if (myAns == 1)
            execute(0x19)
    }
    

     /**
     * TODO: Specify songs in the play folder
     * @param folderNum Specify a floder , eg: 0
     * @param fileNum Specify a song , eg: 0
     * @param myAns repeat , eg: repeatList.Yes
     */
    //% blockId="folderPlay" 
    //% block="play the mp3 in the folder:%folderNum|filename:%fileNum|repeatList:%myAns"
    //% weight=80 folderNum.min=1 folderNum.max=99 fileNum.min=1 fileNum.max=255
    export function folderPlay(folderNum: number, fileNum: number, myAns: repeatList): void {
        CMD = 0x0F
        para1 = folderNum
        para2 = fileNum
        dataArr[3] = CMD
        dataArr[5] = para1
        dataArr[6] = para2
        checkSum()
        sendData()
        if (myAns == 1)
            execute(0x19)
    } 
    
    /**
     * TODO: Loop songs in folders
     * @param folderNum Specify a floder , eg: 0
     */
    //% blockId="setLoopFolder" block="loop play all the MP3s in the folder:%folderNum"
    //% weight=73 folderNum.min=1 folderNum.max=99
    export function setLoopFolder(folderNum: number): void {
        CMD = 0x17
        para1 = 0
        para2 = folderNum
        dataArr[3] = CMD
        dataArr[5] = para1
        dataArr[6] = para2
        checkSum()
        sendData()
    }
    
    /**
     * TODO: Set volume
     * @param Sound Volume, eg: 48
     */
    //% blockId="setVolume" block="set volume(0~48):%volume"
    //% weight=70 volume.min=0 volume.max=48
    export function setVolume(volume: number): void {
        CMD = 0x06
        para1 = 0
        para2 = volume
        dataArr[3] = CMD
        dataArr[5] = para1
        dataArr[6] = para2
        checkSum()
        sendData()
    }

    function sendData(): void {
        let myBuff = pins.createBuffer(10);
        for (let i = 0; i < 10; i++) {
            myBuff.setNumber(NumberFormat.UInt8BE, i, dataArr[i])
        }
        serial.writeBuffer(myBuff)
        basic.pause(100)
    }
    function checkSum(): void {
        let total = 0;
        for (let i = 1; i < 7; i++) {
            total += dataArr[i]
        }
        total = 65536 - total
        lowByte = total & 0xFF;
        highByte = total >> 8;
        dataArr[7] = highByte
        dataArr[8] = lowByte
    }
} 
