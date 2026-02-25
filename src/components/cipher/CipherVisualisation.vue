<template>
  <div class="space-y-3 text-xs text-slate-700 dark:text-slate-300">
    <!-- Caesar / ROT13 visualisation -->
    <div v-if="(cipher === 'caesar' || cipher === 'rot13') && caesarMapping" class="space-y-2">
      <p class="text-slate-600 dark:text-slate-400">
        <span class="font-semibold text-slate-800 dark:text-slate-100">
          {{ cipher === 'rot13' ? 'ROT13 mapping (Caesar shift 13)' : 'Caesar cipher mapping' }}
        </span>
        <span v-if="cipher !== 'rot13'">
          (shift {{ caesarMapping.shift }})
        </span>
        <span v-else>
          (fixed shift 13)
        </span>
      </p>
      <div
        class="overflow-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60"
      >
        <table class="min-w-full text-[11px]">
          <tbody>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="px-2 py-1 text-left font-semibold text-slate-800 dark:text-slate-100">
                Plain
              </th>
              <td v-for="ch in caesarMapping.plain" :key="'p-' + ch" class="px-1 py-1 text-center">
                {{ ch }}
              </td>
            </tr>
            <tr>
              <th class="px-2 py-1 text-left font-semibold text-slate-800 dark:text-slate-100">
                Cipher
              </th>
              <td
                v-for="ch in caesarMapping.cipher"
                :key="'c-' + ch"
                class="px-1 py-1 text-center text-emerald-600 dark:text-emerald-300"
              >
                {{ ch }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-slate-600 dark:text-slate-400">
        Each letter (and any digits using the same shift) in your source text is shifted by
        <span class="font-semibold text-slate-800 dark:text-slate-100">
          {{ caesarMapping.shift }}
        </span>
        positions along this alphabet.
      </p>
    </div>

    <!-- Vigenère visualisation -->
    <div v-else-if="cipher === 'vigenere'" class="space-y-2">
      <p class="text-slate-600 dark:text-slate-400">
        <span class="font-semibold text-slate-800 dark:text-slate-100">
          Vigenère per-character breakdown
        </span>
        (letters and digits – other characters are left as-is).
      </p>

      <div
        v-if="vigenereSteps && vigenereSteps.length"
        class="overflow-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60"
      >
        <table class="min-w-full text-[11px]">
          <thead class="bg-slate-100 dark:bg-slate-800/80">
            <tr>
              <th class="px-2 py-1 text-left font-semibold text-slate-800 dark:text-slate-100">
                Index
              </th>
              <th class="px-2 py-1 text-left font-semibold text-slate-800 dark:text-slate-100">
                Plain
              </th>
              <th class="px-2 py-1 text-left font-semibold text-slate-800 dark:text-slate-100">
                Key
              </th>
              <th class="px-2 py-1 text-left font-semibold text-slate-800 dark:text-slate-100">
                Shift
              </th>
              <th class="px-2 py-1 text-left font-semibold text-slate-800 dark:text-slate-100">
                Cipher
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="step in vigenereSteps"
              :key="step.index"
              class="border-t border-slate-200 dark:border-slate-700"
            >
              <td class="px-2 py-1">{{ step.index }}</td>
              <td class="px-2 py-1">{{ step.plainChar }}</td>
              <td class="px-2 py-1">
                <span v-if="step.keyChar">{{ step.keyChar }}</span>
                <span v-else class="text-slate-500">—</span>
              </td>
              <td class="px-2 py-1">
                <span v-if="step.keyChar">+{{ step.shift }}</span>
                <span v-else class="text-slate-500">—</span>
              </td>
              <td class="px-2 py-1 text-emerald-600 dark:text-emerald-300">
                {{ step.cipherChar }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-slate-500 dark:text-slate-400">
        <p>
          Enter a source text and a key (letters only) to see how each character is transformed.
        </p>
      </div>
    </div>

    <!-- Fallback / no cipher selected -->
    <div v-else class="text-slate-500 dark:text-slate-400">
      <p>Select a cipher and enter some source text to see a visual explanation.</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cipher: {
    type: String,
    required: true,
  },
  caesarMapping: {
    type: Object,
    default: null,
  },
  vigenereSteps: {
    type: Array,
    default: () => [],
  },
})
</script>