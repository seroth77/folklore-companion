import * as characterList from "../../../config/resources.json";
import BaseService from "../BaseService";
import { IGameResources } from "../models/GameResources";
import IGameResourcesService from "./IGameResourcesService";

export default class GameResourcesService extends BaseService implements IGameResourcesService {
  constructor() {
    super("gameResources");
  }

  public fetchGameManuals(): Promise<IGameResources[]> {
    return Promise.resolve(characterList);
  }
}
