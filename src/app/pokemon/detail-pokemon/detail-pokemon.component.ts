import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgIf, NgFor, DatePipe } from "@angular/common";
import { Title } from "@angular/platform-browser";

import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";
import { PokemonTypeColorPipe } from "../pokemon-type-color.pipe";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
  standalone: true,
  imports: [NgIf, NgFor, LoaderComponent, DatePipe, PokemonTypeColorPipe],
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private title: Title
  ) {}

  ngOnInit() {
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.initTitle(pokemon);
      });
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService
      .deletePokemon(pokemon.id)
      .subscribe(() => this.goToPokemonList());
  }

  goToPokemonList() {
    this.router.navigate(["/pokemons"]);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(["/edit/pokemon", pokemon.id]);
  }

  initTitle(pokemon: Pokemon | undefined) {
    if (!pokemon) {
      this.title.setTitle("Page not found");
    }
    this.title.setTitle(pokemon?.name as string);
  }
}
