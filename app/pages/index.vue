<script setup lang="ts">
// Define el tipo de dato que esperamos de la API
interface Coin {
  id: string
  name: string
  symbol: string
  current_price: number
  image: string
}

// useFetch realiza la petición HTTP, ideal para SSR
const { data: coins, pending, error } = await useFetch<Coin[]>(
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
  {
    // Se usa un key único para cacheo en useAsyncData/useFetch
    key: 'top-10-coins',
    lazy: true, // Carga la página y luego la data (no bloquea el SSR)
  }
)
</script>

<template>
  <v-card class="pa-4">
    <v-card-title class="text-h4 mb-4">
      <v-icon icon="mdi-bitcoin" class="mr-2"></v-icon> Top 10 Criptomonedas (USD)
    </v-card-title>

    <div v-if="pending" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Cargando datos...</p>
    </div>

    <v-alert v-else-if="error" type="error" closable>
      Error al cargar las monedas: {{ error.message }}
    </v-alert>

    <v-list v-else>
      <v-list-item v-for="coin in coins" :key="coin.id" :to="`/coin/${coin.id}`" link>
        <template #prepend>
          <v-avatar :image="coin.image" size="36" class="mr-4"></v-avatar>
        </template>
        <v-list-item-title class="font-weight-bold">
          {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
        </v-list-item-title>
        <v-list-item-subtitle>
          Precio: $ {{ coin.current_price.toLocaleString() }}
        </v-list-item-subtitle>
        <template #append>
            <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>