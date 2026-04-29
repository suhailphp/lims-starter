import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";


const Profile = () => {
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6">
        <div className="my-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to={Path.dashboard}
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-primary"
                >
                  <i className="icon icon-house" />
                  Home
                </Link>
              </li>
              <li>
                <span className="text-default">/</span>
              </li>
              <li aria-current="page" className=" text-gray-900">
                Terms &amp; Conditions
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
        {/* Grid Left */}
        <div className="xxl:col-span-10 xxl:col-start-2 xl:col-span-10 xl:col-start-2 lg:col-span-12 lg:col-start-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 text-sm text-gray-700 leading-relaxed">
            {/* Title */}
            <h5 className="font-semibold text-gray-900 mb-2">
              Terms &amp; Conditions
            </h5>
            <p className="text-[13px] text-gray-500 mb-5">
              Last Updated on : 12 Jan 2026
            </p>
            {/* Intro */}
            <p className="mb-5">
              Welcome to Dreams AI Agent. By accessing or using the AI Agent
              Dashboard, you agree to comply with and be bound by these Terms
              &amp; Conditions.
            </p>
            {/* Section */}
            <p className="font-semibold text-dark mb-2">Platform Usage</p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>
                The platform is provided for managing AI agents, workflows, and
                automation tasks
              </li>
              <li>
                You must use the dashboard only for lawful and authorized
                purposes
              </li>
              <li>
                Misuse, abuse, or attempts to disrupt the system are strictly
                prohibited
              </li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">User Accounts</p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials
              </li>
              <li>
                You must provide accurate and up-to-date account information
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate these terms
              </li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              Acceptable Use Policy
            </p>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>
                Use the platform for illegal, harmful, or unethical activities
              </li>
              <li>Upload malicious code, malware, or unauthorized data</li>
              <li>Attempt to reverse-engineer or exploit the system</li>
              <li>Interfere with platform performance or security</li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              Data &amp; Privacy
            </p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>Your data is handled according to our Privacy Policy</li>
              <li>You retain ownership of your data and AI inputs</li>
              <li>
                We may process data to operate, secure, and improve the platform
              </li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              Intellectual Property
            </p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>
                All platform content, design, logos, and software are owned by
                Dreams AI Agent
              </li>
              <li>
                You may not copy, distribute, or modify any part of the platform
                without permission
              </li>
              <li>
                AI-generated outputs belong to the user, subject to applicable
                laws
              </li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              Limitation of Liability
            </p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>To the maximum extent permitted by law:</li>
              <li>
                We are not liable for indirect, incidental, or consequential
                damages
              </li>
              <li>
                We are not responsible for decisions made based on AI-generated
                outputs
              </li>
              <li>Use of the platform is at your own risk</li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              Modifications to Terms
            </p>
            <p className="mb-4">
              We may update these Terms &amp; Conditions at any time. Continued
              use of the platform after updates constitutes acceptance of the
              revised terms.
            </p>
            {/* Contact */}
            <p className="font-semibold text-gray-900 mb-1">
              Contact Information
            </p>
            <p>For questions regarding these Terms &amp; Conditions:</p>
            <p>
              <strong>Email:</strong> support@example.com
            </p>
          </div>
        </div>
      </div>
      {/* End Grid */}
    </div>
  );
};

export default Profile;
