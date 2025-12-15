// SocialLinks.jsx
import Input from './Input';
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FiSave } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

const SocialLinks = ({ formData, handleChange, loading, handleSubmit }) => {
  return (
    <>
      <h1 className="text-xl font-semibold mb-6 text-white">Social Links</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Twitter"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          icon={<FiTwitter className="text-blue-400" />}
          placeholder="https://twitter.com/username"
        />
        <Input
          label="GitHub"
          name="github"
          value={formData.github}
          onChange={handleChange}
          icon={<FiGithub className="text-gray-400" />}
          placeholder="https://github.com/username"
        />
        <Input
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          icon={<FiLinkedin className="text-blue-500" />}
          placeholder="https://linkedin.com/in/username"
        />
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <ImSpinner2 className="animate-spin w-4 h-4" />
            ) : (
              <FiSave className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default SocialLinks;
