import { configureStore } from "@reduxjs/toolkit";
// Import pokemonApi from another file
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);
