import './hello.js'
import avatar  from './asset/img/avatar.png'
import avatarMini  from './asset/img/avatar-mini.png'
import insertImg from "./utils/insertImg.js";
import './style/index.less'
import { add } from './utils/math.js'

add(1,2)

insertImg(avatar, 'avatar')
insertImg(avatarMini, 'avatarMini')

console.log('index')
