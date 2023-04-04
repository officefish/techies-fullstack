import localFont from 'next/font/local'

export const OldEnglish = localFont({ src: [
    {
      path: './EngraversOldEnglish-Med.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './EngraversOldEnglish-Bd.otf',
      weight: '400',
      style: 'bold',
    }
  ], variable: '--font-old-english' 
})

