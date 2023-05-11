import { InputMessage } from './input.component'
import { createParams } from '../src/index'
import { searchRating } from './params.component'

export class InputAnswerComponent extends InputMessage {
  constructor(id: string) {
    super(id)
  }

  init(): void {
    console.log(this.$el)

    this.$el.addEventListener('input', showSymbols.bind(this))
    this.$el.addEventListener('click', sendBtn.bind(this))
  }
}

let inputValue: number

function showSymbols(e) {
  inputValue = (
    document.querySelector('.input__message_answer') as HTMLInputElement
  ).value.length
  console.log(inputValue)

  if (e.target.classList.contains('input__message_answer')) {
    console.log(inputValue)
    const inputMax: HTMLElement = document.querySelector('.input__max-answer')!
    console.log(inputMax)

    const btn: HTMLElement = e.target.nextElementSibling
    if (inputValue > 1 || inputValue < 1000) {
      if (inputValue === 0) {
        btn.classList.remove('input_btn-color')
      } else {
        btn.classList.add('input_btn-color')
      }
    }

    inputMax.innerHTML = `${inputValue}/1000`
    if (inputValue > 1000) {
      inputMax.style.cssText = 'font-weight: 700; color: red; opacity: 1'
    }
  }
}

let idOfCommentAnswer: number
let num
function sendBtn(e) {
  if (localStorage.getItem('NUM')) {
    num = Number(localStorage.getItem('NUM'))
  }
  if (inputValue > 1 || (inputValue < 1000 && inputValue !== 0)) {
    if (e.target.classList.contains('input_btn-answer')) {
      const answerBody: HTMLElement | any =
        e.target.parentElement.parentElement.parentElement.parentElement

      console.log(answerBody)

      const commentText: string =
        answerBody.parentElement.childNodes[3].innerText
      console.log(commentText)
      let answers = JSON.parse(localStorage.getItem('answers')!) || []

      let comments = JSON.parse(localStorage.getItem('comments')!)

      comments.forEach((obj) => {
        Object.values(obj).forEach((el) => {
          if (typeof el === 'string') {
            if (el.trim() === commentText) {
              idOfCommentAnswer = obj.idOfComment
            }
          }
        })
        console.log(idOfCommentAnswer)
      })
      const commentariyAnswer: {
        idOfCommentAnswer: number
        avatar: string
        text: string
        name: string
        date: object
        comment: string
        nameCommentator: string
        isFavorite: boolean
        dataAns: string
        rating: number
      } = {
        idOfCommentAnswer: idOfCommentAnswer,
        dataAns: `${idOfCommentAnswer}.${num}`,
        avatar: (
          document.querySelector('.avatar-img-answer')! as HTMLImageElement
        ).src,
        text: (
          document.querySelector('.input__message_answer')! as HTMLInputElement
        )['value'],
        name: (document.querySelector('.name-answer') as HTMLElement).innerText,
        date: {
          data: new Date().toLocaleDateString(),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
        },
        comment: commentText,
        // сохранил имя того, кто оставлял коммент, на который мы ответили
        nameCommentator:
          answerBody.parentNode.children[0].children[0].innerText,
        isFavorite: false,
        rating: 0,
      }

      console.log('Ответ на коммент', commentariyAnswer)

      console.log(answerBody)

      answers.push(commentariyAnswer)

      // console.log(
      //   e.target.parentElement.parentElement.parentElement.parentElement
      //     .parentElement.childNodes[3].innerText
      // )

      setCommentToLocalStorage(answers, answerBody, commentariyAnswer)
      idOfCommentAnswer++
    }
  }
}

function setCommentToLocalStorage(
  answers: object,
  answerBody: HTMLElement,
  commentariyAnswer: object
): void {
  localStorage.setItem(`answers`, JSON.stringify(answers))

  inputAnswerToHtml(commentariyAnswer, answerBody)

  num++
  localStorage.setItem('NUM', num)
}

function inputAnswerToHtml(commentariyAnswer, answerBody: HTMLElement) {
  answerBody.innerHTML = `<div class="container__comment comment">
  <div class="avatar-comment-img">
    <img
      src="${commentariyAnswer.avatar}"
      alt=""
    />
  </div>
  <div class="comment__body body-comment-num-ans${commentariyAnswer.idOfCommentAnswer}" data-id="${commentariyAnswer.idOfCommentAnswer}" data-ans="${commentariyAnswer.dataAns}">
      <div class="body-comment__info">
          <div class="body-comment__name name">${commentariyAnswer.name}</div>
          <div class="ans-nameCommentator">
              <img class="img-ans" src="/img/params/answer.svg" alt="">
              <div class="ans__text">${commentariyAnswer.nameCommentator}</div>
          </div>
          <div class="body-comment__date">${commentariyAnswer.date.data} ${commentariyAnswer.date.hours}:${commentariyAnswer.date.minutes}</div>
      </div>
      <div class="body-comment__text">
         ${commentariyAnswer.text}
      </div>
      <div class="body-comment__params params" id="params">
          
          <div class="params__ans ans">
              <img class="img-ans" src="/img/params/favorite.svg" alt="">
              <div class="ans__favorite-ans">В избранное</div>
          </div>
          <div class="params__like like-params-ans">
              <img src="/img/params/like/minus.svg" class="rating__minus" alt="">
              <div class="like__number">0</div>
              <img src="/img/params/like/plus.svg" class="rating__plus" alt="">
          </div>
      </div>  
  </div>
</div>`
  const nodeOfAns = document.querySelectorAll('.ans__text')

  nodeOfAns.forEach((e) => {
    e.classList.add('ans_inactive')
  })

  createParams('params')
  searchRating()
}
