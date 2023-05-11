export class Component {
  $el: HTMLElement
  $list: NodeListOf<Element>
  constructor(id: string) {
    if (id === 'params') {
      this.$list = document.getElementsByClassName('params')! as any
    } else {
      this.$el = document.getElementById(id) as HTMLElement
    }

    this.init()
  }

  init() {}

  onShow() {}

  onHide() {}

  hide(): void {
    this.$el.classList.add('hide')
    this.onHide()
  }

  show(): void {
    this.$el.classList.remove('hide')

    this.onShow()
  }
}
