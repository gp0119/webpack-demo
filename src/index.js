import './hello'
import avatar  from './asset/img/avatar.png'
import avatarMini  from './asset/img/avatar-mini.png'
import insertImg from "./utils/insertImg";
import './style/index.less'
import { add } from './utils/math'

add(1,2)

insertImg(avatar, 'avatar')
insertImg(avatarMini, 'avatarMini')

console.log('index')
