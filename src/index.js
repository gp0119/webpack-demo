import './hello'
import avatar  from './asset/img/avatar.png'
import avatarMini  from './asset/img/avatar-mini.png'
import insertImg from "./utils/insertImg";
import './style/index.less'
import { add } from './utils/math'
import _ from 'lodash'

add(1,2)
console.log(_.join([1, 2, 3]))

insertImg(avatar, 'avatar')
insertImg(avatarMini, 'avatarMini')

console.log('index')
