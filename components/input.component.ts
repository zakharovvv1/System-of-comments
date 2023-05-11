import { Component } from '../core/component'
import { inputCommentToHtml } from '../core/componentsObj'
import { searchRating } from './params.component'

import { createParams } from '../src//index'

export class InputMessage extends Component {
  constructor(id: string) {
    super(id)
  }

  init(): void {
    this.$el.addEventListener('input', showSymbols.bind(this))
    this.$el.addEventListener('click', sendBtn.bind(this))
  }
}

let inputValue: number

function showSymbols(e) {
  inputValue = (document.querySelector('.input__message') as HTMLInputElement)
    .value.length
  if (e.target.classList.contains('input__message')) {
    console.log(inputValue)
    const inputMax: HTMLElement = document.querySelector('.input__max')!
    console.log(inputMax)

    const btn: HTMLElement = e.target.nextElementSibling
    if (inputValue > 1 || inputValue < 1000) {
      if (inputValue === 0) {
        btn.classList.remove('input_btn-color')
      } else {
        btn.classList.add('input_btn-color')
        inputMax.style.cssText = ''
      }
    }

    inputMax.innerHTML = `${inputValue}/1000`
    if (inputValue > 1000) {
      inputMax.style.cssText = 'font-weight: 700; color: red; opacity: 1'
      btn.classList.remove('input_btn-color')
    }
  }
}

function sendBtn(e) {
  let num: number = Number(JSON.parse(localStorage.getItem('NUM')!)) || 0
  if (inputValue < 1000 && inputValue !== 0) {
    if (e.target.classList.contains('input_btn')) {
      let comments: object[] =
        JSON.parse(localStorage.getItem('comments')!) || []
      console.log(inputValue)
      const commentariy: {
        idOfComment: number
        avatar: string
        text: string
        name: string
        date: object
        isFavorite: boolean
        rating: number
      } = {
        idOfComment: num,
        avatar: (document.querySelector('.avatar-img')! as HTMLImageElement)
          .src,
        text: (document.querySelector('.input__message')! as HTMLInputElement)[
          'value'
        ],
        name: (document.querySelector('.input__name') as HTMLElement).innerText,
        date: {
          data: new Date().toLocaleDateString(),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
        },
        isFavorite: false,
        rating: 0,
      }
      comments.push(commentariy)
      console.log(' Комментарий', commentariy)
      console.log(comments)

      setCommentToLocalStorage(comments, commentariy)
      num++
      localStorage.setItem('NUM', String(num))
    }
  }
}

function setCommentToLocalStorage(comments: object, commentariy: object): void {
  localStorage.setItem(`comments`, JSON.stringify(comments))

  inputCommentToHtml(commentariy)
  searchRating()
  createParams('params')
}
