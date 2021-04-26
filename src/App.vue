<template>
  <div>
    <label for="endpoint-input">Query endpoint</label>
    <input
      id="endpoint-input"
      type="text"
      :disabled="state.loading"
      v-model="state.endpoint"
      placeholder="Endpoint"
      spellcheck="false"
    />
  </div>

  <div class="row">
    <div v-for="example in examples" :key="example.id" class="col">
      <input
        :id="`example-${example.id}`"
        type="radio"
        name="examples"
        :value="example.id"
        v-model="state.selected"
        @change="selectExample(example.query)"
      />
      <label :for="`example-${example.id}`" class="example-query-label">{{ example.name }}</label>
    </div>

    <div class="col">
      <button class="btn danger" @click="reset">RESET</button>
    </div>
  </div>

  <div class="position-relative">
    <textarea
      class="textarea"
      :class="{
        cat: state.selected === 0,
        nobel: state.selected === 1 || state.selected === 2,
      }"
      spellcheck="false"
      v-model="state.query"
      :disabled="state.loading"
    ></textarea>

    <div v-if="state.loading" class="position-absolute-center">
      <loading-spinner></loading-spinner>
    </div>
  </div>

  <div class="row rtl">
    <div class="col col-3">
      <button class="btn query-btn" :disabled="state.loading" @click="loadData">Query</button>
    </div>
  </div>

  <table-view :head="state.head" :result="state.result"></table-view>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import TableView from './components/TableView.vue';
import examples from './assets/examples.js';

const initState = {
  endpoint: 'https://query.wikidata.org/sparql',
  loading: false,
  selected: false,
  query: '',
  head: [],
  result: [],
};

const state = reactive({ ...initState });

const selectExample = (query) => {
  state.query = query;
};

// Unselect example and clear textarea input
const reset = () => {
  Object.assign(state, initState);
};

const loadData = async () => {
  // if query is empty, stop
  if (state.query === '') {
    return;
  }

  // Query Results JSON Format https://www.w3.org/TR/sparql11-results-json/
  const headers = { Accept: 'application/sparql-results+json' };
  const url = `${state.endpoint}?query=${encodeURIComponent(state.query)}`;

  // Disable input while fetching
  state.loading = true;
  state.result = [];
  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw `Bad request ${response.status} ${response.statusText}`;
    }

    const { head: { vars } = {}, results: { bindings } = {} } = await response.json();

    if (vars === undefined || vars.length === 0) {
      throw 'Empty head';
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
