import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
export const Medicines = () => {

  const [solids, setSolids] = useState([]);
  const [liquids, setLiquids] = useState([]);
  const [psychos, setPsychos] = useState([]);

  useEffect(()=>{

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
      fetchSolid();
      fetchLiquid();
      fetchPsycho();
    }
    fetchMedicines();

  }, [solids, liquids, psychos]);

  return (
    <>
      <h1>Medicines</h1>
      <h2>Solids</h2>
      <div>
        <ul>
          {solids.map(solid =>(
            <Link to={'/lista/S,' + solid._id}><li key={solid._id}>{solid.name}</li></Link>
          ))}
        </ul>
        <h2>Liquid</h2>
        <ul>
          {liquids.map(liquid =>(
            <Link to={'/lista/L,' + liquid._id}><li key={liquid._id}>{liquid.name}</li></Link>
          ))}
        </ul>
        <h2>Psycho</h2>
        <ul>
          {psychos.map(psycho =>(
            <Link to={'/lista/P,' + psycho._id}><li key={psycho._id}>{psycho.name}</li></Link>
          ))}
        </ul>
      </div>
    </>
  )
}
