

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


function displayCategories(categories){
    const tbl = document.querySelector('tbody') 
    tbl.innerHTML=""
    categories.forEach(category=>{
        const tr = document.createElement('tr')
        const anchor = document.createElement('a');
        anchor.textContent = category.title
        anchor.href=`/?category=${category.id}`
        tr.dataset.id = category.id;
        tr.appendChild(anchor)


        let td = document.createElement('td')
        td.textContent = category.createdAt;
        tr.appendChild(td)

        tbl.appendChild(tr);
        td = document.createElement('td')
        button = document.createElement('button')
        button.textContent="Update"
        td.appendChild(button)

        td.addEventListener('click',async (e)=>{
            let title = prompt(`Please Enter New Category Name.`,td.parentNode.firstChild.textContent)
            if(title!=null){
                title = title.replace(/\s+/g, '')
                const id = td.parentNode.dataset.id;
                if(title){
                    try {
                        const res = await axios.patch(`http://localhost:3000/v1/category/${id}`,{title})
                        if(res.status===200){
                            td.parentNode.firstChild.textContent=title
                        }
                    }catch(err){
                        console.error(err);
                    }
                }
            }
        })
        tr.append(td)

        td = document.createElement('td')
        button = document.createElement('button')
        button.textContent="Delete"
        td.addEventListener('click', async(e)=>{
            const categoryID = td.parentNode.dataset.id;
            try{
                const ret = await axios.delete(`http://localhost:3000/v1/category/${categoryID}`)
                if(ret.status===200){
                    tbl.removeChild(tr)
                }
            }catch(err){
                console.error(err);
            }
        })
        td.appendChild(button)
        tr.append(td)




        

        tbl.appendChild(tr)
    })

}



window.onload = async()=>{
    try{
        const categories = await axios.get('http://localhost:3000/v1/category')
        if (categories.data){
            displayCategories(categories.data);
        }
    }catch(err){
        console.error(err)
    }
}