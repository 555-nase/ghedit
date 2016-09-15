import glob = require('vs/base/common/glob');
import search = require('vs/platform/search/common/search');
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
export declare function getExcludes(configuration: search.ISearchConfiguration): glob.IExpression;
export declare class QueryBuilder {
    private configurationService;
    constructor(configurationService: IConfigurationService);
    text(contentPattern: search.IPatternInfo, options?: search.IQueryOptions): search.ISearchQuery;
    file(options?: search.IQueryOptions): search.ISearchQuery;
    private query(type, contentPattern, options?);
}
