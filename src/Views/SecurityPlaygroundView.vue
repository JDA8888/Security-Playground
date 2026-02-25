<template>
  <div class="min-h-[calc(100vh-4rem)] flex flex-col items-center">
    <div class="w-full max-w-4xl px-4 py-8 space-y-7">
      <!-- Page header / hero -->
      <header class="text-center space-y-4">
        <h1
          class="text-3xl md:text-4xl font-extrabold
                 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300
                 bg-clip-text text-transparent
                 drop-shadow-[0_0_18px_rgba(16,185,129,0.45)]
                 leading-[1.15] pb-1"
        >
          Security Playground
        </h1>

        <div class="space-y-1.5">
          <p
            class="text-sm md:text-base text-slate-100/95 dark:text-slate-100 max-w-2xl mx-auto"
          >
            Explore password strength and classic ciphers in a single interactive page.
            See how small changes make passwords harder to crack and how simple ciphers transform text.
          </p>

          <p class="text-[11px] text-emerald-100/95">
            This is a learning tool - - -
            <span class="font-semibold">PLEASE ONLY USE TEST PASSWORDS, NEVER REAL ONES.</span>
          </p>
        </div>
      </header>

      <!-- Security insights box -->
      <section>
        <SecurityInsightsBox />
      </section>

      <!-- Content: Password + Cipher sections -->
      <div class="space-y-6">
        <!-- Password section (top) -->
        <section>
          <PasswordSection v-model:password="password" />
        </section>

        <!-- Cipher section (bottom) -->
        <section>
          <CipherSection
            :password="password"
            :source-text="sourceText"
            :use-password-as-source="usePasswordAsSource"
            @update:usePasswordAsSource="(val) => (usePasswordAsSource = val)"
            @update:sourceTextOverride="(val) => (sourceTextOverride = val)"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PasswordSection from '../components/password/PasswordSection.vue'
import CipherSection from '../components/cipher/CipherSection.vue'
import SecurityInsightsBox from '../components/SecurityInsightsBox.vue'

// Shared password state for the whole page
const password = ref('')

// Whether Cipher section should use the password as its source text
const usePasswordAsSource = ref(true)

// Custom source text when user chooses not to use the password
const sourceTextOverride = ref('')

// Derived source text that CipherSection actually operates on
const sourceText = computed(() =>
  usePasswordAsSource.value ? password.value : sourceTextOverride.value,
)
</script>