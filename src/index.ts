import { Comments } from '../components/comments.component'
import { Favorites } from '../components/favorites.component'
import { InputMessage } from '../components/input.component'
import { Params } from '../components/params.component'
import { InputAnswerComponent } from '../components/input-answer.component'

const comments: Comments = new Comments('comments')
const favorites: Favorites = new Favorites('favorites')

const input: InputMessage = new InputMessage('input')

export let params: Params
document.addEventListener('DOMContentLoaded', () => {})

export function createParams(id: string) {
  params = new Params(id)
  console.log(params)
}
