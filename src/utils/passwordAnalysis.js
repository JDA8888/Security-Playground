// Simple password analysis utilities: entropy, strength label, patterns, crack times

// Small list of common weak words to detect inside passwords
const COMMON_WORDS = [
  'password',
  'qwerty',
  'monash',
  'welcome',
  'football',
  'letmein',
  'admin',
  'user',
  'abc123',
  'dragon',
  'iloveyou',
]

// Convert seconds to a human-readable string (rough)
function formatTime(seconds) {
  if (!seconds || seconds <= 0) return 'instant'

  const units = [
    { label: 'year', seconds: 60 * 60 * 24 * 365 },
    { label: 'day', seconds: 60 * 60 * 24 },
    { label: 'hour', seconds: 60 * 60 },
    { label: 'minute', seconds: 60 },
  ]

  for (const unit of units) {
    if (seconds >= unit.seconds) {
      const value = Math.round(seconds / unit.seconds)
      return `${value} ${unit.label}${value !== 1 ? 's' : ''}`
    }
  }

  return `${Math.round(seconds)} seconds`
}

export function analyzePassword(password) {
  const length = password.length

  // Character set detection
  let hasLower = false
  let hasUpper = false
  let hasDigit = false
  let hasSymbol = false

  for (const ch of password) {
    if (/[a-z]/.test(ch)) hasLower = true
    else if (/[A-Z]/.test(ch)) hasUpper = true
    else if (/[0-9]/.test(ch)) hasDigit = true
    else hasSymbol = true
  }

  // Estimate charset size
  let charsetSize = 0
  if (hasLower) charsetSize += 26
  if (hasUpper) charsetSize += 26
  if (hasDigit) charsetSize += 10
  if (hasSymbol) charsetSize += 33 // rough number of printable symbols

  // Entropy calculation
  let entropyBits = 0
  if (length > 0 && charsetSize > 0) {
    entropyBits = length * Math.log2(charsetSize)
  }

  // Strength label based on entropy
  let strengthLabel = 'Empty'
  if (length === 0) {
    strengthLabel = 'Empty'
  } else if (entropyBits < 28) {
    strengthLabel = 'Very weak'
  } else if (entropyBits < 36) {
    strengthLabel = 'Weak'
  } else if (entropyBits < 60) {
    strengthLabel = 'Medium'
  } else if (entropyBits < 128) {
    strengthLabel = 'Strong'
  } else {
    strengthLabel = 'Very strong'
  }

  // Crack time estimates (average case = half search space)
  const guessesOnline = 10 // 10 guesses / second (online throttled)
  const guessesOffline = 1e9 // 1 billion guesses / second (offline attack)

  const combinations = entropyBits > 0 ? Math.pow(2, entropyBits) : 0
  const avgTries = combinations / 2

  const onlineSeconds = avgTries / guessesOnline
  const offlineSeconds = avgTries / guessesOffline

  // Pattern detection / warnings / suggestions
  const warnings = []
  const suggestions = []

  if (length > 0 && length < 8) {
    warnings.push('Very short password (less than 8 characters).')
    suggestions.push('Use at least 12 characters, preferably more.')
  } else if (length >= 8 && length < 12) {
    warnings.push('Short password (less than 12 characters).')
    suggestions.push('Longer passwords are harder to crack. Aim for 12+ characters.')
  }

  if (!hasLower || !hasUpper || !hasDigit || !hasSymbol) {
    warnings.push('Limited character variety.')
    suggestions.push('Mix lowercase, uppercase, digits, and symbols where possible.')
  }

  // Common word detection
  const lower = password.toLowerCase()
  for (const word of COMMON_WORDS) {
    if (word.length >= 4 && lower.includes(word)) {
      warnings.push(`Contains common word: "${word}".`)
      suggestions.push('Avoid common words and predictable patterns.')
      break
    }
  }

  // Sequential patterns (simple check)
  const sequences = ['1234', 'abcd', 'qwerty', '1111', '0000']
  for (const seq of sequences) {
    if (lower.includes(seq)) {
      warnings.push(`Contains common sequence: "${seq}".`)
      suggestions.push('Avoid simple sequences like 1234 or qwerty.')
      break
    }
  }

  // Repeated characters (e.g. aaa, !!!!)
  if (/(.)\1{2,}/.test(password)) {
    warnings.push('Contains repeated characters.')
    suggestions.push('Avoid long runs of the same character.')
  }

  // Deduplicate suggestions
  const uniqueSuggestions = [...new Set(suggestions)]

  return {
    length,
    entropyBits,
    strengthLabel,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
    warnings,
    suggestions: uniqueSuggestions,
    crackTimes: {
      onlineSeconds,
      offlineSeconds,
      onlineDisplay: formatTime(onlineSeconds),
      offlineDisplay: formatTime(offlineSeconds),
    },
  }
}