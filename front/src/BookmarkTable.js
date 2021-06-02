import React from 'react';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Container, makeStyles, Button,IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import DeleteIcon from '@material-ui/icons/Delete'
import {  AddCircleOutlineOutlined } from '@material-ui/icons';
import {
    Link
  } from "react-router-dom";
const drawerWidth=250;
const useStyle = makeStyles((theme)=>({
    head:{
        background: 'linear-gradient(45deg,#7ed6df,#dff9fb)',
    },
    table: {
        marginTop:20,
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
    },
    
    
}));





export default function BookmarkTable({match}){
    const classes = useStyle();
    const [rows, setRows] = React.useState([]);
    React.useEffect(()=>{

        async function getUrls(){
            let addr = new URL("http://localhost:3000/v1/url")
            if(match&&match.params&&match.params.order){
                if(match.params.order==='star'){
                    addr.searchParams.append('like','yes')
                }
                if(match.params.order ==='visit'){
                    addr.searchParams.append('order','visit')
                }
            }
            const rs = await axios.get(addr.href);
            console.log(rs.data)
            setRows(rs.data)
        }
        getUrls()
    },[match])

    const showStar = (like)=>{
        if(like==='yes') return <StarIcon color="secondary"/>
        return <StarBorderIcon/>
    }


    const setStar = async (urlID,like)=>{
        const fixed = like==='yes' ? 'no' : 'yes'
        try{
            await axios.patch(`http://localhost:3000/v1/url/${urlID}`,{fixed})
            setRows(rows.map(
                row=>row.id === urlID
                ? {...row, fixed}
                : row
            ));
        }catch(err){
            console.error(err)
        }
    }

    const deleteRow = async(urlId)=>{
        try{
            const ret = await axios.delete(`http://localhost:3000/v1/url/${urlId}`)
            if(ret.status===200){
                setRows(rows.filter(row=>row.id!==urlId))
            }
        }catch(err){
            console.error(err);
        }
    }



    const countUpdate = (urlId)=>{
        try{
            axios.get(`http://localhost:3000/v1/url/${urlId}/visit`);
        }catch(err){
            console.error(err)
        };
    }

    return(
        <Container justify="center">
            <TableContainer component={Paper} className={classes.table} >
                <Table aria-label="sticky table" size="small" >
                    <TableHead>
                        <TableRow className={classes.head}>
                            <TableCell>Star</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Last Visit</TableCell>
                            <TableCell align="center">Info</TableCell>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody  >
                    { rows.map((row)=>(
                        <TableRow key={row.id} >
                            <TableCell component='th' scope="row" onClick={()=>setStar(row.id,row.fixed)}>
                                {showStar(row.fixed)}
                            </TableCell>
                            <TableCell align="center" onClick={()=>countUpdate(row.id)}><Button href={row.url} target="_blank">{row.title}</Button></TableCell>
                            <TableCell align="center" >{row.visitedAt}</TableCell>
                            <TableCell align="center" ><Link to={`/add/${row.id}`}><IconButton><AddCircleOutlineOutlined/></IconButton></Link></TableCell>
                            <TableCell align="center" onClick={()=>deleteRow(row.id)}><IconButton><DeleteIcon/></IconButton></TableCell>
                            <TableCell align="center">{row.Category && row.Category.title}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}