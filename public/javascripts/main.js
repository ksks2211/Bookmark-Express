


function displayUrls(urls){
    const tbl = document.querySelector('tbody') 
    tbl.innerHTML=""
    urls.forEach(url=>{
        const tr = document.createElement('tr')
        tr.dataset.id = url.id;

        let td = document.createElement('td')
        td.textContent = url.fixed ==='yes' ? "⭐": "☆";
        tr.appendChild(td)

        td.addEventListener('click',async(e)=>{
            const urlID = td.parentNode.dataset.id;
            const fixed = e.target.textContent === '⭐' ? 'no' : 'yes'
            try{
                await axios.patch(`http://localhost:3000/v1/url/${urlID}`,{fixed})
                e.target.textContent = fixed ==='yes' ? "⭐": "☆";
            }catch(err){
                console.error(err)
            }
        })

        td=document.createElement('td')
        const anchor = document.createElement('a')
        anchor.href=url.url
        anchor.target="_blank"
        anchor.title = url.description || url.url
        anchor.textContent=url.title
        td.appendChild(anchor)
        tr.appendChild(td)

        td=document.createElement('td')
        td.textContent = url.visitedAt
        tr.appendChild(td)

        td = document.createElement('td')
        let button = document.createElement('button')
        button.textContent="Update"
        td.appendChild(button)
        tr.append(td);
        td.addEventListener('click',()=>{
            const urlID = td.parentNode.dataset.id;
            document.location.href = `/url?id=${urlID}`
        })


        td = document.createElement('td')
        button = document.createElement('button')
        button.textContent="Delete"
        td.addEventListener('click', async(e)=>{
            const urlID = td.parentNode.dataset.id;
            try{
                const ret = await axios.delete(`http://localhost:3000/v1/url/${urlID}`)
                if(ret.status===200){
                    tbl.removeChild(tr)
                }
            }catch(err){
                console.error(err);
            }
        })
        td.appendChild(button)
        tr.append(td)


        if(url.CategoryId){
            td = document.createElement('td')
            const category = document.createElement('a')
            category.href=`/?category=${url.CategoryId}`
            category.textContent=url.Category.title;
            td.appendChild(category);
            tr.append(td)
        }
        tbl.appendChild(tr)
    });
}



window.onload = async ()=>{
    try{
        const urls = await axios.get('http://localhost:3000/v1/url')
        if(urls.data){
            displayUrls(urls.data)
        }
    }catch(err){
        console.error(err);
    }
}
