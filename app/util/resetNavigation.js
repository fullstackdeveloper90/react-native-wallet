import {NavigationActions} from 'react-navigation'
const resetNavigation = {
    dispatchToSingleRoute: (navigation, routeName) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName}),
            ],
        })
        navigation.dispatch(resetAction)
    },

    dispatchToDrawerRoute: (navigation, drawerRoute) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Home',
                    params: {},
                    action: NavigationActions.navigate({routeName: drawerRoute}),
                }),
            ],
        })
        navigation.dispatch(resetAction)
    },

    dispatchUnderHome: (navigation, drawerRoute) => {
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Home',
                }),
                NavigationActions.navigate({
                    routeName: drawerRoute,
                }),
            ],
        })
        navigation.dispatch(resetAction)
    },

    dispatchUnderDrawer: (navigation, drawerRoute, finalRoute) => {
        if (drawerRoute === "GetVerified") {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Home',
                        params: {},
                        action: NavigationActions.navigate({routeName: drawerRoute}),
                    }),
                    //NavigationActions.navigate({routeName: finalRoute}),
                ],
            })
            navigation.dispatch(resetAction)
        } else {
            const resetAction = NavigationActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Home',
                        params: {},
                        action: NavigationActions.navigate({routeName: drawerRoute}),
                    }),
                    NavigationActions.navigate({routeName: finalRoute}),
                ],
            })
            navigation.dispatch(resetAction)
        }
    },
    dispatchUnderTwoFactor: (navigation) => {
        const resetAction = NavigationActions.reset({
            index: 2,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Home',
                    action: NavigationActions.navigate({routeName: 'Settings'}),
                }),
                NavigationActions.navigate({routeName: 'SettingsSecurity'}),
                NavigationActions.navigate({routeName: 'TwoFactor'})
            ],
        })
        navigation.dispatch(resetAction)
    },

    dispatchUnderDrawerWithParams: (navigation, drawerRoute, finalRoute, params) => {
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Home',
                    params: {},
                    action: NavigationActions.navigate({routeName: drawerRoute}),
                }),
                NavigationActions.navigate({
                    routeName: finalRoute,
                    params,
                }),
            ],
        })
        navigation.dispatch(resetAction)
    },
}

export default resetNavigation
