import React, { useState, useEffect } from "react"
import { Box, Button, Input, Select } from "@chakra-ui/react";
import {useDispatch} from 'react-redux'
import {saveFilter, getPublications, setCurrentPage, saveSort, clearFilters} from '../../redux/actions/index'

function SavedFilters({filterToSave, savedSort, savedCity}){
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [savedValue, setSavedValue] = useState([])
  const [storedValues, setStoredValues] = useState([])

  useEffect(()=>{
    setStoredValues(Object.keys(localStorage))
  },[savedValue])

  const handleLocalStorage = (keyValue) => {
    if(keyValue){
      window.localStorage.setItem(keyValue, JSON.stringify([filterToSave, savedSort, savedCity]))
      setSavedValue([...savedValue, keyValue])
      setValue('')
    }
  }
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const handleValue = (event) => {
    if(!event.target.value){
      dispatch(clearFilters())
      dispatch(getPublications(filterToSave, savedSort, savedCity))
      setCurrentPage(1)
    }
    let filter = localStorage.getItem(event.target.value)
    let newFilter = JSON.parse(filter)
    dispatch(saveFilter(newFilter[0]));
    dispatch(saveSort(newFilter[1]))
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filterToSave, savedSort, newFilter[2]));
  }

  return (
    <Box>
      <Input type="text" value={value} onChange={handleChange}/>
      <Button onClick={()=>handleLocalStorage(value)}>Save Filter</Button>
      <Select onChange={handleValue} placeholder='My Filters'>
        {storedValues?.map((v,i)=> <option key={i}>{v}</option> )}
      </Select>
    </Box>
  )

}
export default SavedFilters;