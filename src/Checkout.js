import React from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
// import axios from 'axios';

const Checkout = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderDetails } = location.state || {};

    console.log(orderDetails)
    if (!orderDetails || orderDetails.grandTotal === 0) {
        return <div style={{ textAlign: "center", fontSize: "50px" }}>No order details found</div>;
    }

    const { selectedOption, address, contactNo, grandTotal, items, date } = orderDetails;


    const handlePrint = () => {
        window.print();
    
        const exportData = items.map(item => ({
            selectedOption,
            date,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            total_amount: item.Total_Amount,
        }));
    
        fetch('http://localhost:8083/exportToSales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exportData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            
            navigate("/home");
            resetDataAndGrandTotal();
        })
        .catch(error => {
            console.error('Error exporting to sales:', error);
        });
    };

    const resetDataAndGrandTotal=async()=>{
        const response = await fetch(`http://localhost:8083/deleteItems/${selectedOption}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Items deleted successfully');
        } else {
            console.error('Failed to delete items');
        }
    }
    
    
    const onBack=()=>{


        orderDetails.items.forEach((item) => {
            const deductValues = {
                productName: item.productName,
                quantity: item.quantity
            };
    
            fetch("http://localhost:8083/addProductQuantity", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deductValues),
            })
            .then((response) => response.json())
            .then((deductResponse) => {
                console.log("Quantity deducted successfully:", deductResponse);
                navigate("/home");
            })
            .catch((error) => {
                console.error("Error deducting quantity:", error);
            });
        });
        
        

    }

    return (
        <div>

            <style>
                {`
                    @media print {
                        .btn {
                            display: none !important;
                        }
                    }
                `}
            </style>


            <div style={{ margin: "10px 10px 0px 10px", border: "1px solid gray", padding: "20px 100px 100px 100px", paddingBottom: "200px" }}>
                <h1 style={{ textAlign: "center", color: "red", paddingBottom: "20px" }}>INVOICE</h1>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <div style={{ display: "flex" }}>
                        <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1704974380/comapnylogo_gh2jvq.jpg" alt="pic" style={{ width: "50px", height: "40px" }} />
                        <h1 style={{ color: "blue", fontFamily: "sans-serif" }}>WhereSoftTechnolgies</h1>

                    </div>
                    <button onClick={handlePrint} className="btn btn-outline-success" style={{ marginTop: "20px" }}>Export / Print</button>
                </div>
                <p style={{ fontSize: "20px", color: "blue",paddingBottom:"30px"  }}><strong>Address:</strong> pragathinagar</p>

                <div style={{ fontSize: "20px", paddingBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <p><strong>Name:</strong> {selectedOption}</p>
                        <p><strong>Address:</strong> {address}</p>
                        <p><strong>Contact No:</strong> {contactNo}</p>
                    </div>
                    <p style={{ paddingTop: "20px" }}><strong>Date:</strong> {date}</p>
                </div>
                {/* <h3>Items in Cart</h3> */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.Total_Amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div>
                    <p style={{ float: "right", fontSize: "24px" }}><strong>Grand Total:</strong> {grandTotal}</p>
                </div>

                <button type="button" class="btn btn-info btn-lg" onClick={onBack}>Back</button>

            </div>
        </div>
    );
};

export default Checkout;
