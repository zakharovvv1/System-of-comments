import { Component } from '../core/component'
import { randomNumberForAvatars } from '../components/comments.component'
import { Avatars } from '../core/componentsObj'
import { InputAnswerComponent } from '../components/input-answer.component'
import { toColorLikes } from '../components/comments.component'

export class Params extends Component {
  constructor(id: string) {
    super(id)
  }

  init(): void {
    Array.from(this.$list).forEach((e) =>
      e.addEventListener('click', paramsHandler.bind(this))
    )
  }
}
let nodeOfAns

function paramsHandler(e) {
  nodeOfAns = document.querySelectorAll('.ans_inactive')

  console.log(nodeOfAns)

  if (e.target.classList.contains('ans_inactive')) {
    const answerBody: HTMLElement = document.createElement('div')
    const randomNum: number = randomNumberForAvatars()
    answerBody.innerHTML = `<div class="container__form form" id="input-answer">
    <div class="form__avatar">
      <img
        src="${Avatars[randomNum]}"
        alt="" class="avatar-img avatar-img-answer"
      />
    </div>
    <div class="form__input input input-form-ans">
      <div class="input__nameAndMax">
        <div class="input__name name name-answer">Максим Авдеенко</div>
        <div class="input__max input__max-answer">Макс. 1000 символов</div>
      </div>
      <div class="input__input" id="answer-input">
        <textarea name="" id="" cols="30" rows="1" class="input__message input__message_answer"></textarea>
        <button class="input_btn input_btn-answer">Отправить</button>
      </div>
    </div>
  </div>`

    const paramsDivNearest = e.target.closest('#params')
    paramsDivNearest.after(answerBody)
    const inputAnswer = new InputAnswerComponent('input-answer')
    turnOffClassesBtn(nodeOfAns)
  } else if (
    // для просто комментов
    e.target.classList.contains('ans__favorite-com') &&
    !e.target.classList.contains('ans__in-favorite')
  ) {
    const img = e.target.previousElementSibling
    img.src = '../img/params/in_favorite.svg'
    e.target.innerText = 'В избранном'
    e.target.classList.add('ans__in-favorite')
    let comments: object[] | any =
      JSON.parse(localStorage.getItem('comments')!) || []
    const mainDivId: number = Number(
      e.target.parentElement.parentElement.parentElement.id
    )
    comments.forEach((com) => {
      if (com.idOfComment == mainDivId) {
        com.isFavorite = true
      }
    })
    localStorage.setItem('comments', JSON.stringify(comments))
  } else if (
    // для ответов
    e.target.classList.contains('ans__favorite-ans') &&
    !e.target.classList.contains('ans__favorite-inAns')
  ) {
    const img = e.target.previousElementSibling
    img.src = '../img/params/in_favorite.svg'
    e.target.innerText = 'В избранном'
    let answers = JSON.parse(localStorage.getItem('answers')!) || []
    const mainDivId =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        'data-ans'
      )
    answers.forEach((ans) => {
      if (ans.dataAns == mainDivId) {
        ans.isFavorite = true
      }
    })

    e.target.classList.add(`ans__favorite-inAns`)
    localStorage.setItem('answers', JSON.stringify(answers))
  } else if (e.target.classList.contains('ans__in-favorite')) {
    // Убираем коммент из избранного
    const img = e.target.previousElementSibling
    img.src = '../img/params/favorite.svg'
    e.target.innerText = 'В избранное'
    e.target.classList.remove('ans__in-favorite')
    let comments: object[] | any =
      JSON.parse(localStorage.getItem('comments')!) || []
    const mainDivId: number = Number(
      e.target.parentElement.parentElement.parentElement.id
    )
    comments.forEach((com) => {
      if (com.idOfComment === mainDivId) {
        com.isFavorite = false
      }
    })
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  // Убираем ответы из избранного
  else if (e.target.classList.contains('ans__favorite-inAns')) {
    const img = e.target.previousElementSibling
    img.src = '../img/params/favorite.svg'
    e.target.innerText = 'В избранное'
    let answers = JSON.parse(localStorage.getItem('answers')!) || []
    const mainDivId =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        'data-ans'
      )
    answers.forEach((ans) => {
      if (ans.dataAns === mainDivId) {
        ans.isFavorite = false
      }
    })

    e.target.classList.remove(`ans__favorite-inAns`)
    localStorage.setItem('answers', JSON.stringify(answers))
  }
}

export const main = document.querySelector('.main')!
const inputAnswer = document.querySelector('#input-answer')
console.log(main)

main.addEventListener('click', function (e) {
  if (
    !(e.target as any).classList.contains('ans__text') &&
    !(e.target as any).classList.contains('input__message_answer') &&
    !(e.target as any).classList.contains('input_btn-answer') &&
    !(e.target as any).classList.contains('ans__favorite-com') &&
    !(e.target as any).classList.contains('ans__favorite-ans')
  ) {
    const inputAnswerBody = document.getElementById('input-answer')!

    if (inputAnswerBody) {
      inputAnswerBody.parentElement!.remove()
      turnOnClassesBtn()
    }
  }
})

function turnOffClassesBtn(nodeOfAns) {
  nodeOfAns.forEach((e) => {
    e.classList.remove('ans_inactive')
  })
}

function turnOnClassesBtn() {
  document.querySelectorAll('.ans__text').forEach((e) => {
    e.classList.add('ans_inactive')
  })
}

// Изменение рейтинга ============================================================================================

document.addEventListener('DOMContentLoaded', searchRating)

export function searchRating() {
  const rating = document.getElementsByClassName('params__like')

  Array.from(rating).forEach((m) => {
    m.addEventListener('click', downRating)
  })
  toColorLikes()
}

function downRating(e) {
  let targetId

  if (e.target.parentElement.classList.contains('like-params-com')) {
    // Когда нажимаем на рейтинг коммента
    let comments: any = JSON.parse(localStorage.getItem('comments')!)
    let commentswithRating
    targetId = Number(e.target.parentElement.parentElement.parentElement.id)
    commentswithRating = findCommentsToSetRating(comments, targetId, e)
    localStorage.setItem('comments', JSON.stringify(comments))
  } else {
    // Когда нажимаем на рейтинг ответа
    let answers = JSON.parse(localStorage.getItem('answers')!)
    debugger
    targetId = Number(
      e.target.parentElement.parentElement.parentElement.getAttribute(
        'data-ans'
      )
    )
    let answersWithRating = findAnswerToSetRating(answers, targetId, e)
    localStorage.setItem('answers', JSON.stringify(answersWithRating))
  }

  let ratingTextDiv: HTMLDivElement
  let raTingTextNum
  if (e.target.classList.contains('rating__minus')) {
    ratingTextDiv = e.target.nextElementSibling
    raTingTextNum = Number(ratingTextDiv.innerText)
    raTingTextNum = raTingTextNum - 1
    ratingTextDiv.innerText = String(raTingTextNum)
    if (raTingTextNum < 0) {
      ratingTextDiv.style.color = 'red'
    }
    ratingTextDiv.innerText = String(raTingTextNum)
  } else if (e.target.classList.contains('rating__plus')) {
    ratingTextDiv = e.target.previousElementSibling
    raTingTextNum = Number(ratingTextDiv.innerText)
    raTingTextNum = raTingTextNum + 1
    if (raTingTextNum > 0) {
      ratingTextDiv.style.color = '#599b08'
    }
    ratingTextDiv.innerText = String(raTingTextNum)
  }
}

function findCommentsToSetRating(comments, targetId, e) {
  comments.forEach((comment) => {
    if (comment.idOfComment === Number(targetId)) {
      if (e.target.classList.contains('rating__plus')) {
        comment.rating = comment.rating + 1
      } else if (e.target.classList.contains('rating__minus')) {
        comment.rating = comment.rating - 1
      }
    }
  })

  return comments
}

function findAnswerToSetRating(answers, targetId, e) {
  answers.forEach((ans) => {
    if (Number(ans.dataAns) === Number(targetId)) {
      if (e.target.classList.contains('rating__plus')) {
        ans.rating = ans.rating + 1
      } else if (e.target.classList.contains('rating__minus')) {
        ans.rating = ans.rating - 1
      }
    }
  })
  return answers
}
