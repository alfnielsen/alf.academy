import React from 'react'

export type IRouteComponent = () => JSX.Element

export interface IRouteItem {
	path: string
	component: IRouteComponent
	name: string
	children: IRouteItem[]
	parent?: IRouteItem
	exact?: boolean
	childOf?: string
}

export const registerRoutes = (
	routes: IRouteItem[],
	items: {
		path: string
		name: string
		component: IRouteComponent
		childOf?: string
		exact?: boolean
	}[]
) => {
	items.forEach(item => registerRoute(routes, item))
}

export const registerRoute = (
	routes: IRouteItem[],
	{
		path,
		name,
		component,
		childOf,
		exact = false
	}: {
		path: string
		name: string
		component: IRouteComponent
		childOf?: string
		exact?: boolean
	}
) => {
	const route: IRouteItem = {
		path,
		name: name,
		component,
		children: [],
		childOf,
		exact,
		parent: undefined
	}
	routes.push(route)
	if (!childOf) return
	route.parent = routes.find(p => p.path === childOf)
	if (!route.parent) {
		throw `Route registret with parent '${
			route.childOf
		}'. But parent was not found in route list. (Parent must be regitret before the child.)`
	}
	route.parent.children.push(route)
}
