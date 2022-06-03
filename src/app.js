// this is an example of improting data from JSON

// import 'orders' from './data/orders.JSON'

// export default (function () {
//     // YOUR CODE GOES HERE

//     // next line is for example only
//     document.getElementById("app").innerHTML = "<h1>Hello WG Forge</h1>";
// }());


// const getOrders = (callback) => {
//     const request = new XMLHttpRequest();


//     request.addEventListener('readystatechange', () => {
//         if(request.readyState === 4 && request.status === 200){
//             const orders = JSON.parse(request.responseText);
//             callback(undefined, orders);
//         } else if(request.readyState === 4){
//             callback('could not fetch orders', undefined);
//         }
//     });

//     request.open('GET', 'http://localhost:9000/api/orders.json');
//     request.send();
// };

async function getJson() {

    const requestOrders = new Request('http://localhost:9000/api/orders.json');

    const responseOrders = await fetch(requestOrders);
    const orders = await responseOrders.json();
 
    const requestUsers = new Request('http://localhost:9000/api/users.json');

    const responseUsers = await fetch(requestUsers);
    const users = await responseUsers.json();

    buildTable(orders, users);
  }






function buildTable(ordersData, userData){
    
    var table = document.getElementById('ordersTable')
    for(var i = 0; i < ordersData.length; i++){
        var row = `<tr>
                        <td>${ordersData[i].id}</td>
                        <td class="user_data">${ordersData[i].user_id}
                            <a href="#">${userData[ordersData[i].user_id-1].first_name} ${userData[ordersData[i].user_id-1].last_name}</a>
                        </td>
                        <td>${new Date(ordersData[i].created_at*1000)}</td>
                        <td>$ ${ordersData[i].total}</td>
                        <td>${ordersData[i].card_number}</td>
                        <td>${ordersData[i].card_type}</td>
                        <td>${ordersData[i].order_country}  (${ordersData[i].order_ip})</td>
                   </tr>`
        table.innerHTML += row
    }
}
getJson();