import { LogOutIcon, UserRoundCheck } from 'lucide-react';

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from '@devas/ui';
import { useAppSelector } from '../store';

const data = {
	navMain: [
		{
			title: 'Getting Started',
			url: '#',
			items: [
				{
					title: 'Installation',
					url: '#',
				},
				{
					title: 'Project Structure',
					url: '#',
				},
			],
		},
		{
			title: 'Building Your Application',
			url: '#',
			items: [
				{
					title: 'Routing',
					url: '#',
				},
				{
					title: 'Data Fetching',
					url: '#',
					isActive: true,
				},
				{
					title: 'Rendering',
					url: '#',
				},
				{
					title: 'Caching',
					url: '#',
				},
				{
					title: 'Styling',
					url: '#',
				},
				{
					title: 'Optimizing',
					url: '#',
				},
				{
					title: 'Configuring',
					url: '#',
				},
				{
					title: 'Testing',
					url: '#',
				},
				{
					title: 'Authentication',
					url: '#',
				},
				{
					title: 'Deploying',
					url: '#',
				},
				{
					title: 'Upgrading',
					url: '#',
				},
				{
					title: 'Examples',
					url: '#',
				},
			],
		},
		{
			title: 'API Reference',
			url: '#',
			items: [
				{
					title: 'Components',
					url: '#',
				},
				{
					title: 'File Conventions',
					url: '#',
				},
				{
					title: 'Functions',
					url: '#',
				},
				{
					title: 'next.config.js Options',
					url: '#',
				},
				{
					title: 'CLI',
					url: '#',
				},
				{
					title: 'Edge Runtime',
					url: '#',
				},
			],
		},
		{
			title: 'Architecture',
			url: '#',
			items: [
				{
					title: 'Accessibility',
					url: '#',
				},
				{
					title: 'Fast Refresh',
					url: '#',
				},
				{
					title: 'Next.js Compiler',
					url: '#',
				},
				{
					title: 'Supported Browsers',
					url: '#',
				},
				{
					title: 'Turbopack',
					url: '#',
				},
			],
		},
		{
			title: 'Community',
			url: '#',
			items: [
				{
					title: 'Contribution Guide',
					url: '#',
				},
			],
		},
	],
};

export const AppSidebar = () => {
	const { name, mobile } = useAppSelector((state) => state.auth);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<UserRoundCheck />
							<span className="text-14 font-semibold">{name ? name : mobile}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<a href={item.url} className="font-medium">
										{item.title}
									</a>
								</SidebarMenuButton>
								{item.items?.length ? (
									<SidebarMenuSub>
										{item.items.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton
													asChild
													isActive={item.isActive}
												>
													<a href={item.url}>{item.title}</a>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								) : null}
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="p-0" asChild>
							<div>
								<Dialog>
									<DialogTrigger className="w-full p-12 flex gap-12 items-center">
										<LogOutIcon width={16} height={16} />
										<span>Logout</span>
									</DialogTrigger>
									<DialogContent className="gap-24">
										<DialogHeader>
											<DialogTitle className="text-24">Logout</DialogTitle>
											<DialogDescription>
												Are you sure you want to logout?
											</DialogDescription>
										</DialogHeader>
										<DialogFooter className="!pt-32">
											<Button size="lg" className="px-24" variant="secondary">
												Logout
											</Button>
											<DialogClose asChild>
												<Button size="lg" variant="ghost">
													Cancel
												</Button>
											</DialogClose>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
