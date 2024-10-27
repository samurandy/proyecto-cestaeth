import {Outlet, Link} from 'react-router-dom'

export default function Home() {
    return <div className="container">
                <div className="text-end p-2 border">
                    <Link className="mx-2" to="/cesta">Cesta</Link>
                    <Link to="/productos">Productos</Link>
                </div>
        
                <div className='p-3 border'>
                    <Outlet></Outlet>
                </div>
            </div>
    
}