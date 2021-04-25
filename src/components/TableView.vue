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
          <span v-if="row[h]">{{ row[h].value }}</span>
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
