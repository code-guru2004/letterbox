

// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src={'/logo.png'}
              width={120}
              height={120}
              alt='logo'
            />
          </div>
          <div className="flex space-x-4">
            <Link href="/sign-in" className="px-4 py-2 text-purple-700 hover:text-purple-900 font-medium">
              Login
            </Link>
            <Link href="/sign-up" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Send <span className="text-purple-600">anonymous</span> messages to anyone
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Express yourself freely without revealing your identity. Connect with others in complete privacy.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/dashboard" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-center">
                Your Inbox
              </Link>
              <Link href="#about" className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium text-center">
                How It Works
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <MessageIllustration className="w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16" id='about'>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose AnonMsg</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-indigo-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start sending anonymous messages?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who express themselves freely every day.
          </p>
          <Link href="/signup" className="inline-block px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            👋Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image
              src={'/logo.png'}
              width={120}
              height={120}
              alt='logo'
            />
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-purple-300 transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-purple-300 transition-colors">Terms</Link>
              <Link href="/" className="hover:text-purple-300 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-gray-400 text-sm">
            © {new Date().getFullYear()} NAYAN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// SVG Components
const MessageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor" />
  </svg>
);

const MessageIllustration = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 300H400V100H100V300Z" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
    <path d="M120 150H380V130H120V150Z" fill="#8B5CF6" />
    <path d="M120 190H300V170H120V190Z" fill="#C4B5FD" />
    <path d="M120 230H250V210H120V230Z" fill="#DDD6FE" />
    <circle cx="350" cy="200" r="30" fill="#A78BFA" />
    <path d="M340 200H360V220H340V200Z" fill="white" />
    <path d="M350 190V210" stroke="white" strokeWidth="2" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.ww3.org/2000/svg">
    <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  {
    icon: <ShieldIcon className="h-6 w-6 text-purple-600" />,
    title: "Complete Anonymity",
    description: "Your identity stays hidden. No traces, no logs, just pure privacy."
  },
  {
    icon: <UserIcon className="h-6 w-6 text-purple-600" />,
    title: "Easy to Use",
    description: "Simple interface that lets you send messages in just a few clicks."
  },
  {
    icon: <SendIcon className="h-6 w-6 text-purple-600" />,
    title: "Instant Delivery",
    description: "Messages are delivered immediately to the recipient's inbox."
  }
];