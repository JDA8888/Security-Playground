<template>
  <div class="flex flex-wrap gap-1">
    <button
      v-for="example in examples"
      :key="example.label"
      type="button"
      class="px-2 py-1 rounded-md border border-slate-600 bg-slate-900/60 text-[11px] text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition"
      @click="$emit('select', example.value)"
    >
      {{ example.label }}
    </button>
  </div>
</template>

<script setup>
const examples = [
  { label: 'Very weak', value: 'password123' },
  { label: 'OK', value: 'Football!2024' },
  { label: 'Strong', value: 'G7v!3zqM#xX$#@' },
  { label: 'Passphrase', value: '@purple!coffee@window!cloud$' },
]
</script>