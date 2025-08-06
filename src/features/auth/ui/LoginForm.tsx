import useAuth from '@/features/auth/model/use-auth'
import { ROUTES } from '@/shared/const/routes'
import { STATUS } from '@/shared/const/status'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const location = useLocation()
  const shema = z.object({
    login: z
      .string()
      .min(3, `Логин должен быть длиннее 2 символов`)
      .max(15, 'Логин должен быть короче 16 символов'),
    password: z
      .string()
      .regex(/[a-zA-Z0-9]+/, 'Пароль может состоять из латинских букв и цифр'),
  })
  type Shema = z.infer<typeof shema>
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Shema>({
    resolver: zodResolver(shema),
  })

  const handleSubmitLogin = async () => {
    const result = await login({
      login: getValues(`login`),
      password: getValues(`password`),
    })

    if (result === STATUS.SUCCESS) {
      reset({
        login: '',
        password: '',
      })
      navigate(location.state?.from.pathname ?? ROUTES.NEWS_MAGAZINE.NEWS_FEED)
    }
  }

  return (
    <form
      role="form"
      className="flex gap-3 flex-end items-center relative"
      onSubmit={handleSubmit(handleSubmitLogin)}
    >
      <div>
        <label htmlFor="login" aria-label="login" hidden></label>
        <input
          {...register(`login`)}
          className="bg-white outline-none border border-gray-400 rounded h-6 px-3"
          type="text"
          id="login"
          placeholder="Your Login"
        />
      </div>
      <div>
        <label className="sr-only" hidden></label>
        <input
          {...register('password')}
          className="bg-white outline-none border border-gray-400 rounded h-6 px-3"
          type="password"
          id="password"
          placeholder="Your password"
        />
      </div>
      <button
        aria-label="login"
        className="border border-green-500 text-green-500 h-6 w-20 rounded flex justify-center items-center font-semibold cursor-pointer hover:bg-green-500 hover:text-white"
      >
        Login
      </button>
      {(errors.login?.message || errors.password?.message) && (
        <div className="absolute left-0 w-full overflow-hidden top-full text-red-500 text-sm font-semibold">
          {errors.login?.message || errors.password?.message}
        </div>
      )}
    </form>
  )
}

export default LoginForm
