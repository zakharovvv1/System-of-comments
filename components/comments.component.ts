import { Component } from '../core/component'
import { objectComponent } from '../core/componentsObj'
import { removeClassActive } from '../core/componentsObj'

import { Avatars } from '../core/componentsObj'
import { inputCommentToHtml } from '../core/componentsObj'
import { deleteCommentFromHtml } from '../core/componentsObj'
import { inputAnswersToHtml } from '../core/componentsObj'
import { createParams } from '../src/index'
import { searchRating } from './params.component'

export class Comments extends Component {
  constructor(id: string) {
    super(id)
  }

  init(): void {
    this.$el.addEventListener('click', () => {
      insertCommentToHtml()

      createParams('params')
    })
  }
}
let z = true

if (!localStorage.getItem('filter')) {
  localStorage.setItem('filter', 'По дате')
}

const arrowFilter = document.querySelector('.filter__arrow')!

if (!arrowFilter.classList.contains('filter__downToUp')) {
  localStorage.setItem('arrowFilter', 'Up')
} else {
  localStorage.setItem('arrowFilter', 'Down')
}

function commentsButtonHandler(): void | object {
  objectComponent.favoritesBody.remove()

  if (localStorage.length) {
    activeHide()
  } else {
    deleteCommentFromHtml()
    activeHide()
  }
  removeClassActive()

  if (this.$el) this.$el.classList.add('active')
}

export function randomNumberForAvatars() {
  return Math.ceil(Math.random() * (Avatars.length - 0) + 0)
}

document.addEventListener('DOMContentLoaded', () => {
  insertCommentToHtml()
  searchRating()
  createParams('params')
})

export function insertCommentToHtml(commentsForFilter?) {
  document.querySelectorAll('.commentariy').forEach((e) => e.remove())
  document.querySelectorAll('.answer__answer').forEach((e) => e.remove())
  document.querySelectorAll('.answers').forEach((e) => e.remove())
  objectComponent.input.classList.remove('hide')
  let comments
  let answers
  if (commentsForFilter) {
    comments = commentsForFilter
  } else {
    if (localStorage.getItem('filter') === 'По количеству ответов') {
      if (localStorage.getItem('arrowFilter') === 'Up') {
        comments = JSON.parse(localStorage.getItem('comments')!)
      } else {
        comments = JSON.parse(localStorage.getItem('comments')!).reverse()
      }

      objectComponent.filterText.innerHTML = 'По количеству ответов'
    } else if (localStorage.getItem('filter') === 'По дате') {
      if (localStorage.getItem('arrowFilter') === 'Up') {
        comments = JSON.parse(localStorage.getItem('comments')!).reverse()
      } else {
        comments = JSON.parse(localStorage.getItem('comments')!)
      }
      objectComponent.filterText.innerHTML = 'По дате'
    } else if (localStorage.getItem('filter') === 'По количеству оценок') {
      if (localStorage.getItem('arrowFilter') === 'Up') {
        comments = JSON.parse(localStorage.getItem('comments')!)
      } else {
        comments = JSON.parse(localStorage.getItem('comments')!).reverse()
      }
      objectComponent.filterText.innerText = 'По количеству оценок'
    }
  }
  answers = JSON.parse(localStorage.getItem('answers')!)
  objectComponent.screen.classList.remove('hide')

  objectComponent.input.classList.remove('hide')

  if (comments) {
    for (let i = 0; i < comments.length; i++) {
      inputCommentToHtml(comments[i])
    }
    if (answers) {
      for (let i = 0; i < answers.length; i++) {
        inputAnswersToHtml(answers[i])
      }
    }
  }
  debugger
  const num: number = randomNumberForAvatars()

  const avatar: HTMLElement = document.querySelector('.form__avatar')!

  avatar.innerHTML = `<img
  src="${Avatars[num]}"
  alt="" class="avatar-img"
/>`
  searchRating()
}

function activeHide() {
  objectComponent.screen.classList.remove('hide')
  objectComponent.screen.classList.add('active-screen')
}

// Сортировка комментов =============================================================================================================

const filter = document.getElementById('filter')!
console.log(filter)

filter.addEventListener('click', showFilters)

let filterHandler: boolean = true
const divUl: any = document.createElement('div')
let flex: any = ''
function showFilters(e) {
  if (filterHandler) {
    if (localStorage.getItem('filter') === 'По дате') {
      flex = 'flex-start;'
    } else if (localStorage.getItem('filter') === 'По количеству оценок') {
      flex = 'flex-end;'
    } else if (localStorage.getItem('filter') === 'По количеству ответов') {
      flex = ''
    }
    divUl.classList.add('filter-menu')
    divUl.style.cssText =
      'position: absolute; background-color: white; display: flex; column-gap: 7px; justify-content: center; padding: 8px; box-shadow: 2px 2px 2px 2px gray;'
    divUl.innerHTML = `
    <img src="../img/filter/icon1.svg" alt="Галочка" style="align-self: ${flex}" >
    <ul style="display: flex; flex-direction:column; row-gap: 5px; margin:0;">  
      <li class="filter__date filters">По дате</li>
      <li class="filter__answersNun filters" >По количеству ответов</li>
      <li class="filter__grade filters">По количеству оценок</li>
    </ul`
    if (e.target.localName == 'img') {
      e.target.parentElement.previousElementSibling.insertAdjacentElement(
        'beforeend',
        divUl
      )
    } else {
      e.target.insertAdjacentElement('beforeend', divUl)
    }
    filterHandler = false

    const filterByDate = divUl.querySelector('.filter__date')
    filterByDate.addEventListener('click', showCommentsByDate)

    const filterByAnswers = divUl.querySelector('.filter__answersNun')
    filterByAnswers.addEventListener('click', showCommentsByQuantityAnswers)

    const filterByRating = divUl.querySelector('.filter__grade')
    filterByRating.addEventListener('click', showCommentsByRating)
  }
}

// Сортировка комментво по количеству ответов
function showCommentsByQuantityAnswers() {
  deleteAllComments()
  let comments = JSON.parse(localStorage.getItem('comments')!)
  let answers = JSON.parse(localStorage.getItem('answers')!)
  console.log(answers)
  if (!answers) {
    localStorage.setItem('filter', 'По количеству ответов')
    objectComponent.filterText.innerText = 'По количеству ответов'
    insertCommentToHtml()

    return
  }
  const key = 'idOfCommentAnswer' // ключ, по которому будем сортировать
  const sorted = answers.sort((a1, a2) => (a1[key] > a2[key] ? 1 : -1))
  let x: any = []

  sorted.forEach((e) => {
    x.push(e.idOfCommentAnswer)
  })
  debugger
  const res = x.reduce((acc, i) => {
    if (acc.hasOwnProperty(i)) {
      acc[i] += 1
    } else {
      acc[i] = 1
    }
    return acc
  }, {})

  console.log(res)

  let idOfFilters: number[] = []
  const t = Object.entries(res).sort((a, b) => (b[1] as any) - (a[1] as any))
  for (let i = 0; i < t.length; i++) {
    idOfFilters.push(Number(t[i][0]))
  }

  // сортирую по idOfFilters массив объектов комментариев из локал стораже

  let sortedComments: any = []
  for (let i = 0; i < idOfFilters.length; i++) {
    for (let j = 0; j < comments.length; j++) {
      if (idOfFilters[i] === comments[j].idOfComment) {
        sortedComments.push(comments[j])
      }
    }
  }
  debugger
  console.log(sortedComments)

  // let sortedComments: any = [] // Комменты с ответами

  // let commentsWithoutAns: any = []
  // for (let i = 0; i < comments.length; i++) {
  //   for (let j = 0; j < idOfFilters.length; j++) {
  //     if (comments[i].idOfComment === idOfFilters[j]) {
  //       sortedComments.push(comments[i])
  //     }
  //   }
  // }
  // console.log(sortedComments)

  // for (let i = 0; i < sortedComments.length; i++) {
  //   for (let j = 0; j < comments.length; j++) {
  //     if (comments[j].idOfComment !== sortedComments[i].idOfComment) {
  //       commentsWithoutAns.push(comments[j])
  //       break
  //     }
  //   }
  // }

  let newArr: any = []
  console.log(comments)

  for (let i = 0; i < comments.length; i++) {
    if (!sortedComments.includes(comments[i])) {
      sortedComments.push(comments[i])
    }
  }
  debugger
  console.log(sortedComments)

  objectComponent.filterText.innerText = 'По количеству ответов'
  insertCommentToHtml(sortedComments)

  createParams('params')
  console.log('Остортированный массив по ответам', sortedComments)
  localStorage.setItem('filter', 'По количеству ответов')
  localStorage.setItem('comments', JSON.stringify(sortedComments))
}

// Сортиврока комментов по дате

function showCommentsByDate() {
  deleteAllComments()
  let comments = JSON.parse(localStorage.getItem('comments')!)
  comments.sort((a, b) => a.idOfComment - b.idOfComment)
  localStorage.setItem('filter', 'По дате')
  localStorage.setItem('comments', JSON.stringify(comments))
  insertCommentToHtml(comments.reverse())

  createParams('params')

  objectComponent.filterText.innerText = 'По дате'
}

function deleteAllComments() {
  const comments = document.querySelectorAll('.commentariy')
  comments.forEach((e) => e.remove())
}

// Сортировка комментов по рейтингу====================================================================================

function showCommentsByRating() {
  objectComponent.filterText.innerText = 'По количеству оценок'
  let comments = JSON.parse(localStorage.getItem('comments')!)
  comments.sort((a, b) => a.rating - b.rating)
  console.log(comments)
  localStorage.setItem('filter', 'По количеству оценок')
  localStorage.setItem('comments', JSON.stringify(comments))
  insertCommentToHtml(comments)

  createParams('params')
}

const main = document.querySelector('.main')
main?.addEventListener('click', hideFilters)

function hideFilters(e) {
  if (!(e.target as any).parentElement.classList.contains('filter')) {
    divUl.remove()
    filterHandler = true
  }
}

arrowFilter.addEventListener('click', showCommentsReversed)

function showCommentsReversed(e) {
  deleteAllComments()

  if (!e.target.classList.contains('filter__downToUp')) {
    e.target.style.transform = 'rotate(-180deg)'
    e.target.classList.add('filter__downToUp')
    localStorage.setItem('arrowFilter', 'Down')
  } else {
    e.target.style.transform = 'rotate(0deg)'
    e.target.classList.remove('filter__downToUp')
    localStorage.setItem('arrowFilter', 'Up')
  }

  insertCommentToHtml()

  createParams('params')
}

// функции обработки цвета рейтинга

export function toColorLikes() {
  let ratingTexts = document.querySelectorAll('.like__number') as any

  ratingTexts.forEach((ratingText) => {
    if (Number(ratingText.innerText) < 0) {
      ratingText.style.color = 'red'
    } else if (Number(ratingText.innerText) > 0) {
      ratingText.style.color = '#599b08'
    }
  })
}
