

const Cbtn = document.querySelector('#Cbtn');



Cbtn.addEventListener('click',async (e)=>{
    e.preventDefault()
    try{
        const title = document.querySelector('#Ctitle');
        title.value = title.value.replace(/(\s*)/g,'');
        if(!title.value){alert("Title is not written.")}
        else{
            const result = await axios.post('http://localhost:3000/v1/category',{title:title.value})
            if(result.data.warning){
                alert(result.data.warning)
            }else{
                alert("Created!")
                window.location.href="/"
            }
        }
    }catch(err){
        console.error(err)
    }
});

