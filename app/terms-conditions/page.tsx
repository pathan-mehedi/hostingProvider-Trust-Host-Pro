import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <TwoLayerHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Trust Host Pro services, you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed">
                Trust Host Pro provides domain registration, web hosting, and related services. We reserve the right to
                modify or discontinue services at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                All services must be paid in advance. Failure to pay may result in service suspension or termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We offer a 30-day money-back guarantee for hosting services. Domain registrations are non-refundable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree not to use our services for any unlawful purpose or in any way that could damage our
                reputation or services.
              </p>
            </section>
          </div>
        </div>
      </main>
      <ModernFooter />
    </div>
  )
}
