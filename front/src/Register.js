
import {  makeStyles,Button,Select,InputLabel, FormGroup, FormControl, Typography,Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
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
        display: 'flex',
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
    }
}));

export default function Register({match}){
    const classes = useStyle();
    const [categories,setCategories]= React.useState([])
    const [redirect,setRedirect]=React.useState(false)
    const [form,setForm] = React.useState({title:"",url:"",desc:"",category:""})

    const urlId = match&&match.params&& match.params.urlId;


    React.useEffect(()=>{
        async function getCategories(){
            try{
                const cat = await axios.get('http://localhost:3000/v1/category')
                if(cat.data){
                    console.log(cat.data)
                    setCategories(cat.data)
                }
                if(urlId){
                    const addr = await axios.get(`http://localhost:3000/v1/url/${urlId}`);
                    const data = {}
                    data['desc']=addr.data.description ? addr.data.description : ""
                    data['category']=addr.data.CategoryId ?addr.data.CategoryId : ""
                    data['title']=addr.data.title;
                    data['url'] =addr.data.url;
                    setForm(data);
                }
            }catch(err){
                console.error(err)
            }
        }
        getCategories();
    },[urlId])


    const onChange=(e)=>{
        const title = e.currentTarget.elements.title.value;
        const url = e.currentTarget.elements.url.value;
        const desc = e.currentTarget.elements.description&&e.currentTarget.elements.description.value ?  e.currentTarget.elements.description.value : ""
        const categoryId = e.currentTarget.elements.category&&e.currentTarget.elements.category.value ? e.currentTarget.elements.category.value  : ""
        const data={...form}
        data['title']=title
        data['url']=url
        if(desc){data['desc']=desc}
        if(categoryId){data['category']=categoryId}
        setForm(data)
    }


    const onSubmit=async (e)=>{
        e.preventDefault();

       
        if(!form.title || !form.url){
            alert("Check Your Form");
        }else{

            try{
                if(!urlId){
                    await axios.post('http://localhost:3000/v1/url',form)
                    alert("Bookmark Registered!")
                    setRedirect(true)
                }else{
                    await axios.patch(`http://localhost:3000/v1/url/${urlId}`,form)
                    alert("Bookmark Updated!")
                    setRedirect(true)
                }
            }catch(err){
                console.error(err)
            }
        }
    }
    return (
        <Box  className={classes.content}>
        <form onSubmit={onSubmit} onChange={onChange}>
        <FormGroup autoComplete="off" id="register-form" >
            <Typography variant="h6" align="center">Register Bookmark</Typography>
            <TextField variant="outlined"  required id="title" label="Title" name="title" value={form.title}></TextField>
            <TextField variant="outlined" required id="url" label="URL" type="url" name="url" value={form.url}></TextField>
            <TextField id="description" label="Description" name="description" value={form.desc}></TextField>
            <FormControl>
            <InputLabel style={{marginLeft:20}} htmlFor="category">Category</InputLabel>
            <Select native className={classes.select} inputProps={{
                name:'category',
                id:'category',
            }}>
                <option aria-label="None" value=""/>
            {
            categories && categories.map(category=>(
                Number(category.id) === Number(form.category) ? (<option value={category.id} key={category.id} selected>{category.title}</option>) : (<option value={category.id} key={category.id} >{category.title}</option>)
            ))
            }
            </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit" className={classes.btn}>
                { !urlId&&('Submit')}
                { urlId&&('Update')}
            </Button>
            { redirect&&(<Redirect to="/"/>)}
        </FormGroup>
        </form>

        </Box>
    )
}