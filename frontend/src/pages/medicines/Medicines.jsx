import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';
import './medicines.css'
export const Medicines = () => {
  const [solids, setSolids] = useState([]);
  const [liquids, setLiquids] = useState([]);
  const [psychos, setPsychos] = useState([]);
  const { user } = useContext(AuthContext);
  
  const fetchSolid = async () =>{
    const res = await axios.get('/api/solid');
    setSolids(res.data);
  };

  const fetchLiquid = async () =>{
    const res = await axios.get('/api/liquid');
    setLiquids(res.data);
  };

  const fetchPsycho = async () =>{
    const res = await axios.get('/api/psycho');
    setPsychos(res.data);
  };

  const fetchMedicines = async()=>{
    await fetchSolid();
    await fetchLiquid();
    await fetchPsycho();
  }

  useEffect(()=>{
    if(user){
      fetchMedicines();
    }
    

  }, []);

  const handleDelete = async (id, type) =>{
    if(type === 'S'){
      await axios.delete('/api/solid/' + id);
    }else if (type === 'L'){
      await axios.delete('/api/liquid/' + id);
    }else if (type === 'P'){
      await axios.delete('/api/psycho/' + id);
    }
    
    fetchMedicines();
  }

  return (
    <>
    {user ? <><Navbar/>
      <h1 className='medicine-title'>Medicamentos</h1>
      <h2 className='medicine-sub-title'>Solidos</h2>
      <div className='medicine-container'>
        <ul className='medicine-sub-container'>
          {solids.map(solid =>(
            
            <div className='medicine-sub-container-div' key={solid._id}>
            <li  className='medicine-date-container'>
            
            <span className='medicine-date-text'>Fecha de vencimiento:</span>
            <Moment className='medicine-date' date={moment(solid.expiredDate).add(1, 'd')} format='MM/YYYY'/>
            </li>
            <li className='medicine-name-container'>
            <Link className='medicine-name' to={'/S,' + solid._id}>{solid.name}</Link>
            <button className='btn btn-danger button-medicine-delete' onClick={()=>handleDelete(solid._id, 'S')}>🗑️</button>
            <Link className='btn btn-secondary button-medicine-update' to={'/agregar/S,' + solid._id}>🔄</Link>
            </li>
            {new Date(solid.expiredDate) <= new Date().getTime() ? <div className='medicine-expired-text'>VENCIDO</div> : null}
            </div>
          ))}
        </ul>
        <h2 className='sub-title-medicine'>Liquidos</h2>
        <ul className='medicine-sub-container'>
          {liquids.map(liquid =>(
            
            <div className='medicine-sub-container-div' key={liquid._id}>
            <li className='medicine-date-container'>
            <span className='medicine-date-text'>Fecha de vencimiento:</span>
            <Moment className='medicine-date' date={moment(liquid.expiredDate).add(1, 'd')} format='MM/YYYY'/>
            </li>
            <li className='medicine-name-container'>
              <Link className='medicine-name' to={'/L,' + liquid._id}>{liquid.name}</Link>
            <button  className='btn btn-danger button-medicine-delete' onClick={()=>handleDelete(liquid._id, 'L')}>🗑️</button>
            <Link  className='btn btn-secondary button-medicine-update' to={'/agregar/L,' + liquid._id}>🔄</Link>
            </li>
            {new Date(liquid.expiredDate).getTime() <= new Date().getTime() ? <div className='medicine-expired-text'>VENCIDO</div> : null}
            </div>
            
          ))}
        </ul>
        <h2 className='sub-title-medicine'>Psicofarmacos</h2>
        <ul className='medicine-sub-container'>
          {psychos.map(psycho =>(
            <div className='medicine-sub-container-div' key={psycho._id}>
            <li className='medicine-date-container'>
            <span className='medicine-date-text'>Fecha de vencimiento:</span>
            <Moment className='medicine-date' date={moment(psycho.expiredDate).add(1, 'd')} format='MM/YYYY'></Moment>
            </li>
            
            <li className='medicine-name-container'>
            <Link className='medicine-name' to={'/P,' + psycho._id}>{psycho.name}</Link>
            <button className='btn btn-danger button-medicine-delete' onClick={()=>handleDelete(psycho._id, 'P')}>🗑️</button>
            <Link className='btn btn-secondary button-medicine-update' to={'/agregar/P,' + psycho._id}>🔄</Link>
            </li>
            
            {new Date(psycho.expiredDate).getTime() <= new Date().getTime() ? <div className='medicine-expired-text'>VENCIDO</div> : null}
            
            </div>
          ))}
        </ul>
      </div>
      <Footer/></> : <div><Navbar/>Login first</div>}
    </>
  )
}
