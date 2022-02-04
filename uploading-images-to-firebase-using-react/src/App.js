import { useState, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import "./App.css";
import { storage } from "./firebase-config";
import { firestore } from "./firebase-config";

function App() {
  const [files, setFiles] = useState();
  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    // Check if file does not exist
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    // const uploadTask = storage.put(file);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };

  const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
      const unsub = firestore
        .collection(collection)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          let documents = [];
          snapshot.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        });

      return () => unsub();
    }, [collection]);
    return { docs };
  };

  const ImageGird = () => {
    const { docs } = useFirestore("images");
    console.log(docs);

    return (
      <div className="img-grid">
        {docs &&
          docs.map((doc) => <img key={doc.id} src={doc.url} alt={doc.name} />)}
      </div>
    );
  };

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     let result = await storage
  //       .ref()
  //       .child("Name Of Your Files Map in storage")
  //       .listAll();
  //     let urlPromises = result.items.map((imageRef) =>
  //       imageRef.getDownloadURL()
  //     );

  //     return Promise.all(urlPromises);
  //   };

  //   const loadImages = async () => {
  //     const urls = await fetchImages();
  //     setFiles(urls);
  //   };
  //   loadImages();
  // }, []);

  console.log(files);

  return (
    <div className="App">
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <hr />

      <h3>Uploaded {progress} %</h3>
    </div>
  );
}

export default App;
