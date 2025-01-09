// Fetch and populate data in the table
fetch('http://localhost:5001/api/admin/orders')
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector('#ordersTable tbody');
    tableBody.innerHTML = data
      .map((order) => {
        return `
          <tr>
            <td>${order.firstName}</td>
            <td>${order.address}</td>
            <td>${order.email}</td>
            <td>${order.phone}</td>
            <td>${order.paymentMode}</td>
            
           <td>
    <div>
    ${order.cartItems.map(item => `${item.name}, Price=${item.price} Quantity= ${item.quantity !== undefined ? item.quantity : 1}`).join('<br><br>')}
</div>


</td>

            <td>${order.orderTotal}</td>
            <td>${order.status}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
          </tr>
        `;
      })
      .join('');
  })
  .catch((error) => console.error('Error fetching orders:', error));
