
import { Github, Twitter, Globe } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t mt-4">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Solana Token Launchpad</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Create, launch, and manage your own Solana tokens with ease.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/airdrop-solana" className="text-muted-foreground hover:text-primary">
                  Airdrop Solana
                </Link>
              </li>
              <li>
                <Link to="/send-solana" className="text-muted-foreground hover:text-primary">
                  Send Solana
                </Link>
              </li>
              <li>
                <Link to="/generateToken" className="text-muted-foreground hover:text-primary">
                  Generate Solana Token
                </Link>
              </li>
              
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Solana Token Launchpad. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
            <select className="bg-background text-foreground border-none focus:ring-0">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}