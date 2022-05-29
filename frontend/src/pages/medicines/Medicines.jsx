import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import moment from 'moment';
export const Medicines = () => {
  const [solids, setSolids] = useState([]);
  const [liquids, setLiquids] = useState([]);
  const [psychos, setPsychos] = useState([]);

  const fetchSolid = async () =>{
    const res = await axios.get('http://localhost:4000/api/solid');
    setSolids(res.data);
  };

  const fetchLiquid = async () =>{
    const res = await axios.get('http://localhost:4000/api/liquid');
    setLiquids(res.data);
  };

  const fetchPsycho = async () =>{
    const res = await axios.get('http://localhost:4000/api/psycho');
    setPsychos(res.data);
  };

  const fetchMedicines = async()=>{
    await fetchSolid();
    await fetchLiquid();
    await fetchPsycho();
  }

  useEffect(()=>{

    fetchMedicines();

  }, []);

  const handleDelete = async (id, type) =>{
    if(type === 'S'){
      await axios.delete('http://localhost:4000/api/solid/' + id);
    }else if (type === 'L'){
      await axios.delete('http://localhost:4000/api/liquid/' + id);
    }else if (type === 'P'){
      await axios.delete('http://localhost:4000/api/psycho/' + id);
    }
    
    fetchMedicines();
  }

  return (
    <>
    <Navbar/>
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
            <Link to={'/lista/S,' + solid._id}>{solid.name}</Link>
            <button onClick={()=>handleDelete(solid._id, 'S')}>🗑️</button>
            
            <Link to={'/agregar/S,' + solid._id}>🔄</Link>
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
            <li><Link to={'/lista/L,' + liquid._id}>{liquid.name}</Link>
            <button onClick={()=>handleDelete(liquid._id, 'L')}>🗑️</button>
            <Link to={'/agregar/L,' + liquid._id}>🔄</Link>
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
            <Link to={'/lista/P,' + psycho._id}>{psycho.name}</Link>
            <button onClick={()=>handleDelete(psycho._id, 'P')}>🗑️</button>
            <Link to={'/agregar/P,' + psycho._id}>🔄</Link>
            </li>
            
            {new Date(psycho.expiredDate).getTime() <= new Date().getTime() ? <div>VENCIDO</div> : null}
            
            </div>
          ))}
        </ul>
      </div>
      <Footer/>
    </>
  )
}
