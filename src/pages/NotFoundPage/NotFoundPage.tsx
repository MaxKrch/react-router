import { ROUTES } from "@/shared/const/routes"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)
  const goToMain = () => navigate(ROUTES.MAIN)

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full p-4">
      <h2 className="text-xl font-semibold">
        Кажется, такой страницы нет на сайте
      </h2>
      <div className="flex gap-1 text-sm">
        Похоже на ошибку <p>404</p>
      </div>
      <div className="text-sm">
        Хотите вернуться обратно?
      </div>      
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-600 font-sm text-white cursor-pointer min-w-24 font-semibold rounded hover:bg-blue-700"
          onClick={goBack}
        >
          Назад
        </button>
        <button
          className="px-4 py-2 bg-white border border-blue-600 rounded text-blue-600 cursor-pointer min-w-32 font-semibold"
          onClick={goToMain}
        >
          На главную
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
