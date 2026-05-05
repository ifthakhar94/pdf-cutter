import { PdfCutter } from '../src/index'

export function App() {
  return (
    <div className="h-screen w-screen">
      <PdfCutter file="/sample.pdf" />
    </div>
  )
}
