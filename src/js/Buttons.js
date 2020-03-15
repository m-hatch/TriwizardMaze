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
      const navBtn = this.createButton('btn-nav', mapIcon, true)
      document.getElementsByClassName('buttons')[0].appendChild(navBtn)
    }
  }

  createButton(id, icon, active) {
    const elem = document.createElement('button')
    const classes = active ? ['buttons__btn', 'buttons__btn--active'] : ['buttons__btn']

    elem.setAttribute('id', 'btn-nav')
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

  toggle(elem, btn) {
    elem.classList.toggle('hide')
    btn.classList.toggle('buttons__btn--active')
  }

  handleClick(e) {
    // We check the propagation chain for our target elem
    const navBtn = e.path.find(target => target.id === 'btn-nav')
    if (navBtn) {
      this.toggle(this.navigation.target, navBtn)
    }
  }
}

export default Buttons
