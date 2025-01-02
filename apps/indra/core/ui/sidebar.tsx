import { ChevronRight, LogOutIcon, UserRoundCheck, House, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';

import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
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
import { useGetNavigation } from '../api';

const IconMap = {
	House,
	ShoppingBasket,
} as any;

export const AppSidebar = () => {
	const { name, mobile } = useAppSelector((state) => state.auth);
	const { data } = useGetNavigation();
	const navMenu = data?.data || [];

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<UserRoundCheck />
							<span className="font-medium">{name ? name : mobile}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="py-24">
				<SidebarGroup>
					<Menu navMenu={navMenu} />
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

const Menu = ({ navMenu }: { navMenu: ICommonTypes.INavigationItem[] }) => {
	return (
		<SidebarMenu className="gap-16">
			{navMenu.map((item) => {
				const Icon = item.icon ? IconMap[item.icon] : null;
				if (item.type === 'menu') {
					return (
						<Collapsible key={item.id} className="group/collapsible">
							<MenuItem item={item} />
						</Collapsible>
					);
				} else {
					return (
						<SidebarMenuButton key={item.id}>
							<Icon className="!size-18" />
							<Link href={item.path}>{item.title}</Link>
						</SidebarMenuButton>
					);
				}
			})}
		</SidebarMenu>
	);
};

const MenuItem = ({ item }: { item: ICommonTypes.INavigationItem }) => {
	const Icon = item.icon ? IconMap[item.icon] : null;

	return (
		<SidebarMenuItem className="py-6">
			<CollapsibleTrigger asChild>
				<SidebarMenuButton>
					<Icon className="!size-18" />
					<span>{item.title}</span>
					<ChevronRight className="ml-auto !size-18 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
				</SidebarMenuButton>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<SidebarMenuSub className="mx-24 gap-12 mt-8">
					{item?.items?.map((ite) => {
						return (
							<SidebarMenuSubItem key={ite.id}>
								<SidebarMenuSubButton asChild>
									<Link href={ite.path}>{ite.title}</Link>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						);
					})}
				</SidebarMenuSub>
			</CollapsibleContent>
		</SidebarMenuItem>
	);
};
