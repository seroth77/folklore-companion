import { IGameResources } from "../models/GameResources";

export default interface IGameResourcesService {
  fetchGameManuals(): Promise<IGameResources[]>;
}
