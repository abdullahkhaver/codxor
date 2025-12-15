// ProfileView.jsx
import { format } from 'date-fns';
import { FiCalendar, FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

const ProfileView = ({ data }) => {
  if (!data) return <div className="text-gray-400">Loading profile...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={data.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&s'}
            alt={data.fullName}
            className="w-20 h-20 rounded-full border-4 border-gray-700 object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{data.fullName}</h1>
          <p className="text-gray-400">@{data.username}</p>
          <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
            <FiCalendar /> Joined{' '}
            {format(new Date(data.createdAt), 'MMMM yyyy')}
          </p>
        </div>
      </div>

      {data.bio && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-400 mb-2">Bio</h2>
          <p className="text-white">{data.bio}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.email && (
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-400 mb-2">Email</h2>
            <a
              href={`mailto:${data.email}`}
              className="text-blue-400 hover:text-blue-300"
            >
              {data.email}
            </a>
          </div>
        )}

        {data.portfolio && (
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-400 mb-2">
              Portfolio
            </h2>
            <a
              href={data.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 break-all"
            >
              {data.portfolio}
            </a>
          </div>
        )}
      </div>

      {(data.socials?.twitter ||
        data.socials?.github ||
        data.socials?.linkedin) && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-400 mb-3">
            Social Links
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.socials?.twitter && (
              <a
                href={data.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <FiTwitter className="text-blue-400" /> Twitter
              </a>
            )}
            {data.socials?.github && (
              <a
                href={data.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <FiGithub /> GitHub
              </a>
            )}
            {data.socials?.linkedin && (
              <a
                href={data.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <FiLinkedin className="text-blue-500" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
