import { useEffect, useState } from 'react'
import { db, firebase } from '../firebase'

function useCollection<T = firebase.firestore.DocumentData>(path: string) {
  const [docs, setDocs] = useState<T[]>([])
  useEffect(() => {
    let collection = db.collection(path)

    return collection.onSnapshot((snapshot) => {
      const docs: any = []
      snapshot.forEach((doc) => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      setDocs(docs)
    })
  }, [path])

  return docs
}

export { useCollection }
