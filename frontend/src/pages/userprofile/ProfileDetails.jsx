import InfoBlock from './InfoBlock';
import SocialLinks from './SocialLinks';

const validateLink = (link) => {
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const ProfileDetails = ({ user }) => (
  <div className="w-2/3 p-8 overflow-y-auto custom-scroll">
    {user.bio && (
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#e5e7eb] mb-3 border-b border-[#2d2f36] pb-2">
          About
        </h2>
        <p className="text-[#e5e7eb]">{user.bio}</p>
      </div>
    )}

    <div className="grid grid-cols-2 gap-6 mb-8">
      {user.email && (
        <InfoBlock
          icon="FiMail"
          title="Email"
          value={user.email}
          href={`mailto:${user.email}`}
        />
      )}
      {user.portfolio && (
        <InfoBlock
          icon="FiLink"
          title="Portfolio"
          value={user.portfolio}
          href={validateLink(user.portfolio) ? user.portfolio : null}
        />
      )}
    </div>

    {user.socials && Object.keys(user.socials).length > 0 && (
      <SocialLinks socials={user.socials} />
    )}
  </div>
);

export default ProfileDetails;
