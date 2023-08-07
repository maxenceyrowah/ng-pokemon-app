import { importProvidersFrom } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";
import { authGuard } from "./app/auth.guard";
import { InMemoryDataService } from "./app/in-memory-data.service";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "",
    canActivate: [authGuard],
    loadChildren: () => import("./app/pokemon/pokemon.routes"),
  },
  {
    path: "login",
    title: 'Login',
    loadComponent: () =>
      import("./app/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "**",
    title: 'Page not found',
    loadComponent: () =>
      import("./app/page-not-found/page-not-found.component").then(
        (m) => m.PageNotFoundComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        dataEncapsulation: false,
      })
    ),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
