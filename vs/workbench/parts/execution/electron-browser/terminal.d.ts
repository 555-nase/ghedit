export declare const DEFAULT_TERMINAL_LINUX: string;
export declare const DEFAULT_TERMINAL_OSX: string;
export declare const DEFAULT_TERMINAL_WINDOWS: string;
export interface ITerminalConfiguration {
    terminal: {
        external: {
            linuxExec: string;
            osxExec: string;
            windowsExec: string;
        };
    };
}
