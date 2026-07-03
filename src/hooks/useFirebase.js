import { useState, useEffect } from 'react'
import { db, storage } from '../firebase'
import { collection, getDocsFromServer, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'

const FETCH_TIMEOUT_MS = 15000

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms)
    }),
  ])
}

function formatFirestoreError(err) {
  const code = err?.code || ''
  const message = err?.message || 'Unknown Firestore error'

  if (code === 'not-found' || message.includes('NOT_FOUND')) {
    return 'Firestore database is not set up. In Firebase Console open Firestore Database and click Create database (production mode, region: asia-south1 or closest to India).'
  }
  if (code === 'permission-denied') {
    return 'Firestore denied read access. Update Firestore security rules to allow public read on products/sessions or sign in as admin.'
  }
  if (message.includes('timed out')) {
    return message
  }
  return message
}

async function fetchCollectionDocs(collectionName) {
  const colRef = collection(db, collectionName)
  const querySnapshot = await withTimeout(
    getDocsFromServer(colRef),
    FETCH_TIMEOUT_MS,
    'Firestore request timed out. Check Firebase project veenakunwar-50d5d and your network.'
  )

  const items = []
  querySnapshot.forEach((docSnap) => {
    items.push({ id: docSnap.id, ...docSnap.data() })
  })

  items.sort((a, b) => {
    const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0)
    const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0)
    return tB - tA
  })

  return items
}

export function useCollection(collectionName) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const items = await fetchCollectionDocs(collectionName)
        if (!cancelled) {
          setData(items)
        }
      } catch (err) {
        console.error(`Error fetching ${collectionName}:`, err)
        if (!cancelled) {
          setData([])
          setError(formatFirestoreError(err))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [collectionName])

  const add = async (item) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...item,
        createdAt: new Date()
      })
      return docRef.id
    } catch (err) {
      console.error('Error adding document:', err)
      throw err
    }
  }

  const update = async (id, updates) => {
    try {
      await updateDoc(doc(db, collectionName, id), updates)
    } catch (err) {
      console.error('Error updating document:', err)
      throw err
    }
  }

  const remove = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id))
    } catch (err) {
      console.error('Error deleting document:', err)
      throw err
    }
  }

  return { data, loading, error, add, update, remove }
}

export function useDocument(collectionName, docId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!docId) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, collectionName, docId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() })
        } else {
          setError('Document not found')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching document:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [collectionName, docId])

  return { data, loading, error }
}

export function useStorage(folderPath) {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const folderRef = ref(storage, folderPath)
        const listResult = await listAll(folderRef)
        const urlPromises = listResult.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          return { url, name: itemRef.name }
        })
        const urls = await Promise.all(urlPromises)
        setUrls(urls)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching storage:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUrls()
  }, [folderPath])

  const uploadFile = async (file, fileName) => {
    try {
      const fileRef = ref(storage, `${folderPath}/${fileName}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      return url
    } catch (err) {
      console.error('Error uploading file:', err)
      throw err
    }
  }

  return { urls, loading, error, uploadFile }
}

