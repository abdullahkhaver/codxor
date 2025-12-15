import { FiMail, FiLink } from 'react-icons/fi';

const icons = {
  FiMail: <FiMail />,
  FiLink: <FiLink />,
};

const InfoBlock = ({ icon, title, value, href }) => (
  <div className="bg-[#1a1d24]/40 p-4 rounded-xl border border-[#2d2f36]">
    <div className="flex items-center gap-2 text-[#9ca3af] mb-2">
      {icons[icon]}
      <h2 className="text-sm font-medium">{title}</h2>
    </div>
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#6366f1] hover:text-[#0ea5e9] transition-colors break-all"
      >
        {value}
      </a>
    ) : (
      <span className="text-[#9ca3af] italic">Invalid URL</span>
    )}
  </div>
);

export default InfoBlock;
