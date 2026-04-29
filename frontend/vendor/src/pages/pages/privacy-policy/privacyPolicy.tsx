import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const TermsCondition = () => {
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
                Privacy Policy
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
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5  text-sm text-gray-700 leading-relaxed">
            {/* Title */}
            <h5 className="font-semibold text-gray-900 mb-2">Privacy Policy</h5>
            <p className="text-[13px] text-gray-500 mb-5">
              Last Updated on : 12 Jan 2026
            </p>
            {/* Intro */}
            <p className="mb-5">
              This Privacy Policy explains how Dreams AI Agent collects, uses,
              stores, and protects your information when you use the AI Agent
              Dashboard platform.
            </p>
            {/* Section */}
            <p className="font-semibold text-dark mb-2">
              Information We Collect
            </p>
            <p className="mb-2">
              We may collect the following types of information
            </p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>
                <span className="font-medium text-dark mb-1">
                  Account Information:
                </span>{" "}
                Name, email address, login credentials
              </li>
              <li>
                <span className="font-medium text-dark mb-1">Usage Data:</span>{" "}
                Dashboard activity, agent configurations, workflow interactions
              </li>
              <li>
                <span className="font-medium text-dark mb-1">
                  Device &amp; Technical Data:
                </span>{" "}
                IP address, browser type, operating system
              </li>
              <li>
                <span className="font-medium text-dark mb-1">
                  AI Inputs &amp; Outputs:
                </span>{" "}
                Data you submit to AI agents and generated responses
              </li>
              <li>
                <span className="font-medium text-dark mb-1">
                  Cookies &amp; Tracking Data:
                </span>{" "}
                For analytics and performance optimization
              </li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              How We Use Your Information
            </p>
            <p className="mb-2">Your information is used to:</p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>Provide and operate AI agents and workflows</li>
              <li>Improve dashboard performance and user experience</li>
              <li>Secure user accounts and prevent unauthorized access</li>
              <li>Communicate important updates and service notifications</li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              AI Data Processing
            </p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>
                Data provided to AI agents is processed only to deliver
                requested functionality
              </li>
              <li>
                We do not use your AI data to train public models without
                consent
              </li>
              <li>
                AI interactions may be temporarily stored for performance,
                debugging, or compliance purposes
              </li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              Data Sharing &amp; Disclosure
            </p>
            <p className="mb-2">
              We do not sell or rent your personal data. We may share data only
              with:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>Trusted service providers (hosting, analytics, security)</li>
              <li>Legal authorities when required by law</li>
              <li>Internal teams for maintenance and improvement purposes</li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">
              Cookies &amp; Tracking Technologies
            </p>
            <p className="mb-2">We use cookies to:</p>
            <ul className="list-disc list-inside space-y-1 mb-5 ps-0!">
              <li>Maintain user sessions</li>
              <li>Analyze traffic and usage patterns</li>
              <li>Improve platform functionality</li>
            </ul>
            {/* Section */}
            <p className="font-semibold text-gray-900 mb-2">Policy Updates</p>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Changes will
              be reflected on this page with an updated effective date.
            </p>
            {/* Contact */}
            <p className="font-semibold text-gray-900 mb-1">Contact Us</p>
            <p>
              For questions or concerns regarding this Privacy Policy, contact
              us at:
            </p>
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

export default TermsCondition;
