import { memo } from 'react'

const GuestPage = () => {
  return (
    <div className="min-w-[320px] max-w-[1280px] w-full p-8 bg-gray-300 min-h-[320px] flex flex-col justify-center gap-4">
      <div className="text-5xl">Neto Social</div>
      <div className="text-lg">{`It's here`}</div>
    </div>
  )
}

export default memo(GuestPage)


