import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { data } from './fakedata';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const TableHeading =  [
    {id:'Company Name' , label:'Company Name', align:"right"},
    {id:'Project Type' , label:'Project Type', align:"right"},
    {id:'Active' , label:'Active', align:"right"},
    {id:'07/18/2021' , label:'07/18/2021', align:"right"},
    {id:'08/01/2021' , label:'08/01/2021', align:"right"},
    {id:'07/25/2021' , label:'07/25/2021', align:"right"}, 
  ]
  

const TimeSheet = () => {
 
   
    const sumData = Object.keys(data).map(key => Object.keys(data[key]).map(findData => data[key][findData]))
    console.log(sumData)
   

    //sum of the subtotal part

    const mergeData = data => {
      let subData = []

      console.log(data)
      data.map((loadData,index) => {
        console.log(loadData)

        const mergeValue = data => {
          const result = {}; //(1)
        
          data.forEach(basket => { //(2)
            for (let [key, value] of Object.entries(basket)) { //(3)
              if (parseInt(result[key] )) { //(4)
                result[key] += value; //(5)
              } else { //(6)
                result[key] = value;
              }
            }
          });
          return result; //(7)
        };

        const objectData = mergeValue(loadData);
        console.log(objectData);
        subData.push(objectData)
        console.log(subData)
      
    });
   
       return subData;
    };

    const mergedObject = mergeData(sumData);

    console.log(mergedObject);


    return (
        <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead >

                <TableRow >
                  <TableCell>Opportunity Name</TableCell>
                {TableHeading.map((headInfo,index) => (
                 <TableCell   key = {headInfo.id} ><p>{headInfo.label}</p></TableCell>
                 ))}
              </TableRow>
          </TableHead>
          {Object.keys(data).map( (key, ind) => (
          <TableBody key={key}>
         
                   {/* <p  style={{color:'red',fontSize:"20px"}} >{key}</p>
               
                <Divider style={{width:"100%"}}/> */}
                <TableRow >
                    <TableCell style={{color:'red',fontSize:"20px"}}>
                        {key}
                    </TableCell>
                </TableRow>
               
                {Object.keys(data[key]).map( (xData, ind) => (
                   
                  <TableRow key={ind}>
                    <TableCell >
                      <p>{xData}</p>
                    </TableCell>
                   
                          {TableHeading.map((headInfo,index) =>  {
                              console.log(headInfo.label)
                              console.log(data[key])
                              console.log(ind)
                            return (

                          
                    <TableCell key={index}>
                      <p >{data[key][xData][headInfo.label] || 0}</p>
                    </TableCell>
                           ) }) }
                    
                  </TableRow>
                     
                            
                ))}
            
            {mergedObject.map((mData,i) => (
              ind === i ? (
                <TableRow key={i}>
                    <TableCell>SubTotal</TableCell>
                   
                    {TableHeading.map((headInfo,index) =>  {
                              console.log(headInfo.label)
                              console.log(data[key])
                            return (
                             
                    <TableCell key={index}>
                           {/* {
                             (parseInt(mData[headInfo.label])) !== isNaN
                            
                             ? ( */}
                              <p>{(parseInt(mData[headInfo.label])  ? <span style={{fontWeight:'600'}}> {mData[headInfo.label]}   </span>: null )}</p>
                             {/* ):null} */}
                            
                    </TableCell>
                   
                            )})}
                            
                </TableRow>):null
                 ))}
                  
          </TableBody>
          ))}
        </Table>
      </TableContainer>
    );
};

export default TimeSheet;