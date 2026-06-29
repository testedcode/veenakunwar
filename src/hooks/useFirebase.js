import { useState, useEffect } from 'react'
import { db, storage } from '../firebase'
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'

export function useCollection(collectionName) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName))
        let items = []
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() })
        })
        items.sort((a, b) => {
          const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0)
          const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0)
          return tB - tA
        })
        setData(items)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching collection:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

