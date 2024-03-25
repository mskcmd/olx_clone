import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {Firestore, storage} from '../../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const [err,setErr] = useState('')
  const {user}=useContext(AuthContext)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
  
    if (!image) {
      setErr('Image required');
      return;
    } else if (!name || name.trim().length < 4) {
      setErr('Name must be at least 4 characters');
      return;
    } else if (!category || category.trim().length < 4) {
      setErr('Category must be at least 4 characters');
      return;
    } else if (!price || isNaN(price) || price <= 0) {
      setErr('Price must be a valid number greater than 0');
      return;
    }
  
    const refImage = ref(storage, `/Product/${image.name}`);
    const blob = new Blob([image]);
    const uploadImag = uploadBytesResumable(refImage, blob);
  
    uploadImag.on(
      'state_changed',
      (snapshot) => {
        // Handle upload progress if needed
      },
      (err) => {
        alert(err.message);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadImag.snapshot.ref);
          const productCollection = collection(Firestore, 'products');
  
          await addDoc(productCollection, {
            name,
            category,
            price,
            url,
            userId: user.uid,
            date: new Date().toDateString(),
          });
  
          navigate('/');
        } catch (err) {
          alert('Error adding product details to Firestore:', err.message);
        }
      }
    );
  }
  
  return (
    <Fragment>
      <Header />
      <card >
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}
              onChange={(e)=>setPrice(e.target.value)} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
          { err ? <span style={{color:'red'}}>{err}</span> : ''}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;