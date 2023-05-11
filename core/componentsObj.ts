export const objectComponent: {
  comments: HTMLElement
  filter: HTMLElement
  favorites: HTMLElement
  screen: HTMLElement
  input: HTMLElement
  favoritesBody: HTMLElement
  menu: HTMLElement
  filterText: HTMLElement
} = {
  comments: document.getElementById('comments')!,
  filter: document.getElementById('filter')!,
  favorites: document.getElementById('favorites')!,
  screen: document.getElementById('screen')!,
  input: document.getElementById('input')!,
  favoritesBody: document.querySelector('.favotites__ans_answers')!,
  menu: document.querySelector('.menu')!,
  filterText: document.querySelector('.filter__text')!,
}

export function removeClassActive(): void {
  return Object.values(objectComponent).forEach((el) =>
    el.classList.remove('active')
  )
}

export const Avatars: string[] = [
  'https://avatarko.ru/img/kartinka/6/zhivotnye_lev_5446.jpg',
  'https://avatarko.ru/img/kartinka/20/igra_mech_Minecraft_19031.jpg',
  'https://avatarko.ru/img/kartinka/30/serdce_listya_29941.jpg',
  'https://avatarko.ru/img/kartinka/19/zhivotnye_leopard_18232.jpg',
  'https://avatarko.ru/img/kartinka/6/robot_5086.jpg',
  'https://avatarko.ru/img/kartinka/7/igra_Dota_2_Alchemist_6269.jpg',
]

let num = 0
if (localStorage.getItem('NUM')) {
  num = Number(localStorage.getItem('NUM'))
}

export function inputCommentToHtml(comment, menu?): void {
  console.log()

  const inputAfter = document.getElementById('input')!

  const divComment: HTMLElement = document.createElement('div')

  divComment.classList.add('commentariy')
  if (comment.isFavorite == true) {
    divComment.innerHTML = `<div class="container__comment comment">
          <div class="avatar-comment-img">
            <img
              src="${comment.avatar}"
              alt=""
            />
          </div>
          <div class="comment__body body-comment-num${comment.idOfComment}" id="${comment.idOfComment}">
              <div class="body-comment__info">
                  <div class="body-comment__name name">${comment.name}</div>
                  <div class="body-comment__date">${comment.date.data} ${comment.date.hours}:${comment.date.minutes}</div>
              </div>
              <div class="body-comment__text">
                 ${comment.text}
              </div>
              <div class="body-comment__params params" id="params">
                  <div class="params__ans ans">
                      <img class="img-ans" src="/img/params/answer.svg" alt="">
                      <div class="ans__text ans_inactive">Ответить</div>
                  </div>
                  <div class="params__ans ans">
                      <img class="img-ans ans-image-favorite" src="/img/params/in_favorite.svg" alt="">
                      <div class="ans__favorite-com" num="${comment.idOfComment} ans__in-favorite">В избранном</div>
                  </div>
                  <div class="params__like like-params-com">
                      <img src="/img/params/like/minus.svg" alt="" class="rating__minus">
                      <div class="like__number">${comment.rating}</div>
                      <img src="/img/params/like/plus.svg" alt="" class="rating__plus">
                  </div>
              </div>
          </div>
        </div>`
  } else {
    divComment.innerHTML = `<div class="container__comment comment">
    <div class="avatar-comment-img">
      <img
        src="${comment.avatar}"
        alt=""
      />
    </div>
    <div class="comment__body body-comment-num${comment.idOfComment}" id="${comment.idOfComment}">
        <div class="body-comment__info">
            <div class="body-comment__name name">${comment.name}</div>
            <div class="body-comment__date">${comment.date.data} ${comment.date.hours}:${comment.date.minutes}</div>
        </div>
        <div class="body-comment__text">
           ${comment.text}
        </div>
        <div class="body-comment__params params" id="params">
            <div class="params__ans ans">
                <img class="img-ans" src="/img/params/answer.svg" alt="">
                <div class="ans__text ans_inactive">Ответить</div>
            </div>
            <div class="params__ans ans">
                <img class="img-ans ans-image-favorite" src="/img/params/favorite.svg" alt="">
                <div class="ans__favorite-com" num="${comment.idOfComment}">В избранное</div>
            </div>
            <div class="params__like like-params-com">
                <img src="/img/params/like/minus.svg" alt="" class="rating__minus">
                <div class="like__number">${comment.rating}</div>
                <img src="/img/params/like/plus.svg" alt="" class="rating__plus">
            </div>
        </div>
    </div>
  </div>`
  }
  if (menu) {
    menu.after(divComment)
  } else {
    inputAfter.after(divComment)
  }
}

export function inputAnswersToHtml(ans, menu?) {
  let comment = document.getElementById(`${ans.idOfCommentAnswer}`)
  let position: InsertPosition = 'beforeend'
  if (!comment) {
    comment = document.querySelector('.menu')
    position = 'afterend'
  }
  if (ans.isFavorite === true) {
    if (menu) {
      menu.insertAdjacentHTML(
        'afterend',
        `<div class="container__comment comment answers">
      <div class="avatar-comment-img">
        <img
          src="${ans.avatar}"
          alt=""
        />
      </div>
      <div class="comment__body body-comment-num-ans${
        ans.idOfCommentAnswer
      }" data-id="${ans.idOfCommentAnswer}" data-ans="${Number(ans.dataAns)}">
          <div class="body-comment__info">
              <div class="body-comment__name name">${ans.name}</div>
              <div class="ans-nameCommentator">
                  <img class="img-ans" src="/img/params/answer.svg" alt="">
                  <div class="ans__text">${ans.nameCommentator}</div>
              </div>
              <div class="body-comment__date">${ans.date.data} ${
          ans.date.hours
        }:${ans.date.minutes}</div>
          </div>
          <div class="body-comment__text">
             ${ans.text}
          </div>
          <div class="body-comment__params params" id="params">
              
              <div class="params__ans ans">
                  <img class="img-ans" src="/img/params/in_favorite.svg" alt="">
                  <div class="ans__favorite-ans ans__favorite-inAns">В избранном</div>
              </div>
              <div class="params__like like-params-ans">
                  <img src="/img/params/like/minus.svg" alt="" class="rating__minus">
                  <div class="like__number">${ans.rating}</div>
                  <img src="/img/params/like/plus.svg" alt="" class="rating__plus">
              </div>
          </div>  
      </div>
    </div>`
      )
    } else {
      comment?.insertAdjacentHTML(
        `${position}`,
        `<div class="container__comment comment answer__answer">
      <div class="avatar-comment-img">
        <img
          src="${ans.avatar}"
          alt=""
        />
      </div>
      <div class="comment__body body-comment-num-ans${
        ans.idOfCommentAnswer
      }" data-id="${ans.idOfCommentAnswer}" data-ans="${Number(ans.dataAns)}">
          <div class="body-comment__info">
              <div class="body-comment__name name">${ans.name}</div>
              <div class="ans-nameCommentator">
                  <img class="img-ans" src="/img/params/answer.svg" alt="">
                  <div class="ans__text">${ans.nameCommentator}</div>
              </div>
              <div class="body-comment__date">${ans.date.data} ${
          ans.date.hours
        }:${ans.date.minutes}</div>
          </div>
          <div class="body-comment__text">
             ${ans.text}
          </div>
          <div class="body-comment__params params" id="params">
              
              <div class="params__ans ans">
                  <img class="img-ans" src="/img/params/in_favorite.svg" alt="">
                  <div class="ans__favorite-ans ans__favorite-inAns">В избранном</div>
              </div>
              <div class="params__like like-params-ans">
                  <img src="/img/params/like/minus.svg" alt="" class="rating__minus">
                  <div class="like__number">${ans.rating}</div>
                  <img src="/img/params/like/plus.svg" alt="" class="rating__plus">
              </div>
          </div>  
      </div>
    </div>`
      )
    }
  } else {
    comment?.insertAdjacentHTML(
      'beforeend',
      `<div class="container__comment comment answer__answer">
    <div class="avatar-comment-img">
      <img
        src="${ans.avatar}"
        alt=""
      />
    </div>
    <div class="comment__body body-comment-num-ans${
      ans.idOfCommentAnswer
    }" data-id="${ans.idOfCommentAnswer}" data-ans="${Number(ans.dataAns)}">
        <div class="body-comment__info">
            <div class="body-comment__name name">${ans.name}</div>
            <div class="ans-nameCommentator">
                <img class="img-ans" src="/img/params/answer.svg" alt="">
                <div class="ans__text">${ans.nameCommentator}</div>
            </div>
            <div class="body-comment__date">${ans.date.data} ${
        ans.date.hours
      }:${ans.date.minutes}</div>
        </div>
        <div class="body-comment__text">
           ${ans.text}
        </div>
        <div class="body-comment__params params" id="params">
            
            <div class="params__ans ans">
                <img class="img-ans" src="/img/params/favorite.svg" alt="">
                <div class="ans__favorite-ans">В избранное</div>
            </div>
            <div class="params__like like-params-ans">
                <img src="/img/params/like/minus.svg" alt="" class="rating__minus">
                <div class="like__number">${ans.rating}</div>
                <img src="/img/params/like/plus.svg" alt="" class="rating__plus">
            </div>
        </div>  
    </div>
  </div>`
    )
  }
}
export function deleteCommentFromHtml(): void {
  document.querySelectorAll('.commentariy').forEach((e) => e.remove())
}

export function deleteAll() {
  const comments = document.querySelectorAll('.commentariy')
  comments.forEach((e) => e.remove())
}
