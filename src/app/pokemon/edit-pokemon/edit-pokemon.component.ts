import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgIf } from "@angular/common";
import { Title } from "@angular/platform-browser";

import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";

@Component({
  selector: "app-edit-pokemon",
  templateUrl: "./edit-pokemon.component.html",
  standalone: true,
  imports: [NgIf, PokemonFormComponent],
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
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

  initTitle(pokemon: Pokemon | undefined) {
    if (!pokemon) {
      this.title.setTitle("Page not found");
    }
    this.title.setTitle(pokemon?.name as string);
  }
}
