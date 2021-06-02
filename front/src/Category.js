
import {  Grid,makeStyles,Button,  FormGroup, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import React from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'

const drawerWidth=250;



const useStyle = makeStyles((theme)=>({
    content: {
        marginTop:20,
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
        '& .MuiTextField-root':{
            margin: theme.spacing(2),
            width:'30ch'
        },
        alignItems: 'center',
        justifyContent: 'center',
    },
    select:{
        margin: theme.spacing(2),
        width:'28ch'
    },
    
    btn:{
        width:'35ch',
        backgroundColor:'#0fbcf9'
    },
    left:{
        width:'28ch'
    },
    table: {
        marginTop:25,
        width:'80%',
        marginBottom:25
    },
    head:{
        background: 'linear-gradient(45deg,#7ed6df,#dff9fb)',
    }
}));

export default function Category(){
    const classes = useStyle();
    const [title,setTitle] = React.useState("")
    const [categories,setCategories] = React.useState([])

    React.useEffect(()=>{
        async function getCat(){
            const rs = await axios.get('http://localhost:3000/v1/category');
            setCategories(rs.data)
        }
        getCat()
    },[])
    const onChange = (e)=>{
        const ttl = e.currentTarget.elements.title ?  e.currentTarget.elements.title.value : ""
        setTitle(ttl);
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        try{
            if(title&&title.trim()){
                const result = await axios.post('http://localhost:3000/v1/category',{title:title.trim()})
                if(result.data.warning){
                    alert(result.data.warning)
                }else{
                    console.log(result.data)
                    setCategories([...categories,result.data])
                    alert("Created!")
                }
                setTitle("")
            }
        }catch(err){
            console.error(err)
        }
    }


    const deleteCat=async(id)=>{
        try{
            const ret = await axios.delete(`http://localhost:3000/v1/category/${id}`)
            if(ret.status===200){
                setCategories(categories.filter(cat=>cat.id!==id))
            }
        }catch(err){
            console.error(err);
        }
    }


    const onUpdate=async(id,def)=>{
        let title = prompt(`Please Enter New Category Name.`,def)
        if(title!=null){
            title = title.replace(/\s+/g, '')
            if(title){
                try {
                    const res = await axios.patch(`http://localhost:3000/v1/category/${id}`,{title})
                    if(res.status===200){
                        setCategories(categories.map(
                            category => category.id ===id ? {...category,title} : category
                        ))
                    }
                }catch(err){
                    console.error(err);
                }
            }
        }

    }


    return(
        <Grid container className={classes.content} justify="center">
            <Grid >
            <form onSubmit={onSubmit} onChange={onChange}>
            <FormGroup autoComplete="off" id="register-form" >
            <Typography variant="h6" style={{marginLeft:20}}>Register Category</Typography>
            <TextField value={title} variant="outlined"  required id="title" label="Category Name" name="title"></TextField>
            <Button variant="contained" color="primary" type="submit" className={classes.btn}>Submit
            </Button>
            </FormGroup>
            </form>
            </Grid>
            <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="sticky table" size="small" >
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell>Category</TableCell>
                                <TableCell align="right">Update</TableCell>
                                <TableCell align="right">Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { categories.map((category)=>(
                                <TableRow key={category.id}>
                                    <TableCell>{category.title}</TableCell>
                                    <TableCell align="right" onClick={()=>onUpdate(category.id,category.title)}><IconButton><AddCircleOutlineOutlinedIcon/></IconButton></TableCell>
                                    <TableCell align="right" onClick={()=>deleteCat(category.id)}><IconButton><DeleteIcon/></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Grid>
        )
}