import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
export const Medicine = () => {

  const [medicine, setMedicine] = useState({});
  const [found, setFound] = useState(false);

  const params = useParams()
  const type = params.id.split(',');
  useEffect(()=>{
    
    const fetchMedicine = async () =>{
      let res;
      try{
        if(type[0] === 'S'){
          res = await axios.get('http://localhost:4000/api/solid/' + type[1]);
        }else if(type[0] === 'L'){
          res = await axios.get('http://localhost:4000/api/liquid/' + type[1]);
        }else if(type[0] === 'P'){
          res = await axios.get('http://localhost:4000/api/psycho/' + type[1]);
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
    fetchMedicine();
    
  }, [found]);
  

  return (
    <>
    <Navbar/>
      <h1>Medicine</h1>
      {found ? medicine.name : <div>Not found</div>}
      <Footer/>
    </>
  )
}
