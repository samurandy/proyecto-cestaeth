import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Productos() {
    const {data, isLoading} = useQuery("products", () => {
    return fetch("http://localhost:5555/productos")
    .then(res => res.json())
    })
    if (isLoading) {
        return <div>Cargando...</div>
    }
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(producto => (
                        <tr key={producto.ProductID}>
                            <td><Link to={`/productos/${producto.ProductID}`}>{producto.ProductName}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}