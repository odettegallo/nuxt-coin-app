// pages/moneda/[id].vue
<template>
  <v-container v-if="coin">
    <v-card class="pa-5">
      <v-card-title class="text-h4">{{ coin.name }} ({{ coin.symbol.toUpperCase() }})</v-card-title>
      <v-card-subtitle>ID: {{ coin.id }}</v-card-subtitle>
      <v-card-text>
        <p><strong>Precio en USD:</strong> ${{ coin.market_data.current_price.usd.toFixed(2) }}</p>
        <div v-html="coin.description.en"></div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="navigateTo('/')">Volver al listado</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <div v-else>Cargando o moneda no encontrada...</div>
</template>

<script setup>
const route = useRoute()
const coinId = route.params.id // Obtiene el valor dinámico del ID

const { data: coin, error } = await useFetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
  // Puedes configurar opciones de fetch adicionales aquí
})

if (error.value) {
  // Manejar el error, por ejemplo, redirigir a una página de error 404
  throw createError({ statusCode: 404, statusMessage: 'Moneda no encontrada' })
}
</script>