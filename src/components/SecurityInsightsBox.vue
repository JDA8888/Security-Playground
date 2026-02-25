<template>
  <div
    class="relative overflow-hidden rounded-2xl border border-emerald-400/40 bg-emerald-950/40 dark:bg-emerald-950/60 px-4 py-3 text-xs sm:text-[13px] text-emerald-50 shadow-md shadow-emerald-500/20 backdrop-blur-sm"
  >
    <!-- Soft glow in the corner -->
    <div
      class="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-emerald-400/25 blur-2xl"
    ></div>

    <div class="flex items-start gap-3 relative">
      <!-- Icon -->
      <div
        class="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/30 border border-emerald-300/70 shadow-sm"
      >
        <svg
          class="h-4 w-4 text-emerald-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M7 11V8a5 5 0 0 1 10 0v3" />
          <circle cx="12" cy="16" r="1.2" />
        </svg>
      </div>

      <!-- Text -->
      <div class="space-y-1.5">
        <p class="font-semibold text-[13px] sm:text-sm text-emerald-100">
          Security insights
        </p>
        <ul class="list-disc ml-4 space-y-0.5">
          <li>
            <span class="font-medium">Passwords</span> should be long, random and unique to protect your accounts. Avoid common words, patterns, or reused passwords.
          </li>
          <li>
            <span class="font-medium">Classical ciphers</span> like Caesar, ROT13 and Vigenère
            are great for learning, but offer almost no real protection against attackers.
          </li>
          <li>
            Use this playground to see <span class="font-medium">why strong passwords matter</span>
            and how simple patterns are easy to transform and easy to break.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>