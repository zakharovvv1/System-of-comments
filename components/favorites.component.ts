import { Component } from '../core/component'
import {
  objectComponent,
  inputCommentToHtml,
  deleteAll,
  inputAnswersToHtml,
} from '../core/componentsObj'
import { searchRating } from './params.component'
import { createParams, params } from '../src/index'

export class Favorites extends Component {
  constructor(id: string) {
    super(id)
  }

  init(): void {
    this.$el.addEventListener('click', favoriteButtonHandler.bind(this))
  }
}

function favoriteButtonHandler(): void {
  this.$el.classList.add('active')
  objectComponent.input.classList.add('hide')
  deleteAll()

  let comments = JSON.parse(localStorage.getItem('comments')!)
  let answers = JSON.parse(localStorage.getItem('answers')!)
  let commentsFilter: any[] = []
  let answersFilter: any[] = []
  const menu = objectComponent.menu
  comments.forEach((e) => {
    if (e.isFavorite === true) {
      commentsFilter.push(e)
    }
  })

  if (answers) {
    answers.forEach((a) => {
      if (a.isFavorite === true) {
        answersFilter.push(a)
      }
    })
  }
  // только комменты
  if (commentsFilter.length !== 0 && answersFilter.length === 0) {
    for (let i = 0; i < commentsFilter.length; i++) {
      inputCommentToHtml(commentsFilter[i], menu)
    }
  }

  // только ответы
  else if (answersFilter.length !== 0 && commentsFilter.length === 0) {
    for (let i = 0; i < answersFilter.length; i++) {
      inputAnswersToHtml(answersFilter[i], menu)
    }
  }
  // самый актуальный вариант
  else if (answersFilter.length !== 0 && commentsFilter.length !== 0) {
    for (let i = 0; i < commentsFilter.length; i++) {
      inputCommentToHtml(commentsFilter[i])
    }
    for (let i = 0; i < answersFilter.length; i++) {
      inputAnswersToHtml(answersFilter[i])
    }
  } else if (comments.length === 0 && answers.length === 0) {
    const menu: HTMLElement = document.querySelector('.menu')!
    const titleFavotite: HTMLElement = document.createElement('div')
    titleFavotite.innerHTML = ' В избранном пока ничего нет'
    titleFavotite.classList.add('titleFavorite')
    menu.after(titleFavotite)
  }
  searchRating()
  createParams('params')
  // когда нет ничего в избранном
}
