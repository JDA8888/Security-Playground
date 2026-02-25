<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs
           h-[190px] overflow-y-auto pr-1"
  >
    <!-- Character types -->
    <section>
      <h3 class="font-semibold text-slate-900 dark:text-emerald-100 mb-1">
        Character types
      </h3>
      <ul class="space-y-0.5">
        <li class="flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span class="text-slate-700 dark:text-slate-200 font-medium">
            Lowercase letters (a–z)
          </span>
        </li>
        <li class="flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span class="text-slate-700 dark:text-slate-200 font-medium">
            Uppercase letters (A–Z)
          </span>
        </li>
        <li class="flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span class="text-slate-700 dark:text-slate-200 font-medium">
            Digits (0–9)
          </span>
        </li>
        <li class="flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span class="text-slate-700 dark:text-slate-200 font-medium">
            Symbols (!, @, #, etc.)
          </span>
        </li>
      </ul>
    </section>

    <!-- Warnings & suggestions -->
    <section>
      <h3 class="font-semibold text-slate-900 dark:text-emerald-100 mb-1">
        Warnings &amp; suggestions
      </h3>

      <div class="space-y-1">
        <!-- ========================= -->
        <!-- STRONG / PASSPHRASE CASE -->
        <!-- ========================= -->
        <template v-if="isStrong">
          <div
            class="text-emerald-600 dark:text-emerald-300 font-medium"
          >
            ✅ No major issues detected. This password looks strong.
          </div>

          <!-- Extra improvement tips even when strong -->
          <div class="mt-1">
            <p class="font-medium text-slate-800 dark:text-emerald-100">
              Even stronger?
            </p>
            <ul class="list-disc ml-4 space-y-0.5 text-slate-700 dark:text-slate-200">
              <li>Increase the length even further (16+ characters is excellent).</li>
              <li>Avoid reusing this password on multiple sites.</li>
              <li>Consider using a password manager to generate fully random strings.</li>
              <li>Mix unrelated words for stronger passphrases.</li>
            </ul>
          </div>
        </template>

        <!-- ========================= -->
        <!-- WEAK / OK / MEDIUM CASE -->
        <!-- ========================= -->
        <template v-else>
          <!-- WARNINGS -->
          <div
            v-for="(warning, idx) in analysis.warnings"
            :key="`w-${idx}`"
            class="flex items-start gap-1.5"
          >
            <span class="mt-[2px] text-amber-400">⚠️</span>
            <p class="text-slate-700 dark:text-slate-200">
              {{ warning }}
            </p>
          </div>

          <!-- SUGGESTIONS -->
          <div
            v-if="analysis.suggestions && analysis.suggestions.length"
            class="mt-1"
          >
            <p class="font-medium text-slate-800 dark:text-emerald-100">
              Tips:
            </p>
            <ul class="list-disc ml-4 space-y-0.5 text-slate-700 dark:text-slate-200">
              <li
                v-for="(tip, idx) in analysis.suggestions"
                :key="`t-${idx}`"
              >
                {{ tip }}
              </li>
            </ul>
          </div>

          <!-- Fallback if no analyser messages -->
          <div
            v-if="!analysis.warnings.length && !analysis.suggestions.length"
            class="text-slate-600 dark:text-slate-300 mt-1"
          >
            Try increasing the length and mixing uppercase, lowercase,
            numbers, and symbols to improve strength.
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  analysis: {
    type: Object,
    required: true,
  },
})

const analysis = computed(() => props.analysis || {})


const strongLabels = ['Strong', 'Very strong', 'Passphrase-level', 'Passphrase']

const isStrong = computed(() => {
  const label = analysis.value.strengthLabel || ''
  return strongLabels.includes(label)
})
</script>