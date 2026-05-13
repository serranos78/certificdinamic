export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      
      <div className="container py-5">
        <div className="row g-4">

          {/* Navegación */}
          <div className="col-12 col-md-3">
            <h5>Navegación</h5>
            <ul className="list-unstyled">
              <li><a href="#nosotros" className="text-light text-decoration-none">Sobre nosotros</a></li>
              <li><a href="#contactForm" className="text-light text-decoration-none">Contacto</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-12 col-md-3">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li><a href="/privacidad" className="text-light text-decoration-none">Política de Privacidad</a></li>
              <li><a href="/terminos" className="text-light text-decoration-none">Términos y Condiciones</a></li>
              <li><a href="/aviso-legal" className="text-light text-decoration-none">Aviso Legal</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-12 col-md-3">
            <h5>Contacto</h5>
            <p className="mb-1 fw-semibold">Sistema de control de Anime</p>
            <p className="mb-1">Dirección: Calle Principal #123, Jilotepec, México</p>
            <p className="mb-1">
              Tel: <a href="tel:+525512345678" className="text-light text-decoration-none">
                +52 55 1234 5678
              </a>
            </p>
            <p>
              Email: <a href="mailto:contacto@animesystem.com" className="text-light text-decoration-none">
                contacto@animesystem.com
              </a>
            </p>
          </div>

          {/* Redes sociales */}
          <div className="col-12 col-md-3">
            <h5>Redes sociales</h5>
            <a href="https://facebook.com/animesystem" target="_blank" rel="noreferrer"
              className="text-light text-decoration-none d-block">
              Facebook
            </a>
            <a href="https://instagram.com/animesystem" target="_blank" rel="noreferrer"
              className="text-light text-decoration-none d-block">
              Instagram
            </a>
            <a href="https://twitter.com/animesystem" target="_blank" rel="noreferrer"
              className="text-light text-decoration-none d-block">
              Twitter
            </a>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-secondary text-center py-3">
        <small>
          © 2026 animesystem. Todos los derechos reservados.
        </small>
      </div>

    </footer>
  );
}