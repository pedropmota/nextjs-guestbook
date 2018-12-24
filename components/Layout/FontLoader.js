import FontFaceObserver from 'fontfaceobserver'

const loadFonts = async () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Fira+Sans:400,700'
  link.rel = 'stylesheet'

  document.head.appendChild(link)

  const firaSans = new FontFaceObserver('Fira Sans')
  try {
    await firaSans.load()
  } finally {
    document.querySelector('body').classList.add('fonts-loaded')
  }
}

export default loadFonts;