import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';

export const Medicine = () => {

  const [medicine, setMedicine] = useState({});
  const [found, setFound] = useState(false);
  const {user} = useContext(AuthContext);
  const params = useParams()
  const type = params.id.split(',');
  useEffect(()=>{
    
    const fetchMedicine = async () =>{
      let res;
      try{
        if(type[0] === 'S'){
          res = await axios.get('/api/solid/' + type[1]);
        }else if(type[0] === 'L'){
          res = await axios.get('/api/liquid/' + type[1]);
        }else if(type[0] === 'P'){
          res = await axios.get('/api/psycho/' + type[1]);
        }
        if(res.data !== null){
          await setMedicine(res.data);
          setFound(true);
        }
        if(res.data === null){
          setFound(false);
        }
      }catch(err){
       
       console.log(err);
       setFound(false);
      }
    };
    if(user){
      fetchMedicine();
    }
    
    
  }, [found]);
  

  return (
    <>
    <Navbar/>
      <h1>Medicine</h1>
      {found ? 
      <ul>
        <li>{medicine.name}</li>
        {medicine.freeSale ? <li>Venta libre</li> : <></>}
        <li>{medicine.quantity}</li>
        <li><Moment format='MM/YYYY'>{medicine.expiredDate}</Moment></li>
      </ul>
      
      
      
      : <div>Not found</div>}
      <Footer/>
    </>
  )
}
