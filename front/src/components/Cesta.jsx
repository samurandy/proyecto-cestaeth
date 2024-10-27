import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import { ethers } from 'ethers'
import { Link } from 'react-router-dom'


export default function Home() {
    const [estado] = useContext(Context)
    const [cuenta, setCuenta] = useState(null)
    const [txOk, setTxOk] = useState(null)
    const [txKo, setTxKo] = useState(null)
    const total = estado.cesta.reduce((acc, item) => acc + item.total, 0)

    useEffect(() => {
        window.ethereum && window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then(cuentas => {
            setCuenta(cuentas[0])
            ethereum.on("accountsChanged", (cuentas) => {
                setCuenta(cuentas[0])
            })
        })
    }, [])

    async function pagar() {
        const txParams = {
            to: "0x729cF35110ad454061594870DCA91ca1F29444b9", //Una cuenta de metamask
            from: cuenta,
            value: ethers.parseEther(total.toString()).toString(16) //Pasar a hexadecimal
        }
        try {
            const tx = await ethereum.request({
                method:"eth_sendTransaction",
                params:[txParams]
            })
            setTxOk(tx)
        } catch (error) {
            setTxKo(error)
        }
    }

    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {estado.cesta.map(i => (
                    <tr key={i.producto.ProductID}>
                        <td>
                            <Link to={`/productos/${i.producto.ProductID}`}>{i.producto.ProductID}</Link>
                            </td>
                        <td>{i.producto.ProductName}</td>
                        <td>{i.cantidad}</td>
                        <td>{i.producto.UnitPrice}</td>
                        <td>{i.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Total {total}</h3>
        <h4>{`Cuenta: ${cuenta ? cuenta : "No hay cuenta conectada"}`}</h4>
        <button onClick={() => pagar(total)} className="btn btn-primary">Pagar</button>

        {txOk && <p className="alert alert-success">{txOk}</p>}
        {txKo && <p>{txKo}</p>}
    </div>
    
}