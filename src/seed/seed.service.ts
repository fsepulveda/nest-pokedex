import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  // async executeSeed() {
  //   await this.pokemonModel.deleteMany({}).exec();
  //   const { data } = await this.axios.get<PokeResponse>(
  //     `https://pokeapi.co/api/v2/pokemon?limit=10`,
  //   );

  //   const insertPromiseArray = [];
  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2];
  //     console.log(`No. ${no} is ${name}`);
  //     insertPromiseArray.push(this.pokemonModel.create({ no, name }));
  //   });

  //   await Promise.all(insertPromiseArray);
  //   return 'Seed executed';
  // }

  async executeSeed() {
    await this.pokemonModel.deleteMany({}).exec();
    const data = await this.http.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=650`,
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      console.log(`No. ${no} is ${name}`);
      pokemonToInsert.push({ no, name });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
}
