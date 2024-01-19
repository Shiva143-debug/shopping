import Header from './Header'
import { useState, useEffect } from "react"
import { ProgressSpinner } from 'primereact/progressspinner';

const Reports = () => {
    const [value, setBy] = useState("Date")
    const [selectedOption, setSelectedOption] = useState("select");
    const [Data, setData] = useState([])
    const [date, setDateChange] = useState("")
    const [data, setdata] = useState([])
    const [grandTotal, setGrandTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [productName, setproductName] = useState("Select");

    const [productData, setProductData] = useState([])
console.log(productName)



    const byDate = () => {
        setSelectedOption("select")
        setproductName("Select")
        setIsLoading(true)
        setBy("Date")
    }
    const byName = () => {
        setDateChange("")
        setproductName("Select")
        setIsLoading(true)
        setBy("name")

    }

    const byProductName = () => {
        setDateChange("")
        setSelectedOption("select")
        setIsLoading(true)
        setBy("productName")

    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };


    const productHandleSelectChange = (event) => {
        
        setproductName(event.target.value);
        

    };
    useEffect(() => {
        fetch('http://localhost:8083/customer')
            .then(res => res.json())
            .then(data => setData(data)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:8083/product')
            .then(res => res.json())
            .then(data => setProductData(data)

            )

    }, [])


    useEffect(() => {
        // console.log(date)
        setIsLoading(true)
        if (date !== "" && value === "Date") {
    
            fetch(`http://localhost:8083/salesByDate/${date}`)
                .then((res) => res.json())
                .then((itemsData) => setdata(itemsData))
                .catch((err) => console.log(err));
            setIsLoading(false);
    
            let total = 0;
            data.forEach((d) => {
                total += d.Total_Amount;
            });
            setGrandTotal(total);
        } else if (selectedOption !== "select" && value === "name") {
    
            fetch(`http://localhost:8083/salesByName/${selectedOption}`)
                .then((res) => res.json())
                .then((itemsData) => setdata(itemsData))
    
                .catch((err) => console.log(err));
            setIsLoading(false);
    
            let total = 0;
            data.forEach((d) => {
                total += d.Total_Amount;
            });
            setGrandTotal(total);
        } else if (productName !== "select" && value === "productName") {
            fetch(`http://localhost:8083/salesByProductName/${productName}`)
                .then((res) => res.json())
                .then((itemsData) => setdata(itemsData))
    
                .catch((err) => console.log(err));
            setIsLoading(false);
    
            let total = 0;
            data.forEach((d) => {
                total += d.Total_Amount;
            });
            setGrandTotal(total);
        }
    
    
    }, [ selectedOption,isLoading, data, date,productData,productName])

    return (
        <div>
            <Header />
            <div style={{ background: "linear-gradient(to right, white, navy)", height: "100vh" }}>
                <div style={{ display: "flex" }}>
                    <button onClick={byDate} style={{ width: "50%", border: "none", backgroundColor: "whitesmoke", padding: "10px", fontWeight: "bold", borderRight: "1px solid gray" }}>Reports By Date</button>
                    <button onClick={byName} style={{ width: "50%", border: "none", backgroundColor: "whitesmoke", padding: "10px", fontWeight: "bold", borderRight: "1px solid gray" }}>Reports By Name</button>
                    <button onClick={byProductName} style={{ width: "50%", border: "none", backgroundColor: "whitesmoke", padding: "10px", fontWeight: "bold" }}>Reports By productName</button>
                </div>
                {/* {value === "Date" ? "Select Date" : "select Name"}
            <input type={value === "Date" ? "Date" : ""} /> */}

                {value === "name" &&
                    <div className="mb-5 row mt-5 mx-5">
                        <div class="col-3">
                            <label htmlFor="" className="fw-bold" style={{ color: "navy", fontSize: '20px' }}>Select Name:</label>
                        </div>
                        <div class="col-7">
                            <select id="id" class="form-control" value={selectedOption}
                                onChange={handleSelectChange}>
                                <option value="select">Select</option>
                                {Data.map((d) => (
                                    <option key={d.customerId} value={d.name}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
                {value === "Date" &&
                    <div className="mb-5 row mt-5 mx-5">
                        <div class="col-3">
                            <label htmlFor="" className="fw-bold" style={{ color: "navy", fontSize: '20px' }}>Select Date:</label>
                        </div>
                        <div class="col-7">
                            <input type="date" className='form-control' value={date} onChange={(e) => setDateChange(e.target.value)} />
                        </div>
                    </div>
                }

                {value === "productName" &&
                    <div className="mb-5 row mt-5 mx-5">
                        <div class="col-3">
                            <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>select product Name:</label>
                        </div>
                        <div class="col-7">
                            <select id="id" class=" form-control" value={productName}
                                onChange={productHandleSelectChange}>
                                <option value="select">Select</option>
                                {productData.map((d) => (
                                    <option key={d.id} value={d.productName}>
                                        {d.productName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                }

                {isLoading && (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                    </div>
                )}
                {!isLoading && (

                    <div style={{ width: "80%", overflowX: "auto", marginLeft: "10%" }}>
                        <h1 className='h1' style={{ fontFamily: "sans-serif" }}>{value === "Date" && "Bought Item Details By Date"}</h1>
                        <h1 className='h1' style={{ fontFamily: "sans-serif" }}>{value === "name" && "Bought Item Details By Name"}</h1>
                        <h1 className='h1' style={{ fontFamily: "sans-serif" }}>{value === "productName" && "Bought Item Details By productName"}</h1>
                        <table className="table table-bordered" style={{ minWidth: "300px" }}>
                            <thead>
                                {/* <th>ID</th> */}
                                {(value === "productName" || value === "name") && <th>Date</th>}
                                {(value === "productName" || value === "Date") && <th>Name</th>}
                                {(value === "name" || value === "Date") && <th>productName</th>}
                                
                                <th>Prize</th>
                                <th>Quantity</th>
                                <th>Total_Amount</th>
                                

                            </thead>
                            <tbody>
                                {data.map((d, i) => (
                                    <tr key={i}>
                                        {/* <td>{d.itemId}</td> */}
                                        {(value === "productName" || value === "name") && <th>{d.date}</th>}
                                        {(value === "productName" || value === "Date") && <td>{d.name}</td>}
                                        {(value === "name" || value === "Date") && <td>{d.productName}</td>}
                                        
                                        <td>{d.price}</td>
                                        <td>{d.quantity}</td>
                                        <td>{d.Total_Amount}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-end align-items-end">
                            <div style={{ color: "white", fontSize: "18px" }}>
                                <strong>Grand Total:</strong> {grandTotal}
                            </div>
                        </div>
                    </div>
                )}



            </div>
        </div>


    )
}

export default Reports