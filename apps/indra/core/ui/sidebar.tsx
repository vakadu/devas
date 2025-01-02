import { ChevronRight, LogOutIcon, UserRoundCheck, House, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
			<SidebarHeader className="px-8">
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
			<SidebarFooter className="px-8">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="p-0" asChild>
							<div>
								<Dialog>
									<DialogTrigger className="w-full py-12 flex gap-12 items-center">
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
	const pathname = usePathname();

	return (
		<SidebarMenu className="gap-16 px-8">
			{navMenu.map((item) => {
				const Icon = item.icon ? IconMap[item.icon] : null;
				const active = pathname === item.path;

				if (item.type === 'menu') {
					return <MenuItem key={item.id} item={item} />;
				} else {
					return (
						<SidebarMenuButton
							className={`${
								active
									? 'bg-primary text-primary-foreground py-12 font-medium hover:bg-primary hover:text-primary-foreground hover:opacity-80'
									: 'px-0'
							}`}
							key={item.id}
							asChild
						>
							<Link href={item.path}>
								<Icon className="!size-18" />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					);
				}
			})}
		</SidebarMenu>
	);
};

const MenuItem = ({ item }: { item: ICommonTypes.INavigationItem }) => {
	const Icon = item.icon ? IconMap[item.icon] : null;
	const pathname = usePathname();
	const activeItem = pathname.split('/').filter(Boolean)[0];
	const activeCollapse = `/${activeItem}` === item.path;

	return (
		<Collapsible defaultOpen={activeCollapse} key={item.id} className="group/collapsible">
			<SidebarMenuItem className="py-6">
				<CollapsibleTrigger asChild>
					<SidebarMenuButton className="px-0">
						<Icon className="!size-18" />
						<span>{item.title}</span>
						<ChevronRight className="ml-auto !size-18 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="gap-12 mt-8 mx-0 px-0">
						{item?.items?.map((ite) => {
							const active = pathname === ite.path;

							return (
								<SidebarMenuSubItem key={ite.id}>
									<SidebarMenuSubButton
										className={`${
											active
												? 'bg-primary text-primary-foreground py-12 font-medium hover:bg-primary hover:text-primary-foreground hover:opacity-80 px-12'
												: ''
										}`}
										asChild
									>
										<Link href={ite.path}>{ite.title}</Link>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							);
						})}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
};
