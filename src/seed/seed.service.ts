import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke.response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
 
  //private readonly axios:AxiosInstance=axios // dependiendo de axios

  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
      private readonly http:AxiosAdapter
    ){}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});// elimina todos los registros

    //const {data}= await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650'); // Dependiendo de axios
    
    //METODO 1
    //const insertPromiseArray:Promise<any>[]=[];

    // data.results.forEach(({name, url})=>{
    //   const segments=url.split('/');
    //   const no=+segments[segments.length-2]

    //   //const pokemon = await this.pokemonModel.create({name,no});
    //   insertPromiseArray.push(this.pokemonModel.create({name,no})
    //   )
    //   //console.log({name,no})
    // })
    // await Promise.all(insertPromiseArray);

    // METODO 2

    const pokemonToInsert:{name:string,no:number}[]=[];
    const data= await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    data.results.forEach(({name, url})=>{
      const segments=url.split('/');
      const no=+segments[segments.length-2]
      pokemonToInsert.push({name,no})
      
      //console.log({name,no})
    })
    await this.pokemonModel.insertMany(pokemonToInsert);

 


    
    return 'Seed Exectuted';
  }

  
}
