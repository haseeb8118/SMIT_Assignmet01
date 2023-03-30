
const selectPages = document.getElementById("noOfRecords") as HTMLSelectElement;
const storageContainer = document.getElementById("container") as HTMLSelectElement;
const errorMessage = document.createElement("h2");
let items: item[] = [];
let currentcomboValue: string;

function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dummyjson.com/products');
    xhr.onload = () => {
      if (xhr.status === 200) {
        items = JSON.parse(xhr.responseText);
        let numberOfRecords = items.products.length;

        for (let i = 0; i < numberOfRecords; i++) {
            const option = document.createElement("option");
            option.value = (i++).toString();
            option.text = (i++).toString();
            selectPages?.add(option);
        }
        selectPages.selectedIndex = 10;
        currentcomboValue = selectPages.value;
        renderTable(currentcomboValue);
        //createTable(data);
      } else {
        console.error(`Error: ${xhr.status} ${xhr.statusText}`);
      }
    };
    xhr.onerror = () => {
      console.error('There was an error');
    };
    xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
type item = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

// function createTable(data: any[]) {
//     const table = document.getElementById('data-table')!;
//     const header = document.createElement("thead");;
//     const row = header.insertRow();
//     for (const key in data[0]) {
//       const th = document.createElement('th');
//       th.textContent = key;
//       row.appendChild(th);
//     }
//     const tbody = document.createElement("tbody");;
//     for (const item of data) {
//       const row = tbody.insertRow();
//       for (const key in item) {
//         const cell = row.insertCell();
//         cell.textContent = item[key];
//       }
//     }
//   }
  

// const selectPages = document.getElementById("noOfRecords") as HTMLSelectElement;
// const storageContainer = document.getElementById("container") as HTMLSelectElement;
// const errorMessage = document.createElement("h2");
// let items: item[] = [];
// let currentcomboValue: string;
  

// fetch(`https://dummyjson.com/products`).then(res => res.json()).then((data) => {
//         items = data.products;
//         const numberOfRecords = items.length;

//         for (let i = 0; i < numberOfRecords; i++) {
//             const option = document.createElement("option");
//             option.value = (i++).toString();
//             option.text = (i++).toString();
//             selectPages?.add(option);
//         }
//         selectPages.selectedIndex = 10;
//         currentcomboValue = selectPages.value;
//         renderTable(currentcomboValue);

//     }).catch((error) => {
//         if(error.message === "There was an error"){
//             errorMessage.innerHTML = "Please check your internet connection";
//         }
//         else{
//             errorMessage.innerHTML = "";
//         }
//         storageContainer?.appendChild(errorMessage)
//     });
    selectPages.addEventListener("change", () => {renderTable(selectPages.value);})

function renderTable(limit: string) {
    storageContainer?.replaceChildren();
    const url = `https://dummyjson.com/products?limit=${limit}`;
    fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }).then((data) => {
        items = data.products;
        const tableElement = document.createElement("table");
        const headerRow = document.createElement("tr");
        headerRow.style.textAlign = 'left';
        const IdHeader = document.createElement("th");
        IdHeader.innerHTML = "ID";
        const TitleHeader = document.createElement("th");
        TitleHeader.innerHTML = "Title";
        const BrandHeader = document.createElement("th");
        BrandHeader.innerHTML = "Brand";
        const CategoryHeader = document.createElement("th");
        CategoryHeader.innerHTML = "Category";
        const PriceHeader = document.createElement("th");
        PriceHeader.innerHTML = "Price";
        PriceHeader.style.textAlign = 'right';
        const ImageHeader = document.createElement("th");
        ImageHeader.innerHTML = "Image";
        ImageHeader.style.textAlign = 'Center';

        headerRow.appendChild(IdHeader);
        headerRow.appendChild(TitleHeader);
        headerRow.appendChild(BrandHeader);
        headerRow.appendChild(CategoryHeader);
        headerRow.appendChild(PriceHeader);
        headerRow.appendChild(ImageHeader);
        tableElement.appendChild(headerRow);

        for (const product of items) {
            const row = document.createElement("tr");
            const IdCell = document.createElement("td");
            IdCell.innerHTML = product.id.toLocaleString();
            const titleCell = document.createElement("td");
            titleCell.innerHTML = product.title;
            const brandCell = document.createElement("td");
            brandCell.innerHTML = product.brand;
            const categoryCell = document.createElement("td");
            categoryCell.innerHTML = product.category;
            const priceCell = document.createElement("td");
            priceCell.innerHTML = product.price.toLocaleString();
            priceCell.style.textAlign = 'right';
            const imageCell = document.createElement("td");
            const imageElement = document.createElement("img");
            imageElement.src = product.images[0];
            imageElement.alt = "Not Available";
            imageElement.style.width = "100px";
            imageCell.style.textAlign = 'Center';
            imageCell.appendChild(imageElement);
            row.appendChild(titleCell);
            row.appendChild(IdCell);
            row.appendChild(titleCell);
            row.appendChild(brandCell);
            row.appendChild(categoryCell);
            row.appendChild(priceCell);
            row.appendChild(imageCell);
            tableElement.appendChild(row);
        }
        storageContainer?.appendChild(tableElement);
    }).catch((error) => {
        errorMessage.innerHTML = error.message === "There was an error" ? "Please check your internet connection" : "";
        storageContainer?.appendChild(errorMessage)
    });
};
