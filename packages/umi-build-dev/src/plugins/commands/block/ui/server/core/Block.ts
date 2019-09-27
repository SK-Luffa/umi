import { IApi } from 'umi-types';
import { Resource } from '../../../data.d';
import Flow from './Flow';

import { getFolderTreeData, depthRouterConfig, getBlockList, routeExists } from '../util';

class Block {
  public api: IApi;
  public flow: Flow;

  constructor(api: IApi) {
    this.api = api;
  }

  public async run(args) {
    this.flow = new Flow({
      api: this.api,
    });
    return this.flow.run(args);
  }

  public async cancel() {
    if (!this.flow) {
      return;
    }
    this.flow.cancel();
  }

  public async getLog() {
    if (!this.flow) {
      return '';
    }
    return this.flow.getLog();
  }

  /**
   * 获取项目的路由
   */
  public depthRouterConfig() {
    return depthRouterConfig(this.api.getRoutes());
  }

  /**
   * 获取 page 下的目录结构
   */
  public getFolderTreeData() {
    const folderTreeData = getFolderTreeData(this.api.paths.absPagesPath);
    folderTreeData.unshift({
      title: '/',
      value: '/',
      key: '/',
    });
    return folderTreeData;
  }

  public async getBlockList(resourceId: string, list: Resource[]) {
    return getBlockList(resourceId, list);
  }

  public routeExists(path: string) {
    return routeExists(path, this.api.config.routes);
  }

  public getBlockUrl() {
    if (this.flow) {
      return this.flow.getBlockUrl();
    }
    return '';
  }
}

export default Block;
