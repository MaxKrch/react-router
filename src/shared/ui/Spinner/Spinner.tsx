import { memo } from 'react'

const Diamond = () => (
  <svg
    className="w-full h-full text-gray-400"
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M25 50, 50 0, 75 50, 50 100" />
  </svg>
)

const Spinner = ({ x = `25%`, y = `50%` }: { x?: string; y?: string }) => {
  return (
    <div
      data-testid="spinner"
      className="w-full h-full flex items-center justify-center bg-white bg-opacity-10"
    >
      <div className="w-[25%] m-[10%] aspect-square min-w-[150px] max-w-[450px] relative">
        <div className="absolute h-[45%] w-[45%] top-[3%] left-[50%] translate-x-[-50%]">
          <div
            className="animate-diamond-fly-up"
            style={
              {
                '--x': x,
                '--y': y,
              } as React.CSSProperties
            }
          >
            <Diamond />
          </div>
        </div>

        <div className="absolute h-[45%] w-[45%] top-[50%] right-[15%] translate-y-[-50%]">
          <div
            className="animate-diamond-fly-right"
            style={
              {
                '--x': x,
                '--y': y,
              } as React.CSSProperties
            }
          >
            <Diamond />
          </div>
        </div>

        <div className="absolute h-[45%] w-[45%] bottom-[3%] left-[50%] translate-x-[-50%]">
          <div
            className="animate-diamond-fly-down"
            style={
              {
                '--x': x,
                '--y': y,
              } as React.CSSProperties
            }
          >
            <Diamond />
          </div>
        </div>

        <div className="absolute h-[45%] w-[45%] top-[50%] left-[15%] translate-y-[-50%]">
          <div
            className="animate-diamond-fly-left"
            style={
              {
                '--x': x,
                '--y': y,
              } as React.CSSProperties
            }
          >
            <Diamond />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Spinner)
