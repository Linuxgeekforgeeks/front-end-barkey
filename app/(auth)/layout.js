export const metadata = {
  title: 'Hamos Barkey',
  description: 'This is the layout for the authentication.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
