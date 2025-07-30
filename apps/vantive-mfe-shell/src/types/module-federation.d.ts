declare module 'vantive-sharesource-remote-dashboard/Dashboard' {
    interface DashboardProps {
        isStandalone?: boolean;
    }
    const Dashboard: React.ComponentType<DashboardProps>;
    export default Dashboard;
}

declare module 'vantive-sharesource-remote-amia/Amia' {
    interface AmiaProps {
        isStandalone?: boolean;
    }
    const Amia: React.ComponentType<AmiaProps>;
    export default Amia;
}

declare module 'vantive-sharesource-remote-claria/Claria' {
    interface ClariaProps {
        isStandalone?: boolean;
    }
    const Claria: React.ComponentType<ClariaProps>;
    export default Claria;
}

declare module 'vantive-sharesource-remote-capd/Capd' {
    interface CapdProps {
        isStandalone?: boolean;
    }
    const Capd: React.ComponentType<CapdProps>;
    export default Capd;
}

declare module 'vantive-sharesource-remote-capd-submodule/CapdSubmodule' {
    interface CapdSubmoduleProps {
        isStandalone?: boolean;
    }
    const CapdSubmodule: React.ComponentType<CapdSubmoduleProps>;
    export default CapdSubmodule;
}