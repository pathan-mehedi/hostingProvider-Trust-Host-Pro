import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <TwoLayerHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, make a purchase,
                or contact us for support.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, process transactions,
                and communicate with you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>
          </div>
        </div>
      </main>
      <ModernFooter />
    </div>
  )
}
