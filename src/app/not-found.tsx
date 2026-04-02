import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="py-32 bg-white">
      <Container>
        <div className="text-center">
          <p className="font-heading font-bold text-[#F78F1E] text-8xl mb-4">404</p>
          <h1 className="font-heading font-bold text-[#032D51] text-3xl sm:text-4xl mb-4">
            Página no encontrada
          </h1>
          <p className="text-[#747474] text-lg mb-8 max-w-md mx-auto">
            La página que buscas no existe o fue movida.
          </p>
          <Button href="/" variant="primary">
            Volver al inicio
          </Button>
        </div>
      </Container>
    </section>
  )
}
