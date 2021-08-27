function insertImg (src, className) {
  const img = new Image()
  img.src = src
  img.classList.add(className)
  document.getElementById('app').append(img)
}

export default insertImg
