import { callApi } from '../helpers/apiHelper';
import { createFighterPreview } from '../components/fighterPreview';

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

/*  async  getFighterDetails(id) {
    // todo: implement this method
     //endpoint - `details/fighter/${id}.json`;
    console.log(id);
  }*/

   async  getFighterInfo(event, fighter) {
    const { _id } = fighter;
    if (!fightersDetailsMap.has(_id)) {
      // send request here
      fightersDetailsMap.set(_id, fighter);
      await createFighterPreview(fighter,'asdasd');
    }else
    {
      await createFighterPreview(fighter,'asdasd');
    }
    //console.log(fightersDetailsMap.get(_id));
  }


}


export const fighterService = new FighterService();

