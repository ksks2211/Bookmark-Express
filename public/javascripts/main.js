function displayUrls(urls){
    const tbl = document.querySelector('tbody') 
    tbl.innerHTML=""
    urls.forEach(url=>{
        const tr = document.createElement('tr')
        tr.dataset.id = url.id;

        let td = document.createElement('td')
        td.textContent = url.fixed ==='yes' ? "⭐": "☆";
        tr.appendChild(td)

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
        tr.append(td)

        td = document.createElement('td')
        button = document.createElement('button')
        button.textContent="Delete"
        td.appendChild(button)
        tr.append(td)

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
