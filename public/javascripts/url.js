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
        const categoryId = form.elements.description ? form.elements.category.value  : ''
        const data={}
        if(!title || !url){
            alert("Check Your Form");
        }else{
            data['title']=title
            data['url']=url
            if(desc){data['desc']=desc}
            if(categoryId){data['category']=categoryId}
            await axios.post('http://localhost:3000/v1/url',data)
            alert("Bookmark Registered!")
            window.location.href="/";
        }
    }catch(err){
        console.error(err)
    }
})

