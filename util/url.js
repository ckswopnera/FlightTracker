import {AVIATIONSTACK_API_KEY,OPENCAGE_API_KEY} from '@env';

export const aviation_url = `http://api.aviationstack.com/v1/flights?access_key=${AVIATIONSTACK_API_KEY}`;
export const opencage_url=`https://api.opencagedata.com/geocode/v1/json?key=${OPENCAGE_API_KEY}`;