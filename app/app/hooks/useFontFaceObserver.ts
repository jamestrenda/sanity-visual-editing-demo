import { useEffect, useState } from 'react'
import FontFaceObserver from 'fontfaceobserver'

type Props = Array<
  | {
      [key: string]: FontFaceObserver.FontVariant | undefined
    }
  | string
>

export const useFontFaceObserver = (fonts: Props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const fontObservers = fonts.map((font) => {
      const fontName = typeof font !== 'string' ? Object.keys(font)[0] : font
      const fontVariant = typeof font !== 'string' ? font[fontName] : undefined
      return new FontFaceObserver(fontName, fontVariant)
    })

    Promise.all(fontObservers.map((observer) => observer.load()))
      .then(() => setFontsLoaded(true))
      .catch((e) => {
        setFontsLoaded(false)

        console.error('Failed to load fonts', e)
      })
  }, [fonts])

  return { fontsLoaded }
}
