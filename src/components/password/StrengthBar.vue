<template>
  <div class="space-y-1">
    <div class="flex items-center justify-between text-xs">
      <span class="font-semibold text-slate-900 dark:text-emerald-100">
        Strength
      </span>
      <span :class="labelClass">
        {{ strengthLabel }}
      </span>
    </div>

    <div class="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="barClass"
        :style="{ width: barWidth }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  entropyBits: {
    type: Number,
    required: true,
  },
  strengthLabel: {
    type: String,
    required: true,
  },
})

const barWidth = computed(() => {
  // simple mapping: cap at 128 bits
  const max = 128
  const pct = Math.max(0, Math.min(1, props.entropyBits / max))
  return `${Math.round(pct * 100)}%`
})

const barClass = computed(() => {
  const label = props.strengthLabel.toLowerCase()
  if (label.includes('very weak') || label.includes('weak')) {
    return 'bg-red-500'
  }
  if (label.includes('ok') || label.includes('medium')) {
    return 'bg-amber-400'
  }
  if (label.includes('strong') || label.includes('passphrase')) {
    return 'bg-emerald-400'
  }
  return 'bg-slate-400'
})

const labelClass = computed(() => {
  const label = props.strengthLabel.toLowerCase()
  if (label.includes('very weak') || label.includes('weak')) {
    return 'text-red-500 font-semibold'
  }
  if (label.includes('ok') || label.includes('medium')) {
    return 'text-amber-400 font-semibold'
  }
  if (label.includes('strong') || label.includes('passphrase')) {
    return 'text-emerald-400 font-semibold'
  }
  return 'text-slate-700 dark:text-slate-200'
})
</script>