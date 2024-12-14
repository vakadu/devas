import Link from 'next/link';

import { ImagePlaceholder } from '@devas/ui';

export default function Privacy() {
	return (
		<div className="pb-[52px]">
			<div className="flex flex-wrap justify-between items-center py-6 container">
				<div>
					<Link href="/">
						<ImagePlaceholder
							src="/images/logo.svg"
							containerClasses="w-[120px] h-[80px]"
							imageClasses="rounded-full object-contain"
						/>
					</Link>
				</div>
			</div>
			<div className="container">
				<h1 className="text-32 font-medium mb-12">Privacy Policy</h1>
				<p>
					Your privacy is important to us. This Privacy Policy explains how Biggr
					(&quot;we, &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects your
					information when you use our mobile application. By using our App, you agree to
					the practices described in this policy.
				</p>
				<div className="mt-24">
					<h2 className="text-24 font-medium mt-12">1. Information We Collect</h2>
					<div className="ml-24 ">
						<h3 className="text-18 font-semibold py-12">1.1 Location Data</h3>
						<div className="space-y-12 ml-24">
							<p>
								We collect your location data to provide services based on your
								geographical location. For example, we use your location to:
							</p>
							<ul className="list-disc ml-24">
								<li>Show relevant data specific to your area.</li>
								<li>Improve your user experience within the app.</li>
							</ul>
							<p>
								Your location is obtained via GPS, Wi-Fi, or network services
								(depending on your device settings) with your explicit permission.
							</p>
						</div>
					</div>
					<div className="ml-24 ">
						<h3 className="text-18 font-semibold py-12">
							1.2 Notification Permissions
						</h3>
						<div className="space-y-12 ml-24">
							<p>
								We request access to send you notifications to keep you informed
								about important updates, alerts, and features of the app. You can
								manage your notification preferences in your device settings.
							</p>
						</div>
					</div>
					<div className="ml-24 ">
						<h3 className="text-18 font-semibold py-12">
							1.3 Automatically Collected Information
						</h3>
						<div className="space-y-12 ml-24">
							<p>
								When you use the app, we may collect certain technical information
								automatically, including:
							</p>
							<ul className="list-disc ml-24">
								<li>Device type and operating system.</li>
								<li>IP address.</li>
								<li>
									Usage data such as session duration and interactions with the
									app.
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-24">
					<h2 className="text-24 font-medium mt-12">2. How We Use Your Information</h2>
					<div className="ml-24 space-y-12">
						<p>We use the collected information to:</p>
						<ul className="list-disc ml-24">
							<li>Provide personalized services based on your location.</li>
							<li>Notify you about updates, promotions, and alerts.</li>
							<li>Improve app performance and user experience.</li>
							<li>Analyze usage patterns to fix bugs and enhance features.</li>
						</ul>
						<p>
							We do not sell or share your personal data with third parties for
							marketing purposes.
						</p>
					</div>
				</div>
				<div className="mt-24">
					<h2 className="text-24 font-medium mt-12">3. How We Protect Your Data</h2>
					<div className="ml-24 space-y-12">
						<p>We implement security measures to safeguard your data, including:</p>
						<ul className="list-disc ml-24">
							<li>Secure data transmission using HTTPS.</li>
							<li>Limiting access to data on a need-to-know basis.</li>
							<li>Storing data in secure servers.</li>
						</ul>
						<p>
							Despite these measures, no method of electronic storage or transmission
							is completely secure, and we cannot guarantee absolute security.
						</p>
					</div>
				</div>
				<div className="mt-24">
					<h2 className="text-24 font-medium mt-12">4. Your Choices and Rights</h2>
					<div className="ml-24 space-y-12">
						<p>You have the following rights regarding your data:</p>
						<ul className="list-disc ml-24">
							<li>
								Location Permissions: You can enable or disable location access via
								your device settings. Disabling this may limit app functionality.
							</li>
							<li>
								Notification Permissions: You can manage notification preferences in
								your device settings.
							</li>
							<li>
								Data Access and Deletion: You may request access to, correction of,
								or deletion of your personal data by contacting us.
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-24">
					<h2 className="text-24 font-medium mt-12">5. Children&apos;s Privacy</h2>
					<p className="ml-24 mt-12">
						Our App is not intended for individuals under the age of 13. We do not
						knowingly collect personal information from children.
					</p>
				</div>
				<div className="mt-24">
					<h2 className="text-24 font-medium mt-12">6. Updates to This Policy</h2>
					<p className="ml-24 mt-12">
						We may update this Privacy Policy from time to time. We will notify you of
						any significant changes by posting the updated policy within the app or
						through other communication methods.
					</p>
				</div>
				<div className="mt-24">
					<h2 className="text-24 font-medium mt-12">7. Contact Us</h2>
					<p className="ml-24 mt-12">
						If you have questions about this Privacy Policy or your data, please contact
						us at:{' '}
						<span className="font-medium">
							Email:{' '}
							<a href="mailto:biggr.ventures@gmail.com">biggr.ventures@gmail.com</a>
						</span>
					</p>
				</div>
				<div className="mt-24">
					Biggr respects your privacy and is committed to protecting your data.
				</div>
			</div>
		</div>
	);
}
