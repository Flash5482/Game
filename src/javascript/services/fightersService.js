import { callApi } from '../helpers/apiHelper';

const fightersDetailsMap = new Map();


class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

   async getFighterDetails(id) {
    // todo: implement this method
    let endpoint = `details/fighter/${id}.json`;
    try {
      return await callApi(endpoint);
    } catch (error) {
      throw error;
    }

  }

  async getFighterInfo(fighter) {
    const { _id } = fighter;
    if (!fightersDetailsMap.has(_id)) {
      // send request here
      fightersDetailsMap.set(_id, fighter);
      // await createFighterPreview(fighter,'asdasd');
    } else {
      // await createFighterPreview(fighter,'asdasd');
    }
    return fighter;
  }


}


export const fighterService = new FighterService();

