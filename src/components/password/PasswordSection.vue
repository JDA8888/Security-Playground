<template>
  <div
    class="bg-slate-50/95 dark:bg-slate-900/85 border border-emerald-500/20 dark:border-emerald-500/40 rounded-2xl p-5 shadow-lg shadow-emerald-500/15 backdrop-blur-sm"
  >
    <!-- Heading -->
    <header class="space-y-1 mb-2">
      <h2
        class="text-xl font-semibold text-emerald-700 dark:text-emerald-300"
      >
        Password Strength Trainer
      </h2>
      <p class="text-sm text-slate-700 dark:text-slate-200/90">
        Type a <span class="font-semibold">test</span> password to see its estimated strength,
        entropy, and common issues. Don’t use real account passwords here.
      </p>
    </header>

    <!-- Input row -->
    <div class="space-y-2">
      <label class="block text-sm font-medium text-slate-900 dark:text-emerald-100">
        Test password
      </label>

      <div class="flex flex-col sm:flex-row sm:items-center gap-2">
        <div class="flex-1 relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="localPassword"
            class="w-full bg-white/95 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-base text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-colors"
            placeholder="e.g. PurpleCoffeeWindowCloud!"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-2 flex items-center text-[11px] text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
            @click="toggleVisibility"
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>

        <!-- Example passwords -->
        <ExamplePasswordButtons @select="setExample" />
      </div>

      <p class="text-xs text-slate-700 dark:text-slate-300">
        Length:
        <span class="font-semibold text-slate-900 dark:text-emerald-200">
          {{ analysis.length }}
        </span>
        characters
      </p>
    </div>

    <!-- Strength summary -->
    <div class="mt-3 space-y-2">
      <StrengthBar
        :entropy-bits="analysis.entropyBits"
        :strength-label="analysis.strengthLabel"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-200">
        <div class="space-y-0.5">
          <p class="font-semibold text-slate-900 dark:text-emerald-100">
            Entropy
          </p>
          <p>{{ analysis.entropyBits.toFixed(1) }} bits</p>
        </div>
        <div class="space-y-0.5">
          <p class="font-semibold text-slate-900 dark:text-emerald-100">
            Estimated crack time
          </p>
          <p>
            <span class="font-medium">Offline:</span>
            {{ analysis.crackTimes.offlineDisplay }}
          </p>
          <p>
            <span class="font-medium">Online:</span>
            {{ analysis.crackTimes.onlineDisplay }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pattern analysis (character types, warnings, tips) -->
    <!-- Note: min-h keeps the card height stable so the background doesn't "jump" while typing -->
    <PatternAnalysis :analysis="analysis" class="mt-3 min-h-[150px]" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { analyzePassword } from '../../utils/passwordAnalysis'
import StrengthBar from './StrengthBar.vue'
import PatternAnalysis from './PatternAnalysis.vue'
import ExamplePasswordButtons from './ExamplePasswordButtons.vue'

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:password'])

const showPassword = ref(false)

// v-model bridge
const localPassword = computed({
  get: () => props.password,
  set: (val) => emit('update:password', val),
})

// recompute analysis whenever password changes
const analysis = computed(() => analyzePassword(localPassword.value))

function toggleVisibility() {
  showPassword.value = !showPassword.value
}

function setExample(example) {
  localPassword.value = example
}
</script>