<template>
  <div
    class="bg-slate-50/95 dark:bg-slate-900/85 border border-emerald-500/20 dark:border-emerald-500/40 rounded-2xl p-5 shadow-lg shadow-emerald-500/15 backdrop-blur-sm min-h-[520px]"
  >
    <!-- Heading -->
    <header class="space-y-1 mb-2">
      <h2
        class="text-xl font-semibold bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent"
      >
        Cipher Playground
      </h2>
      <p class="text-sm text-slate-700 dark:text-slate-200/90">
        Use your test password or custom text to explore classic cipher transformations.
        These ciphers are fun but <span class="font-semibold">not secure</span> for real passwords.
      </p>
    </header>

    <!-- Source text selector -->
    <section class="space-y-2">
      <p class="text-sm font-medium text-slate-800 dark:text-emerald-100">
        Source text
      </p>

      <div
        class="flex flex-col md:flex-row md:items-center gap-2 text-xs text-slate-700 dark:text-slate-200"
      >
        <label class="inline-flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            class="accent-emerald-500"
            :checked="usePassword"
            @change="setUsePassword(true)"
          />
          <span>Use current password (shown as plain text below)</span>
        </label>

        <label class="inline-flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            class="accent-emerald-500"
            :checked="!usePassword"
            @change="setUsePassword(false)"
          />
          <span>Use custom text</span>
        </label>
      </div>

      <div class="mt-2">
        <textarea
          v-if="usePassword"
          :value="password"
          readonly
          class="w-full h-24 bg-white/95 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-50 resize-none"
        />
        <textarea
          v-else
          v-model="customSource"
          placeholder="Type any message you want to encrypt or decrypt..."
          class="w-full h-24 bg-white/95 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none"
        />
        <p class="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
          Current source length:
          <span class="font-semibold text-slate-900 dark:text-emerald-200">
            {{ currentText.length }}
          </span>
          characters
        </p>
      </div>
    </section>

    <!-- Cipher controls & output -->
    <section class="space-y-3 mt-4">
      <!-- Controls row as a 2-column grid -->
      <div class="grid gap-3 md:grid-cols-2 min-h-[96px]">
        <!-- Left: cipher type -->
        <div>
          <label
            class="block text-sm font-medium text-slate-800 dark:text-emerald-100 mb-1"
          >
            Cipher type
          </label>
          <select
            v-model="selectedCipher"
            class="w-full bg-white/95 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          >
            <option value="caesar">Caesar cipher</option>
            <option value="vigenere">Vigenère cipher</option>
            <option value="rot13">ROT13 (fixed shift 13)</option>
          </select>
        </div>

        <!-- Right: cipher-specific controls; we keep the column, only the inner content changes -->
        <div class="flex flex-col justify-start">
          <!-- Caesar controls -->
          <div v-if="selectedCipher === 'caesar'" class="space-y-1">
            <label class="block text-sm font-medium text-slate-800 dark:text-emerald-100">
              Shift (Caesar)
            </label>
            <input
              type="range"
              min="-25"
              max="25"
              v-model.number="caesarShift"
              class="w-full accent-emerald-500"
            />
            <p class="text-xs text-slate-600 dark:text-slate-300">
              Current shift:
              <span class="font-semibold text-slate-900 dark:text-emerald-200">
                {{ caesarShift }}
              </span>
            </p>
          </div>

          <!-- Vigenère controls -->
          <div v-else-if="selectedCipher === 'vigenere'" class="space-y-1">
            <label class="block text-sm font-medium text-slate-800 dark:text-emerald-100">
              Key (Vigenère)
            </label>
            <input
              type="text"
              v-model="vigenereKey"
              class="w-full bg-white/95 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="e.g. BCV"
            />
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Letters only, case-insensitive.
            </p>
          </div>

          <!-- ROT13 helper text -->
          <div v-else class="text-xs text-slate-600 dark:text-slate-400">
            <label class="block text-sm font-medium text-slate-800 dark:text-emerald-100 mb-1">
              ROT13 settings
            </label>
            <p>ROT13 uses a fixed shift of 13 on letters. No extra settings.</p>
          </div>
        </div>
      </div>

      <!-- Buttons & result -->
      <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="px-3 py-1.5 text-sm rounded-md bg-emerald-500 text-slate-900 font-medium hover:bg-emerald-400 active:bg-emerald-500/90"
            @click="encrypt"
          >
            Encrypt
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-sm rounded-md bg-slate-800 text-slate-50 hover:bg-slate-700 active:bg-slate-800/90"
            @click="decrypt"
          >
            Decrypt
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-sm rounded-md border border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-emerald-400 hover:text-emerald-200"
            @click="resetResult"
          >
            Clear result
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-sm rounded-md border border-emerald-500 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 active:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="!result"
            @click="copyResult"
          >
            Copy result
          </button>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-800 dark:text-emerald-100 mb-1"
          >
            Result
          </label>
          <textarea
            v-model="result"
            class="w-full h-28 bg-white/95 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none"
            placeholder="Encrypted or decrypted text will appear here."
          />
        </div>
      </div>
    </section>

    <!-- Visualisation (fixed height with scroll to stop card resizing) -->
    <section class="border-t border-slate-200 dark:border-slate-700 pt-3 mt-4">
      <div class="h-64 md:h-72 overflow-y-auto">
        <CipherVisualisation
          :cipher="selectedCipher"
          :caesar-mapping="
            selectedCipher === 'caesar' || selectedCipher === 'rot13' ? caesarMapping : null
          "
          :vigenere-steps="selectedCipher === 'vigenere' ? vigenereSteps : []"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  caesarEncrypt,
  caesarDecrypt,
  vigenereEncrypt,
  vigenereDecrypt,
  getCaesarMapping,
  getVigenereSteps,
  rot13,
} from '../../utils/ciphers'
import CipherVisualisation from './CipherVisualisation.vue'

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
  sourceText: {
    type: String,
    required: true,
  },
  usePasswordAsSource: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:usePasswordAsSource', 'update:sourceTextOverride'])

// Local reactive state for cipher controls and result
const selectedCipher = ref('caesar')
const caesarShift = ref(3)
const vigenereKey = ref('')
const result = ref('')

// Is "use password" radio selected?
const usePassword = computed(() => props.usePasswordAsSource)

// v-model for custom source text (emits back up to parent)
const customSource = computed({
  get: () => props.sourceText,
  set: (val) => emit('update:sourceTextOverride', val),
})

// Current text the cipher operates on: either password or custom text
const currentText = computed(() =>
  usePassword.value ? props.password : customSource.value || ''
)

function setUsePassword(value) {
  emit('update:usePasswordAsSource', value)
}

// Visualisation data
const caesarMapping = computed(() => {
  const shift = selectedCipher.value === 'rot13' ? 13 : caesarShift.value
  return getCaesarMapping(shift)
})

const vigenereSteps = computed(() => {
  if (selectedCipher.value !== 'vigenere') return []
  return getVigenereSteps(currentText.value, vigenereKey.value)
})

// Encrypt uses the currentText as input
function encrypt() {
  const text = currentText.value

  if (!text) {
    result.value = ''
    return
  }

  if (selectedCipher.value === 'caesar') {
    result.value = caesarEncrypt(text, caesarShift.value)
  } else if (selectedCipher.value === 'vigenere') {
    if (!vigenereKey.value || !vigenereKey.value.match(/[a-zA-Z]/)) {
      result.value = 'Please enter a key containing at least one letter.'
    } else {
      result.value = vigenereEncrypt(text, vigenereKey.value)
    }
  } else if (selectedCipher.value === 'rot13') {
    result.value = rot13(text)
  } else {
    result.value = text
  }
}

// Decrypt uses the RESULT as input if available, otherwise falls back to currentText
function decrypt() {
  const text = result.value || currentText.value

  if (!text) {
    result.value = ''
    return
  }

  if (selectedCipher.value === 'caesar') {
    result.value = caesarDecrypt(text, caesarShift.value)
  } else if (selectedCipher.value === 'vigenere') {
    if (!vigenereKey.value || !vigenereKey.value.match(/[a-zA-Z]/)) {
      result.value = 'Please enter a key containing at least one letter.'
    } else {
      result.value = vigenereDecrypt(text, vigenereKey.value)
    }
  } else if (selectedCipher.value === 'rot13') {
    // ROT13 decrypt = ROT13 encrypt (same operation)
    result.value = rot13(text)
  } else {
    result.value = text
  }
}

function resetResult() {
  result.value = ''
}

async function copyResult() {
  if (!result.value) return
  try {
    await navigator.clipboard.writeText(result.value)
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}
</script>