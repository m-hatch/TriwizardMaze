class Sound {
  constructor () {
    this.target, this.audioMain
    
    if (this.target === undefined) {
      // Audio container
      this.target = document.createElement('div')
      document.body.appendChild(this.target)
      this.target.setAttribute('id', 'sound')

      // Create audio background
      this.audioMain = document.createElement('audio')
      this.audioMain.src = 'media/rain.mp3'
      this.audioMain.setAttribute('loop', '')
      this.target.appendChild(this.audioMain)
    }
  }

  togglePlay() {
    this.audioMain.paused ? this.audioMain.play() : this.audioMain.pause()
  }
}

export default Sound
