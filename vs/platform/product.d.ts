export interface IProductConfiguration {
    nameShort: string;
    nameLong: string;
    applicationName: string;
    win32AppUserModelId: string;
    win32MutexName: string;
    darwinBundleIdentifier: string;
    dataFolderName: string;
    downloadUrl: string;
    updateUrl?: string;
    quality?: string;
    commit: string;
    date: string;
    extensionsGallery: {
        serviceUrl: string;
        itemUrl: string;
    };
    extensionTips: {
        [id: string]: string;
    };
    extensionImportantTips: {
        [id: string]: string;
    };
    crashReporter: Electron.CrashReporterStartOptions;
    welcomePage: string;
    enableTelemetry: boolean;
    aiConfig: {
        key: string;
        asimovKey: string;
    };
    sendASmile: {
        reportIssueUrl: string;
        requestFeatureUrl: string;
    };
    documentationUrl: string;
    releaseNotesUrl: string;
    twitterUrl: string;
    requestFeatureUrl: string;
    reportIssueUrl: string;
    licenseUrl: string;
    privacyStatementUrl: string;
    npsSurveyUrl: string;
}
declare const product: IProductConfiguration;
export default product;
