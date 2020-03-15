class Buttons {
  constructor() {
    this.target, this.navigation
    this.active = true
    this.handleClick =this.handleClick.bind(this)
  }

  load(nav) {
    if (!this.navigation) {
      this.navigation = nav
    }

    if (this.target === undefined) {
      this.target = document.createElement('button')
      this.target.setAttribute('id', 'btn-nav')
      this.target.classList.add('buttons__btn')
      this.target.innerHTML = 'Navigation'
      this.target.onclick = this.handleClick
      document.getElementsByClassName('buttons')[0].appendChild(this.target)
    }
  }

  toggle(elem) {
    elem.classList.toggle('hide')
  }

  handleClick(e) {
    const btn = e.target.id

    if (btn === 'btn-nav') {
      this.toggle(this.navigation.target)
    }
  }
}

export default Buttons
