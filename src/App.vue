<template>
  <div class="endpoint-container">
    <label for="endpoint">Query endpoint</label>
    <input id="endpoint" type="text" v-model="endpoint" />
  </div>

  <textarea
    class="query-input"
    spellcheck="false"
    v-model="sparqlQuery"
    @keydown.tab.prevent="indent($event)"
    :disabled="fetching"
  ></textarea>

  <el-button @click="startQuery" :disabled="fetching">Query</el-button>

  <div v-if="fetched">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="col in cols" :label="col" :prop="`${col}.value`"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fetching = ref(false);
const fetched = ref(false);
const cols = ref([]);
const tableData = ref([]);
const endpoint = ref('https://query.wikidata.org/sparql');
const sparqlQuery = ref(`SELECT ?item ?itemLabel
WHERE
{
  ?item wdt:P31 wd:Q146 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
limit 50`);

const startQuery = () => {
  // Query Results JSON Format https://www.w3.org/TR/sparql11-results-json/
  const headers = { Accept: 'application/sparql-results+json' };
  const url = `${endpoint.value}?query=${encodeURIComponent(sparqlQuery.value)}`;

  // disable textarea and query button while fetching
  fetching.value = true;
  fetch(url, { headers })
    .then((response) => {
      if (!response.ok) {
        fetched.value = false;
        throw new Error(`HTTP status ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      const {
        head: { vars },
        results: { bindings },
      } = data;
      cols.value = vars;
      tableData.value = bindings;
      fetched.value = true;
    })
    .finally(() => {
      fetching.value = false;
    });
};

const indent = (event) => {
  if (event === undefined) {
    return;
  }

  const { value, selectionStart, selectionEnd } = event.target;
  event.target.value = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`;
  event.target.selectionStart = selectionStart + 1;
  event.target.selectionEnd = selectionStart + 1;
};
</script>

<style scoped>
.endpoint-container {
  margin-bottom: 20px;
  font-size: 16px;
}

#endpoint {
  width: 40%;
  font-size: 16px;
  margin: 10px;
}

.query-input {
  width: 100%;
  height: 300px;
  tab-size: 2;
  font-size: 16px;
}
</style>
