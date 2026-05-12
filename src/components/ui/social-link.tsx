import Link, { type LinkProps } from "next/link"
import { FaLinkedin, FaXTwitter } from "react-icons/fa6"
import { cn } from "@/lib/utils"

export type NetworkLinkProps = Omit<SocialLinkProps, "icon" | "href"> & {
  path: string
}

export const LinkedInLink: React.FC<NetworkLinkProps> = ({ path, ...props }) => (
  <SocialLink href={`https://www.linkedin.com/${path}`} icon={FaLinkedin} {...props} />
)

export const XLink: React.FC<NetworkLinkProps> = ({ path, ...props }) => (
  <SocialLink href={`https://x.com/${path}`} icon={FaXTwitter} {...props} />
)

export type SocialLinkProps = Omit<LinkProps<string>, "children"> & {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  size?: string
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon: Icon,
  size = "size-5",
  className,
  ...props
}) => (
  <Link
    className={cn("text-muted-foreground transition-colors hover:text-foreground", className)}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    {...props}
  >
    <Icon aria-label={props["aria-label"]} className={size} />
  </Link>
)
