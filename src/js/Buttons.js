class Buttons {
  constructor() {
    this.navigation
    this.sound
    this.active = true

    // Create buttons container
    const container = document.createElement('div')
    container.classList.add('buttons')
    document.body.appendChild(container)
    
    this.handleClick = this.handleClick.bind(this)
  }

  load(nav, sound) {
    if (nav) {
      this.navigation = nav
      const mapIcon = this.createIcon(['fa', 'fa-globe-americas'])
      const navBtn = this.createButton('btn-nav', mapIcon, false)
      document.getElementsByClassName('buttons')[0].appendChild(navBtn)
    }
    if (sound) {
      this.sound = sound
      const soundIcon = this.createIcon(['fa', 'fa-volume-up'])
      const soundBtn = this.createButton('btn-sound', soundIcon, false)
      document.getElementsByClassName('buttons')[0].appendChild(soundBtn)
    }
  }

  createButton(id, icon, active) {
    const elem = document.createElement('button')
    const classes = active ? ['buttons__btn', 'buttons__btn--active'] : ['buttons__btn']

    elem.setAttribute('id', id)
    elem.classList.add(...classes)
    elem.appendChild(icon)
    elem.onclick = this.handleClick
    return elem
  }

  createIcon(classes) {
    const elem = document.createElement('icon')
    elem.setAttribute('aria-hidden', 'true')
    elem.classList.add(...classes)
    return elem
  }

  toggleNav(obj, btn) {
    obj.target.classList.toggle('hide')
    btn.classList.toggle('buttons__btn--active')
  }

  toggleSound(obj, btn) {
    obj.togglePlay()
    obj.target.classList.toggle('sound--active')
    btn.classList.toggle('buttons__btn--active')
  }

  handleClick(e) {
    // We check the propagation chain for our target elem
    const navBtn = e.path.find(target => target.id === 'btn-nav')
    const soundBtn = e.path.find(target => target.id === 'btn-sound')

    if (navBtn) {
      this.toggleNav(this.navigation, navBtn)
    }
    if (soundBtn) {
      this.toggleSound(this.sound, soundBtn)
    }
  }
}

export default Buttons
