const header = document.createElement("header");
header.innerHTML = `<h1> Users</h1>`;
const main = document.createElement("main");
main.innerHTML = `
    <div class="list" id="list"></div>
    <div class="pagenumbers" id="pagination"></div>
    `
document.body.append(header,main);

fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",{
       method:"GET"
  })
  .then((data) => data.json())
  .then((data)=>{
    let list_items=[...data];
    // console.log(list_items);
    const list_element = document.getElementById("list");
    const pagination_element = document.getElementById("pagination");

    let current_page =1;
    let row = 15;
  
// To Display required items in a page
  
    function DisplayList(items, wrapper, rows_per_page, page){
       // DisplayList(list_items, list_element, row, current_page)
        wrapper.innerHTML="";
      
        page--;

        let  start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);

        // console.log(paginatedItems);
        for(let i=0; i< paginatedItems.length; i++) {
            console.log(paginatedItems[i]);
            let item  = paginatedItems[i];
            let item_element = document.createElement("div")
            item_element.className="item";
            item_element.innerHTML = `
            <h3><span>Name</span> : ${paginatedItems[i].name}</h3>
            <h3><span>Email</span> : ${paginatedItems[i].email}</h3>
            <h3><span>ID</span> : ${paginatedItems[i].id}</h3>`;

            wrapper.append(item_element);
        }
    }
  
//   Setting Up the buttons
  
    function SetupPagination (items, paginationbox, rows_per_page){
        

        let pageCount = Math.ceil(items.length/rows_per_page);

        for(let i=1; i<pageCount+1; i++){

            let btn = PaginationButton(i, items);
            paginationbox.append(btn);
            

        }
    }

//    Creating buttons and linking them
    function PaginationButton(page, items ){
        let button = document.createElement("button");
        button.innerText = page;

        if(current_page==page) button.className=("active");

        button.addEventListener("click", function(){
            current_page= page;
            DisplayList(list_items, list_element, row, current_page);
            
            let current_btn = document.querySelector(".pagenumbers button.active ");
            current_btn.classList.remove("active");

            button.classList.add("active")
        })

        return button;
    }
    DisplayList(list_items, list_element, row, current_page)
    SetupPagination (list_items, pagination_element, row)
  })
  