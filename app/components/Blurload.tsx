import LoadingLoader from './Loader'

const Blurload = ({ text }: { text?: string }) => {
  let loadtext = text || 'loading...'
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex items-center justify-center">
      <LoadingLoader text={loadtext} />
    </div>
  )
}

export default Blurload
