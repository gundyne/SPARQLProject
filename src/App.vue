<template>
  <div class="endpoint-container">
    <label for="endpoint">Query endpoint</label>
    <input
      id="endpoint"
      type="text"
      :disabled="state.loading"
      v-model="state.endpoint"
      placeholder="Endpoint"
      spellcheck="false"
    />
  </div>
  <textarea class="textarea" spellcheck="false" v-model="state.query" :disabled="state.loading"></textarea>
  <el-button :disabled="state.loading" @click="loadData">Query</el-button>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  loading: false,
  endpoint: 'https://query.wikidata.org/sparql',
  query: '',
  head: [],
  result: [],
});

const loadData = async () => {
  // Query Results JSON Format https://www.w3.org/TR/sparql11-results-json/
  const headers = { Accept: 'application/sparql-results+json' };
  const url = `${state.endpoint}?query=${encodeURIComponent(state.query)}`;

  // Disable input while fetching
  state.loading = true;
  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw `Bad request ${response.status} ${response.statusText}`;
    }

    const { head: { vars } = {}, results: { bindings } = {} } = await response.json();

    if (vars === undefined || vars.length === 0) {
      throw `Empty head`;
    }

    state.head = vars;
    state.result = bindings;
    console.log('head', vars);
    console.log('result', bindings);
  } catch (err) {
    console.error(err);
    state.result = [];
  } finally {
    state.loading = false;
  }
};
</script>

<style>
html {
  box-sizing: border-box;
  padding: 16px;
}

*,
::before,
::after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
}

.endpoint-container {
  margin-bottom: 20px;
  font-size: 16px;
}

#endpoint {
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 8px;
  font-size: inherit;
  line-height: 40px;
}

.textarea {
  width: 100%;
  height: 300px;
  font-size: 16px;
  tab-size: 2;
}
</style>
