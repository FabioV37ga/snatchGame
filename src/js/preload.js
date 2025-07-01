var images = [
    "src/img/skeleton_hurt.gif",
    "src/img/skeleton.gif",
    "src/img/attack/attack0.png",
    "src/img/attack/attack1.png",
    "src/img/attack/attack2.png",
    "src/img/attack/attack3.png",
    "src/img/attack/attack4.png"

]
var audios = [
    "src/sound/bone.mp3",
    "src/sound/swoosh.mp3"
]
function preload() {
    for (let i = 0; i <= images.length - 1; i++) {
        var image = new Image().src = images[i]
    }
    for (let i = 0; i <= audios.length - 1; i++) {
        var audio = new Audio(audios[i])
        // audio.volume = 0
        // audio.play()
        console.log(audio)
    }
    console.log("(Preload) complete")
}

preload()