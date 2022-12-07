import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import { useState } from 'react'
import type React from 'react'
import { inferQueryResponse } from './api/trpc/[trpc]'

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
    <div className="w-screen h-screen flex flex-col justify-center items-center">
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
      <img
        src={props.pokemon.sprites.front_default || ''}
        alt="First pokemon"
        className="w-64 h-64"
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
