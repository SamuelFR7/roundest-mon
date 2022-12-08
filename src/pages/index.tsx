import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import { useState } from 'react'
import type React from 'react'
import { inferQueryResponse } from './api/trpc/[trpc]'
import Image from 'next/image'
import Link from 'next/link'

const btn =
  'inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote())

  const [first, second] = ids

  const firstPokemon = trpc.getPokemonById.useQuery({
    id: first,
  })

  const secondPokemon = trpc.getPokemonById.useQuery({
    id: second,
  })

  const voteMutation = trpc.voteForPokemon.useMutation()

  const voteForRoundest = (selectedNumber: number) => {
    if (selectedNumber === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second })
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first })
    }

    updateIds(getOptionsForVote())
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative">
      <div className="text-2xl text-center">Which pokemon is rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        {!firstPokemon.isLoading &&
          !secondPokemon.isLoading &&
          firstPokemon.data &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(first)}
              />

              <div className="p-8">Vs</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
        <div className="p-2" />
      </div>
      <div className="absolute bottom-0 w-full text-xl text-center">
        <Link href="https://github.com/SamuelFR7/roundest-mon">Github</Link>
        {'  |  '}
        <Link href="/results">Results</Link>
      </div>
    </div>
  )
}

type PokemonFromServer = inferQueryResponse<'getPokemonById'>

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer
  vote: () => void
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={props.pokemon.spriteUrl}
        alt="Pokemon"
        width={256}
        height={256}
      />
      <div className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  )
}
