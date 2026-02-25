<template>
  <!-- Outer wrapper: full-screen background image -->
  <div class="min-h-screen" :style="bgStyle">
    <!-- Overlay: medium-dark + slight blur so Matrix theme doesn’t overpower UI -->
    <div
      class="min-h-screen flex flex-col bg-slate-950/60 backdrop-blur-[2px] text-slate-900 dark:text-slate-50"
    >
      <!-- Top nav / brand -->
      <header
        class="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/85"
      >
        <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span
              class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-slate-900 shadow-sm"
            >
              SP
            </span>
            <div class="leading-tight">
              <p class="text-sm font-semibold text-slate-50">
                Security Playground
              </p>
              <p class="text-[11px] text-emerald-300/80">
                Password &amp; cipher lab
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <nav class="hidden sm:flex items-center gap-4 text-xs">
              <RouterLink
                to="/"
                class="px-2 py-1 rounded-md text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                Home
              </RouterLink>
            </nav>

            <!-- Theme toggle -->
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-full border border-emerald-400/60 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-emerald-100 hover:bg-slate-800/80 transition-colors"
              @click="toggleTheme"
            >
              <span
                class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/90 text-[10px] shadow-sm"
              >
                <span v-if="theme === 'dark'">🌙</span>
                <span v-else>☀️</span>
              </span>
              <span>{{ themeLabel }}</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main content -->
      <main class="flex-1">
        <RouterView />
      </main>

      <!-- Footer -->
      <footer class="border-t border-slate-800 bg-slate-950/90">
        <div
          class="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-[13px] text-slate-300"
        >
          <p>
            &copy; {{ currentYear }} Security Playground&trade;. Built by Joel Anderson. All
            rights reserved.
          </p>
          <p class="text-[11px]">
            Educational demo &mdash; please do not enter real passwords.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import matrixBg from './assets/matrix_background.jpg'

// Full-page background image (Matrix)
const bgStyle = {
  backgroundImage: `url(${matrixBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

const currentYear = new Date().getFullYear()

// --------------------
// Light / dark theme
// --------------------

const theme = ref('dark') // 'light' or 'dark'

const themeLabel = computed(() =>
  theme.value === 'dark' ? 'Dark mode' : 'Light mode',
)

function applyTheme() {
  const root = document.documentElement
  if (theme.value === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

// Initialise from localStorage or prefers-color-scheme
onMounted(() => {
  const stored = window.localStorage.getItem('sp-theme')
  if (stored === 'light' || stored === 'dark') {
    theme.value = stored
  } else {
    // default: follow system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = prefersDark ? 'dark' : 'light'
  }
  applyTheme()
})

// Persist + apply on change
watch(theme, (val) => {
  window.localStorage.setItem('sp-theme', val)
  applyTheme()
})
</script>