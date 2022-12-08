import { GetStaticProps } from 'next'
import { prisma } from '@/server/db/prisma'
import React from 'react'
import { AsyncReturnType } from '@/utils/ts-bs'
import Image from 'next/image'

const getPokemonInOrder = async () => {
  return await prisma.pokemon.findMany({
    orderBy: {
      VoteFor: { _count: 'desc' },
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  })
}

type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>

const PokemonListing: React.FC<{ pokemon: PokemonQueryResult[number] }> = (
  props,
) => {
  return (
    <div className="flex border-b p-2 items-center">
      <Image
        src={props.pokemon.spriteUrl}
        alt="First pokemon"
        width={64}
        height={64}
      />
      <div className="capitalize">{props.pokemon.name}</div>
    </div>
  )
}

const ResultsPage: React.FC<{
  pokemon: PokemonQueryResult
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl p-4">Results</h2>
      <div className="p-2" />
      <div className="flex flex-col w-full max-w-2xl border">
        {props.pokemon.map((currentPokemon, index) => {
          return <PokemonListing pokemon={currentPokemon} key={index} />
        })}
      </div>
    </div>
  )
}

export default ResultsPage

export const getStaticProps: GetStaticProps = async () => {
  const pokemonOrdered = await getPokemonInOrder()

  return {
    props: {
      pokemon: pokemonOrdered,
    },
    revalidate: 10,
  }
}
