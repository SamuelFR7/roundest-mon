import { trpc } from '@/utils/trpc'

export default function Home() {
  const { data, isLoading } = trpc.hello.useQuery({
    text: 'Samuel',
  })

  if (isLoading) {
    return <div>Is loading</div>
  }

  if (data) {
    return <div>{data.greeting}</div>
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which pokemon is rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-16 h-16 bg-red-200"></div>
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-red-200"></div>
      </div>
    </div>
  )
}
