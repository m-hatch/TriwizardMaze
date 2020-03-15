class Buttons {
  constructor() {
    this.navigation
    this.active = true
    this.handleClick =this.handleClick.bind(this)
  }

  load(nav) {
    if (nav) {
      this.navigation = nav
      const mapIcon = this.createIcon(['fa', 'fa-globe-americas'])
      const navBtn = this.createButton('btn-nav', mapIcon)
      document.getElementsByClassName('buttons')[0].appendChild(navBtn)
    }
  }

  createButton(id, icon) {
    const elem = document.createElement('button')
    elem.setAttribute('id', 'btn-nav')
    elem.classList.add('buttons__btn')
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

  toggle(elem) {
    elem.classList.toggle('hide')
  }

  handleClick(e) {
    // We check the propagation chain for our target elem
    if (e.path.find(target => target.id === 'btn-nav')) {
      this.toggle(this.navigation.target)
    }
  }
}

export default Buttons
