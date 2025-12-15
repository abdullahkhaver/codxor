import { FiTwitter, FiGithub, FiLinkedin, FiLink } from 'react-icons/fi';

const getPlatformIcon = (platform) => {
  switch (platform.toLowerCase()) {
    case 'twitter':
      return <FiTwitter className="text-[#0ea5e9]" />;
    case 'github':
      return <FiGithub className="text-[#e5e7eb]" />;
    case 'linkedin':
      return <FiLinkedin className="text-[#6366f1]" />;
    default:
      return <FiLink className="text-[#8b5cf6]" />;
  }
};

const validateLink = (link) => {
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const SocialLinks = ({ socials }) => (
  <div>
    <h2 className="text-lg font-semibold text-[#e5e7eb] mb-4 border-b border-[#2d2f36] pb-2">
      Social Links
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(socials).map(([platform, link]) => (
        <div
          key={platform}
          className="bg-[#1a1d24]/40 p-3 rounded-lg border border-[#2d2f36] hover:border-[#6366f1] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="text-xl">{getPlatformIcon(platform)}</div>
            <div className="truncate">
              {validateLink(link) ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e5e7eb] hover:text-[#6366f1] transition-colors"
                  title={link}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ) : (
                <span className="text-[#9ca3af] italic" title={link}>
                  Invalid {platform} link
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SocialLinks;
