// Classical cipher utilities: Caesar, ROT13 and Vigenère

// ---------------------------------------------------------
// Helper: shift a single character within A–Z or a–z.
// Non-letters (digits, symbols, spaces) are returned unchanged.
// ---------------------------------------------------------
function shiftChar(char, shift) {
  const code = char.charCodeAt(0)

  // Uppercase A–Z
  if (code >= 65 && code <= 90) {
    const base = 65
    const normalized = code - base
    const shifted = (normalized + shift + 26) % 26
    return String.fromCharCode(base + shifted)
  }

  // Lowercase a–z
  if (code >= 97 && code <= 122) {
    const base = 97
    const normalized = code - base
    const shifted = (normalized + shift + 26) % 26
    return String.fromCharCode(base + shifted)
  }

  // Digits, punctuation, spaces, etc. are left unchanged
  return char
}

// =========================================================
// CAESAR
// =========================================================

export function caesarEncrypt(text, shift) {
  if (!text) return ''
  const s = typeof shift === 'number' ? shift : parseInt(shift || '0', 10) || 0
  return Array.from(text)
    .map((ch) => shiftChar(ch, s))
    .join('')
}

export function caesarDecrypt(text, shift) {
  if (!text) return ''
  const s = typeof shift === 'number' ? shift : parseInt(shift || '0', 10) || 0
  // decrypt = encrypt with negative shift
  return caesarEncrypt(text, -s)
}

// ROT13 is just Caesar with shift 13
export function rot13(text) {
  return caesarEncrypt(text, 13)
}

// Mapping for visualisation table (A–Z only)
export function getCaesarMapping(shift) {
  const s = typeof shift === 'number' ? shift : parseInt(shift || '0', 10) || 0
  const plain = []
  const cipher = []

  for (let i = 0; i < 26; i++) {
    const ch = String.fromCharCode(65 + i) // A-Z
    plain.push(ch)
    cipher.push(shiftChar(ch, s))
  }

  return {
    shift: s,
    plain,
    cipher,
  }
}

// =========================================================
// VIGENÈRE
// =========================================================

// Helper: get 0–25 shift from a key letter
function keyCharShift(ch) {
  const upper = ch.toUpperCase()
  const code = upper.charCodeAt(0)
  if (code >= 65 && code <= 90) {
    return code - 65
  }
  return null
}

// Normalise key to A–Z only, uppercase
function normalizeKey(key) {
  if (!key) return ''
  return key.replace(/[^a-zA-Z]/g, '').toUpperCase()
}

export function vigenereEncrypt(text, key) {
  if (!text) return ''
  const normKey = normalizeKey(key)
  if (!normKey.length) {
    // no valid key → just return original text
    return text
  }

  const keyLen = normKey.length
  let keyIndex = 0
  let result = ''

  for (const ch of text) {
    const code = ch.charCodeAt(0)
    const isUpper = code >= 65 && code <= 90
    const isLower = code >= 97 && code <= 122

    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97
      const normalized = code - base
      const shift = keyCharShift(normKey[keyIndex % keyLen])
      const shifted = (normalized + shift + 26) % 26
      result += String.fromCharCode(base + shifted)
      keyIndex++
    } else {
      // numbers / symbols stay as they are
      result += ch
    }
  }

  return result
}

export function vigenereDecrypt(text, key) {
  if (!text) return ''
  const normKey = normalizeKey(key)
  if (!normKey.length) {
    return text
  }

  const keyLen = normKey.length
  let keyIndex = 0
  let result = ''

  for (const ch of text) {
    const code = ch.charCodeAt(0)
    const isUpper = code >= 65 && code <= 90
    const isLower = code >= 97 && code <= 122

    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97
      const normalized = code - base
      const shift = keyCharShift(normKey[keyIndex % keyLen])
      const shifted = (normalized - shift + 26) % 26
      result += String.fromCharCode(base + shifted)
      keyIndex++
    } else {
      result += ch
    }
  }

  return result
}

// =========================================================
// VIGENÈRE – visualisation helper (per-character steps)
// =========================================================

export function getVigenereSteps(text, key) {
  const normKey = normalizeKey(key)
  if (!text || !normKey.length) return []

  const keyLen = normKey.length
  const steps = []
  let keyIndex = 0

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const code = ch.charCodeAt(0)
    const isUpper = code >= 65 && code <= 90
    const isLower = code >= 97 && code <= 122

    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97
      const normalized = code - base
      const keyChar = normKey[keyIndex % keyLen]
      const shift = keyCharShift(keyChar)
      const shifted = (normalized + shift + 26) % 26
      const cipherChar = String.fromCharCode(base + shifted)

      steps.push({
        index: i,
        plainChar: ch,
        keyChar,
        shift,
        cipherChar,
      })

      keyIndex++
    } else {
      // non-letters: no keyChar / shift, cipherChar is same as input
      steps.push({
        index: i,
        plainChar: ch,
        keyChar: null,
        shift: null,
        cipherChar: ch,
      })
    }
  }

  return steps
}