import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';
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
      <h1>Medicamentos</h1>
      <h2>Solidos</h2>
      <div>
        <ul>
          {solids.map(solid =>(
            
            <div  key={solid._id}>
            <li>
            
            <span>Fecha de vencimiento:</span>
            <Moment date={moment(solid.expiredDate).add(1, 'd')} format='MM/YYYY'/>
            </li>
            <li>
            <Link to={'/S,' + solid._id}>{solid.name}</Link>
            <button className='btn btn-danger' onClick={()=>handleDelete(solid._id, 'S')}>🗑️</button>
            <Link className='btn btn-secondary' to={'/agregar/S,' + solid._id}>🔄</Link>
            </li>
            {new Date(solid.expiredDate) <= new Date().getTime() ? <div>VENCIDO</div> : null}
            </div>
          ))}
        </ul>
        <h2>Liquidos</h2>
        <ul>
          {liquids.map(liquid =>(
            
            <div  key={liquid._id}>
            <li>
            <span>Fecha de vencimiento:</span>
            <Moment date={moment(liquid.expiredDate).add(1, 'd')} format='MM/YYYY'/>
            </li>
            <li><Link to={'/L,' + liquid._id}>{liquid.name}</Link>
            <button  className='btn btn-danger' onClick={()=>handleDelete(liquid._id, 'L')}>🗑️</button>
            <Link  className='btn btn-secondary' to={'/agregar/L,' + liquid._id}>🔄</Link>
            </li>
            {new Date(liquid.expiredDate).getTime() <= new Date().getTime() ? <div>VENCIDO</div> : null}
            </div>
            
          ))}
        </ul>
        <h2>Psicofarmacos</h2>
        <ul>
          {psychos.map(psycho =>(
            <div key={psycho._id}>
            <li>
            <span>Fecha de vencimiento:</span>
            <Moment date={moment(psycho.expiredDate).add(1, 'd')} format='MM/YYYY'></Moment>
            </li>
            
            <li >
            <Link to={'/P,' + psycho._id}>{psycho.name}</Link>
            <button className='btn btn-danger' onClick={()=>handleDelete(psycho._id, 'P')}>🗑️</button>
            <Link className='btn btn-secondary' to={'/agregar/P,' + psycho._id}>🔄</Link>
            </li>
            
            {new Date(psycho.expiredDate).getTime() <= new Date().getTime() ? <div>VENCIDO</div> : null}
            
            </div>
          ))}
        </ul>
      </div>
      <Footer/></> : <div><Navbar/>Login first</div>}
    </>
  )
}
