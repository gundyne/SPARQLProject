<template>
  <div v-if="result.length !== 0">
    <table>
      <tr>
        <th v-for="h in head" :key="h" class="col">
          {{ h }}
        </th>
      </tr>

      <tr v-for="row in result">
        <td v-for="h in head" :key="h">
          <a v-if="row[h] && row[h].type === 'uri'" :href="row[h].value" target="_blank" rel="noopener noreferrer">
            {{ row[h].value }}
          </a>
          <span v-else-if="row[h]">{{ row[h].value }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  head: Array,
  result: Array,
});
</script>
