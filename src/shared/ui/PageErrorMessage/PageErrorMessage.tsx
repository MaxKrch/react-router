import { useLocation, useNavigate } from "react-router-dom"

const PageErrorMessage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const reloadPage = () => {
    navigate(location.pathname, {
      replace: true,
    })
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex justify-center items-center flex-col gap-4 p-4 bg-white bg-opacity-50 h-full w-full">
      <h2 className="text-2xl">
        Кажется, что-то пошло не так
      </h2>
      
      <div className="text-lg">
        Cкоро все починим!
      </div>

      <div className="flex gap-4">
        <button
          onClick={reloadPage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Перезагрузить страницу
        </button>

        <button
          onClick={goBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer"
        >
          Назад
        </button>
      </div>
    </div>
  )
}


export default PageErrorMessage
