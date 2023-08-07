import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of, tap } from "rxjs";

import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((err) => this.handleError(err, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((err) => this.handleError(err, undefined))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http
      .post<Pokemon>("api/pokemons", pokemon, this.httpOptions())
      .pipe(
        tap((pokemon) => this.log(pokemon)),
        catchError((err) => this.handleError(err, null))
      );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((err) => this.handleError(err, []))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    return this.http.put("api/pokemons", pokemon, this.httpOptions()).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((err) => this.handleError(err, null))
    );
  }

  deletePokemon(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((err) => this.handleError(err, null))
    );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error("[] error", error);
    return of(errorValue);
  }

  private httpOptions() {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return options;
  }

  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poison",
      "Fee",
      "Vol",
      "Combat",
      "Psy",
    ];
  }
}
