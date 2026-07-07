import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocsFromServer } from 'firebase/firestore'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')

function loadEnv() {
  const env = {}
  try {
    const content = readFileSync(envPath, 'utf8')
    for (const line of content.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/)
      if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
    }
  } catch (e) {
    console.error('Could not read .env.local:', e.message)
    process.exit(1)
  }
  return env
}

const env = loadEnv()
const projectId = env.VITE_FIREBASE_PROJECT_ID

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
}

console.log('Project ID:', projectId)
console.log('Expected: veenakunwar-50d5d')
console.log('Match:', projectId === 'veenakunwar-50d5d' ? 'YES' : 'NO')

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function testCollection(name) {
  try {
    const snap = await getDocsFromServer(collection(db, name))
    console.log(`\n[${name}] OK — ${snap.size} document(s)`)
    snap.docs.slice(0, 3).forEach((d) => {
      console.log(`  - ${d.id}:`, JSON.stringify(d.data()).slice(0, 120))
    })
    return { ok: true, count: snap.size }
  } catch (err) {
    console.log(`\n[${name}] ERROR`)
    console.log('  code:', err.code || '(none)')
    console.log('  message:', err.message)
    return { ok: false, code: err.code, message: err.message }
  }
}

const products = await testCollection('products')
const sessions = await testCollection('sessions')

console.log('\n--- Summary ---')
if (!products.ok && (products.code === 'not-found' || products.message?.includes('NOT_FOUND'))) {
  console.log('ROOT CAUSE: Firestore database does NOT exist for this project.')
  console.log('FIX: Firebase Console → Build → Firestore Database → Create database')
} else if (!products.ok && products.code === 'permission-denied') {
  console.log('ROOT CAUSE: Firestore exists but rules block reads.')
  console.log('FIX: Deploy rules from docs/firestore.rules')
} else if (products.ok && products.count === 0) {
  console.log('Firestore OK, products collection empty (add via /admin).')
} else {
  console.log('Firestore OK with data.')
}

process.exit(0)
