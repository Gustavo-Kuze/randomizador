import React, { useEffect } from 'react'

const Footer = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <footer className="footer bg-light text-dark fixed-bottom py-3">
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-5">
                        <span className="h5 text-muted">Desenvolvido por </span> <a className="text-decoration-none h5" href="https://www.gustavokuze.com">Gustavo Kuze</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
