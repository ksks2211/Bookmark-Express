function displayCategory(categories){
    const selector = document.querySelector('#category-select')
    categories.forEach(category=>{
        let option = document.createElement('option');
        option.value = category.id;
        option.textContent=category.title
        selector.appendChild(option);
    })
    let option = document.createElement('option')
    option.value=""
    option.textContent="None"
    selector.appendChild(option);
}




window.onload = async ()=>{
    
    try{
        const categories = await axios.get('http://localhost:3000/v1/category')
        if(categories.data){
            displayCategory(categories.data)
        }
        const urlID = new URL(location.href).searchParams.get('id');
        if (urlID) {
            const btn = document.querySelector('#Ubtn');
            btn.value='Update';


            const url = await axios.get(`http://localhost:3000/v1/url/${urlID}`);
            const form = document.querySelector('#u-form');
            form.elements.title.value = url.data.title;
            form.elements.url.value = url.data.url;
            form.elements.description.value =  url.data.description;
            form.elements.category.value =  url.data.CategoryId ? url.data.CategoryId : '';
        }
    }catch(err){
        console.error(err);
    }
}





const form = document.querySelector('#u-form');
form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    try{
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
        const title= form.elements.title.value.trim().replace(reg,'')
        const url = form.elements.url.value
        const desc = form.elements.description ?  form.elements.description.value.trim().replace(reg,'') : ''
        const categoryId = form.elements.category ? form.elements.category.value  : ''
        const data={}
        if(!title || !url){
            alert("Check Your Form");
        }else{
            data['title']=title
            data['url']=url
            if(desc){data['description']=desc}
            if(categoryId){data['CategoryId']=categoryId}
            const urlID = new URL(location.href).searchParams.get('id');
            if (urlID){
                await axios.patch(`http://localhost:3000/v1/url/${urlID}`,data)
                alert("Bookmark Updated!")
            }else{
                await axios.post('http://localhost:3000/v1/url',data)
                alert("Bookmark Registered!")
            }
            window.location.href="/";
        }
    }catch(err){
        console.error(err)
    }
})

